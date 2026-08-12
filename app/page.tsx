import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MobileActions from "@/components/MobileActions";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";

const services = ["Hausbetreuung", "Entrümpelung", "Winterdienst", "Gartenpflege"];

export default function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.reinlux.at/#business",
    name: "REIN LUX REINIGUNG OG",
    url: "https://www.reinlux.at/",
    logo: "https://www.reinlux.at/rein-lux-logo.png",
    image: "https://www.reinlux.at/images/hero-entrance.webp",
    description: "Hausbetreuung, Entrümpelung, Winterdienst und Gartenpflege für Wohn- und Geschäftsobjekte in Wien und Umgebung.",
    telephone: ["+43 676 550 1395", "+43 660 363 9235"],
    email: "office@reinlux.at",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hlawkagasse 10/4/43",
      postalCode: "1100",
      addressLocality: "Wien",
      addressCountry: "AT",
    },
    areaServed: {
      "@type": "City",
      name: "Wien",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "16:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: ["+43 676 550 1395", "+43 660 363 9235"],
        contactType: "customer service",
        areaServed: "AT",
        availableLanguage: ["de"],
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, areaServed: "Wien und Umgebung" },
      })),
    },
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <WhyUs />
        <Services />
        <Showcase />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      <MobileActions />
    </>
  );
}
