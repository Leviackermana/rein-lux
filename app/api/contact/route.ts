import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (name.length < 2 || !email.includes("@") || message.length < 10) {
      return NextResponse.json({ error: "Bitte füllen Sie alle Pflichtfelder korrekt aus." }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Kontaktformular ist noch nicht mit dem E-Mail-Versand verbunden. Bitte RESEND_API_KEY in .env.local eintragen." }, { status: 503 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const to = process.env.CONTACT_TO_EMAIL || "office@reinlux.at";
    const from = process.env.CONTACT_FROM_EMAIL || "REIN LUX Website <onboarding@resend.dev>";

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Neue Anfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || "–"}\n\nNachricht:\n${message}`
    });

    if (error) return NextResponse.json({ error: "E-Mail konnte nicht gesendet werden." }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }
}
