import dynamic from "next/dynamic";
import Image from "next/image";
const BuildingWorld=dynamic(()=>import("../../../components/experience/BuildingWorld"));
export const metadata={title:"Architekturstudie | REIN LUX",robots:{index:false,follow:false}};
export default function ArchitecturePreview(){return <main className="relative min-h-dvh bg-[#101e30] text-white">
 <BuildingWorld/>
 <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-start justify-between bg-gradient-to-b from-[#101e30] to-transparent p-5 sm:p-8">
 <Image src="/rein-lux-logo.png" alt="REIN LUX REINIGUNG" width={115} height={115} className="h-auto w-24 object-contain"/>
 <span className="rounded-full border border-amber-400/50 bg-[#101e30]/80 px-4 py-2 text-xs">3D Architekturstudie · Phase 2 in Arbeit</span></div>
 <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#101e30] to-transparent p-6 pt-24">
 <h1 className="font-serif text-3xl sm:text-5xl">Eine Immobilie. Eine Welt.</h1>
 <p className="mt-2 max-w-xl text-sm text-white/80">Geometrischer Zwischenstand – noch keine begehbare, kollisionsgeprüfte Architektur. Hausbetreuung, Gartenpflege, Entrümpelung und Winterdienst folgen nach Validierung.</p>
 <a href="/" className="mt-4 inline-block rounded-full border border-amber-400 px-5 py-3 text-sm text-amber-300">Zurück zur Website</a></div>
 </main>;}
