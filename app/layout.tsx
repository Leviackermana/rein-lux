import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const siteUrl = "https://www.reinlux.at";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "REIN LUX Reinigung | Hausbetreuung Wien",
    template: "%s | REIN LUX Reinigung",
  },
  description: "REIN LUX REINIGUNG OG bietet Hausbetreuung, Entrümpelung, Winterdienst und Gartenpflege für Wohn- und Geschäftsobjekte in Wien und Umgebung.",
  applicationName: "REIN LUX Reinigung",
  alternates: { canonical: "/" },
  openGraph: {
    title: "REIN LUX Reinigung | Hausbetreuung Wien",
    description: "Persönliche Hausbetreuung, Entrümpelung, Winterdienst und Gartenpflege in Wien und Umgebung.",
    url: siteUrl,
    siteName: "REIN LUX Reinigung",
    type: "website",
    locale: "de_AT",
    images: [
      {
        url: "/og-rein-lux.jpg",
        width: 1200,
        height: 630,
        alt: "REIN LUX Reinigung – Hausbetreuung in Wien",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "REIN LUX Reinigung | Hausbetreuung Wien",
    description: "Hausbetreuung und ausgewählte Dienstleistungen für Immobilien in Wien und Umgebung.",
    images: ["/og-rein-lux.jpg"],
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/rein-lux-logo.png", type: "image/png" }],
    apple: "/rein-lux-logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0B0B0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-AT" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
