import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://reinlux.at"),
  title: { default: "REIN LUX Reinigung | Hausbetreuung Wien", template: "%s | REIN LUX Reinigung" },
  description: "REIN LUX REINIGUNG OG: Hausbetreuung, Entrümpelung, Winterdienst und Gartenpflege in Wien und Umgebung.",
  keywords: [
    "Hausbetreuung Wien",
    "Entrümpelung Wien",
    "Winterdienst Wien",
    "Gartenpflege Wien",
    "REIN LUX Reinigung"
  ],
  openGraph: {
    title: "REIN LUX Reinigung",
    description: "Sauberkeit. Qualität. Vertrauen.",
    type: "website",
    locale: "de_AT"
  },
  icons: {
    icon: "/rein-lux-logo.png",
    shortcut: "/rein-lux-logo.png",
    apple: "/rein-lux-logo.png"
  },
  robots: { index: true, follow: true }
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0B0B0B" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
