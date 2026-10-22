export type Point3 = readonly [number, number, number];
export type ZoneId =
  | "frontConnector" | "gardenConnector" | "forecourt" | "entrance" | "lobby" | "stairs" | "garden"
  | "ramp" | "garage" | "storage" | "sidePassage" | "rearYard";
export type Volume = Readonly<{ min: Point3; max: Point3 }>;
export type Zone = Readonly<{
  id: ZoneId;
  kind: "outdoor" | "portal" | "interior" | "incline";
  bounds: Volume;
  neighbors: readonly ZoneId[];
}>;
/**
 * Phase-1 authoritative *planning* footprints (metres), not existing collision geometry.
 * X = facade-right, Y = up, Z = street-facing.
 * Ramp bounds are a conservative bounding volume, NOT the drivable grade mesh.
 */
export const zones: readonly Zone[] = [
  { id: "forecourt", kind: "outdoor", bounds: {min:[-12,0,5],max:[12,3,17]}, neighbors:["entrance","gardenConnector","frontConnector"] },
  { id: "entrance", kind: "portal", bounds:{min:[-1.2,0,4.9],max:[1.2,2.8,5.3]},neighbors:["forecourt","lobby"] },
  { id: "lobby", kind: "interior", bounds:{min:[-2.5,0,-0.5],max:[2.5,3.2,5]},neighbors:["entrance","stairs"] },
  { id: "stairs", kind: "interior", bounds:{min:[-2.5,0,-5.5],max:[2.5,10,-0.5]},neighbors:["lobby"] },
  { id:"garden",kind:"outdoor",bounds:{min:[-22,0,2],max:[-13,4,17]},neighbors:["gardenConnector"]},
  { id:"ramp",kind:"incline",bounds:{min:[13,-3.1,-1],max:[18,2,16]},neighbors:["frontConnector","garage"]},
  { id:"garage",kind:"interior",bounds:{min:[12,-3.1,-9],max:[21,0.2,-1]},neighbors:["ramp","storage"]},
  { id:"storage",kind:"interior",bounds:{min:[4,-3.1,-9],max:[12,0.2,-3]},neighbors:["garage"]},
  { id:"sidePassage",kind:"outdoor",bounds:{min:[22,0,-19],max:[26,4,19]},neighbors:["frontConnector","rearYard"]},
  { id:"rearYard",kind:"outdoor",bounds:{min:[-12,0,-25],max:[22,4,-10]},neighbors:["sidePassage"]},
  {id:"gardenConnector",kind:"outdoor",bounds:{min:[-15,0,13],max:[-10,3,17]},neighbors:["forecourt","garden"]},
  {id:"frontConnector",kind:"outdoor",bounds:{min:[10,0,16],max:[26,3,19]},neighbors:["forecourt","ramp","sidePassage"]}
] as const;
export const serviceDestinations = {
 hausbetreuung:"stairs", gartenpflege:"garden", entruempelung:"storage", winterdienst:"rearYard"
} as const satisfies Record<string, ZoneId>;
export function reachable(from:ZoneId,to:ZoneId, layout:readonly Zone[]=zones): boolean {
 const byId=new Map(layout.map(zone=>[zone.id,zone]));
 const visited=new Set<ZoneId>(),queue:ZoneId[]=[from];
 while(queue.length){const id=queue.shift()!;if(id===to)return true;if(visited.has(id))continue;
 visited.add(id);for(const next of byId.get(id)?.neighbors??[])if(!visited.has(next))queue.push(next);}
 return false;
}
export function validateNavigationGraph(layout:readonly Zone[]=zones):string[]{
 const errors:string[]=[];
 const byId=new Map(layout.map(z=>[z.id,z]));
 for(const zone of layout){
  const {min,max}=zone.bounds;
  if(min.some((v,i)=>v>=max[i]))errors.push(`Invalid bounds: ${zone.id}`);
  for(const neighbor of zone.neighbors){
   const other=byId.get(neighbor);
   if(!other)errors.push(`Unknown neighbor: ${zone.id} -> ${neighbor}`);
   else {
    if(!other.neighbors.includes(zone.id))errors.push(`Asymmetric edge: ${zone.id} -> ${neighbor}`);
    // A logical graph edge is insufficient: volumes must share a clear face
    // or overlap. This checks planning bounds only, not the rendered mesh.
    const overlaps=zone.bounds.min.map((v,i)=>Math.min(zone.bounds.max[i],other.bounds.max[i])-Math.max(v,other.bounds.min[i]));
    if(overlaps.some(v=>v < -1e-6))errors.push(`Spatial gap: ${zone.id} -> ${neighbor}`);
    else if(overlaps.filter(v=>v >= 0.9).length < 2)errors.push(`Insufficient shared clearance: ${zone.id} -> ${neighbor}`);
   }
  }
 }
 for(const [service,dest] of Object.entries(serviceDestinations))
  if(!reachable("forecourt",dest,layout))errors.push(`Disconnected service: ${service}`);
 return errors;
}
