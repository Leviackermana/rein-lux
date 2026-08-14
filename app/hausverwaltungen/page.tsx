import type { Metadata } from "next";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import MobileActions from "@/components/MobileActions";
import Navbar from "@/components/Navbar";
import { B2BHero, FAQ, FitSection, ManagementOffer, MeasurementSection, PilotSection, ProblemSection, PromisesSection, ServiceSystem, ServicesB2B, WorkProcess } from "@/components/B2BContent";
export const metadata:Metadata={title:"Hausbetreuung für Hausverwaltungen",description:"REIN LUX reduziert den operativen Verwaltungsaufwand rund um Hausbetreuung und Gebäudereinigung in Wien, Niederösterreich und Burgenland.",alternates:{canonical:"/hausverwaltungen"}};
export default function Hausverwaltungen(){return <><a href="#main-content" className="skip-link">Zum Inhalt springen</a><Navbar/><main id="main-content"><B2BHero detailed/><ProblemSection/><ManagementOffer/><ServiceSystem/><PilotSection/><MeasurementSection/><ServicesB2B/><PromisesSection/><FitSection/><WorkProcess/><FAQ/><Contact/></main><Footer/><MobileActions/></>}
