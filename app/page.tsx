import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import MobileActions from "@/components/MobileActions";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import SmoothScroll from "@/components/SmoothScroll";
import Stats from "@/components/Stats";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "REIN LUX REINIGUNG OG",
    description: "Hausbetreuung, Entrümpelung, Winterdienst und Gartenpflege in Wien und Umgebung.",
    telephone: ["+43 676 550 1395", "+43 660 363 9235"],
    email: "office@reinlux.at",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hlawkagasse 10/4/43",
      postalCode: "1100",
      addressLocality: "Wien",
      addressCountry: "AT"
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "16:00"
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }} />
      <SmoothScroll />
      <Navbar />
      <main>
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
