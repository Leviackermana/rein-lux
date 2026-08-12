import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 12_000;
const recentSubmissions = new Map<string, number>();

function clean(value: unknown, maxLength: number) {
  return String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, maxLength);
}

function oneLine(value: unknown, maxLength: number) {
  return clean(value, maxLength).replace(/[\r\n]+/g, " ");
}

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const contentLength = Number(request.headers.get("content-length") || 0);
    if (contentLength > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 413 });
    }

    const body = await request.json();
    const name = oneLine(body.name, 100);
    const email = oneLine(body.email, 254).toLowerCase();
    const phone = oneLine(body.phone, 30);
    const message = clean(body.message, 3000);
    const privacy = body.privacy === "on" || body.privacy === true || body.privacy === "true";
    const honeypot = clean(body.website, 200);
    const startedAt = Number(body.startedAt || 0);

    if (honeypot) return NextResponse.json({ ok: true });
    if (!startedAt || Date.now() - startedAt < 1800 || Date.now() - startedAt > 1000 * 60 * 60 * 12) {
      return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
    }

    const fieldErrors: Record<string, string> = {};
    if (name.length < 2) fieldErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (phone && !/^[+()\d\s/-]{6,30}$/.test(phone)) fieldErrors.phone = "Bitte prüfen Sie die Telefonnummer.";
    if (message.length < 10) fieldErrors.message = "Bitte beschreiben Sie Ihre Anfrage mit mindestens 10 Zeichen.";
    if (!privacy) fieldErrors.privacy = "Bitte bestätigen Sie die Datenschutzhinweise.";
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ error: "Bitte prüfen Sie Ihre Angaben.", fieldErrors }, { status: 400 });
    }

    const ip = getClientIp(request);
    const lastSubmission = recentSubmissions.get(ip) ?? 0;
    if (Date.now() - lastSubmission < 20_000) {
      return NextResponse.json({ error: "Bitte warten Sie einen Moment, bevor Sie eine weitere Anfrage senden." }, { status: 429 });
    }
    recentSubmissions.set(ip, Date.now());
    if (recentSubmissions.size > 500) {
      const cutoff = Date.now() - 60_000;
      for (const [key, time] of recentSubmissions) if (time < cutoff) recentSubmissions.delete(key);
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("Contact form: RESEND_API_KEY is missing");
      return NextResponse.json({ error: "Ihre Anfrage konnte derzeit nicht gesendet werden." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL || "office@reinlux.at";
    const from = process.env.CONTACT_FROM_EMAIL || "REIN LUX Website <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Website-Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "–"}\n\nNachricht:\n${message}`,
    });

    if (error) {
      console.error("Contact form: Resend delivery failed", error);
      return NextResponse.json({ error: "Ihre Anfrage konnte derzeit nicht gesendet werden." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form: invalid request", error);
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
}
