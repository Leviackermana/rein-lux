"use client";
import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import * as THREE from "three";
function Block({position,size,color}:{position:[number,number,number];size:[number,number,number];color:string}){
 return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={0.77}/></mesh>;
}
function Building(){
 const levels=[0,3.4,6.8,10.2];
 const wings=[-7.5,7.5];
 return <group>
 <Block position={[0,-.25,0]} size={[65,.3,65]} color="#384b39"/>
 {wings.map(x=><group key={x}><Block position={[x,6.8,-6.65]} size={[9,13.6,.7]} color="#d5cdbd"/>
 <Block position={[x,6.8,4.7]} size={[9,13.6,.55]} color="#d5cdbd"/>
 <Block position={[x+(x<0?-4.35:4.35),6.8,-.9]} size={[.55,13.6,11.5]} color="#d5cdbd"/>
 {levels.map((y,i)=><group key={i}>
 <Block position={[x,y+.15,-.9]} size={[9,.3,11.8]} color="#b8afa0"/>
 <Block position={[x,y+1.65,5.12]} size={[8.2,2.45,.07]} color="#6d9ca9"/>
 <Block position={[x,y+.3,5.65]} size={[9,.16,1.6]} color="#ded4c5"/>
 <Block position={[x,y+1,6.4]} size={[9,1.35,.07]} color="#8aadb7"/>
 </group>)}</group>)}
 <Block position={[0,12.1,-.9]} size={[6,.4,11.8]} color="#d7c9b5"/>
 <Block position={[-2.15,1.65,5.05]} size={[.55,3.3,.7]} color="#d5cdbd"/>
 <Block position={[2.15,1.65,5.05]} size={[.55,3.3,.7]} color="#d5cdbd"/>
 <Block position={[0,3.5,5.05]} size={[4.85,.4,.7]} color="#d5cdbd"/>
 <Block position={[0,1.6,5.07]} size={[2.35,2.9,.055]} color="#5c8591"/>
 <Block position={[0,1.7,2]} size={[4.5,.15,6]} color="#a9a399"/>
 {Array.from({length:12},(_,i)=><Block key={i} position={[0,.15+i*.23,-.6-i*.36]} size={[2.2,.19,.34]} color="#e4d6c2"/>)}
 <Block position={[-17,0.04,8]} size={[9,.15,16]} color="#41683e"/>
 <Block position={[-17,.1,8]} size={[1,.16,15]} color="#c6baa2"/>
 {Array.from({length:20},(_,i)=><mesh key={i} position={[-20+(i%5)*1.5,.5,3+Math.floor(i/5)*3]}><sphereGeometry args={[.45,8,6]}/><meshStandardMaterial color={i%2?"#72965a":"#476d3d"}/></mesh>)}
 <Block position={[15,-1.6,7.5]} size={[5,.2,17]} color="#7c8184"/>
 <Block position={[15,-3.2,-5]} size={[9,.2,8]} color="#777b80"/>
 <Block position={[8,-3.2,-5]} size={[7,.2,8]} color="#8c8b85"/>
 <Block position={[24,.05,-5]} size={[3,.12,35]} color="#a5a39c"/>
 <Block position={[0,.05,-19]} size={[28,.12,11]} color="#d4dce1"/>
 </group>;
}
function Scene(){const target=useMemo(()=>new THREE.Vector3(0,5,0),[]);return <>
 <color attach="background" args={["#17283d"]}/>
 <ambientLight intensity={1.1}/>
 <hemisphereLight intensity={1.7} color="#d6e5ff" groundColor="#514e38"/>
 <directionalLight position={[-8,18,12]} intensity={2.5} castShadow shadow-mapSize={[1024,1024]}/>
 <group rotation={[0,0,0]}><Building/></group>
 <perspectiveCamera position={[23,15,34]} />
 </>;}
export default function BuildingWorld(){return <div aria-label="3D Architekturstudie, noch ohne begehbare Kameraführung" className="absolute inset-0"><Canvas shadows dpr={[1,1.5]} camera={{position:[23,15,34],fov:47,near:.1,far:180}} gl={{antialias:true,powerPreference:"low-power"}}><Suspense fallback={null}><Scene/></Suspense></Canvas></div>}
