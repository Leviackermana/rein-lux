# REIN LUX — Phase 1: unified architectural environment

Status: **architectural specification, NOT a finished or browser-validated 3D scene**.
Branch: `preview/interactive-building`. Never write to `main`, merge automatically, or alter reinlux.at.

## Audit findings (2026-10-22)
- `app/page.tsx` currently imports `app/preview/page.tsx`. This makes the preview prototype the branch's homepage. Do not confuse the preview branch with a production deployment.
- `app/preview/page.tsx` is one giant `iframe srcDoc` string with an external `esm.sh/three@0.180.0` dependency; avoid shipping it as the final architecture.
- Brand inside the iframe is a text approximation. The existing `public/rein-lux-logo.png` must be reused **unchanged** when integrating the real UI.
- Current scene builds nearly everything from solid boxes; a solid front wall crosses the intended door entrance. There is no reliable opening/collision contract.
- Current camera tours jump between arbitrary waypoint coordinates, use segment-based interpolation and have no swept-volume collision checking.
- Garage ramp and basement elements are not a demonstrated navigable continuous connected volume; there is no actual verified door-and-room transition.
- Review `AGENTS.md` and Next.js 16.3 local docs before touching application framework code.
- Existing production-oriented UI/SEO/form components should remain intact; plan progressive enhancement rather than replacing them with a full-screen JS-only canvas.

## Coordinate convention and buildable dimensions (metres)
Right-handed 3D coordinate system: **X right in facade view; Y vertical; Z toward street/camera**.
Ground elevation Y=0. Main building front facade Z=+5, rear facade Z=-7.
Footprint: X=-12 to +12; Z=-7 to +5; above-ground levels at 0, 3.4, 6.8, 10.2 m. Roof ~13.6 m.
Initial camera centerline: (0, 6.5, 32), looking to (0,5,0). Ground camera routes: nominal eye Y=1.65 m above WALKABLE SURFACE, not constant world Y.
Planned scale and dimensions are an **engineering design**, not dimensions measured from the supplied reference illustration.

### Structural layout
- Public front courtyard Z=+5..+17, central approach X=-1.5..+1.5. A dedicated exterior front connector continues across X=+10..+26 at Z=+16..+19, passing **in front of** the ramp head with pedestrian clearance and a safeguarded ramp crossing/segregated walkway; verify elevations and pedestrian/vehicle conflict before meshing.
- Double entrance clear portal centered X=0 at Z=+5.1: **2.4 m clear width, 2.8 m clear height**. Wall MUST be split around the actual opening; glass doors have animated swinging/sliding collision proxies. The leaves must retract fully before a camera enters.
- Lobby X=-2.5..+2.5, Z=-0.5..+5; connected front-to-back to circulation axis.
- Stair hall X=-2.5..+2.5, Z=-5.5..-0.5. Real tread+riser landings and railings; avoid overlap with lobby and camera clearance.
- Garden left: X=-22..-13, Z=+2..+17. Accessible pathway joins west front side without hitting balconies or boundary walls.
- Basement parking right: dedicated ramp X=+13..+18, Z=+16..-1. **Not beneath or intersecting above-ground east wing**. At Z=+16 elevation Y=0; at Z=-1 elevation Y=-3.1, approximate longitudinal grade 18.2% (requires local regulatory/accessibility review). The top end is outside the building footprint.
- Garage chamber at basement elevation Y=-3.1: X=+12..+21, Z=-9..-1. Ramp connects at X=13..18, Z=-1.
- Storage / clearance room X=+4..+12, Z=-9..-3, basement Y=-3.1, connected to garage at X=+12 via **openable internal 1.8 m clear door**. Substructure slab and retaining walls must have modeled openings.
- Rear right passage: X=+22..+26 (minimum 2.2 m camera-clear corridor), Z=+19..-19; connected to forecourt only via the explicit front connector; no overlap with garage. Rear courtyard access needs an explicit turn at Z=-19.
- Winter rear courtyard X=-12..+22, Z=-25..-10, with continuous approach from right side passage. Seasonal snow is a layer/instanced effect on the same scene meshes, never a scene replacement.

**Important unresolved geometry:** adjacency edges are conceptual, not proof that zone bounding boxes touch. The front connector, ramp pedestrian crossing and changes of level require explicit walkable surfaces and intersection-free test paths in Phase 2. The storage/garage opening is at X=+12 and must be cut into the basement structure.

### Shared clearance constraints
Camera collision capsule target radius 0.3 m, height 1.65 m, swept along **every continuous trajectory**; keep 0.15 m additional margin wherever practicable.
Door crossing requires opening width >= 1.6 m after both radius+margin offsets. All 3D walls use explicit hole geometry or wall segments rather than textured fake windows or a solid pane hiding the entrance.
Do not reuse the same `BoxGeometry` ground slab across ramp/lower room volumes; cut terrain against basement excavations.
Navigation graph nodes connect room volumes and door portals. Run both graph connectivity and continuous swept-capsule intersection checks.

## Connected route graph (planning only)
Home / forecourt -> entrance portal -> lobby -> stair hall [Hausbetreuung]
Home / forecourt -> west pedestrian walkway -> garden path -> garden focal point [Gartenpflege]
Home / forecourt -> east ramp approach -> ramp downhill -> garage open door -> garage -> internal portal -> basement storage [Entrümpelung]
Home / forecourt -> east perimeter pedestrian path (outside garage excavations) -> rear courtyard [Winterdienst]

Never direct-interpolate from a current camera pose through the building when changing service. Cancel active traversal, return safely via the current route reversed to the last confirmed free navigation node, then run the new route.

## Suggested implementation boundaries
- `components/experience/ExperienceShell.tsx`: client-only event state / accessible controls; host semantic HTML, preserve the original logo image.
- `components/experience/BuildingCanvas.tsx`: lazy React Three Fiber entry, explicit loading/error/low-power fallback.
- `lib/experience/buildingLayout.ts`: canonical room, portal, surface and route definitions in one coordinate system.
- `lib/experience/navigation.ts`: graph traversal, spline corridor constraint, swept collision probe, safe cancellation.
- `components/experience/world/*`: exterior, lobby, stairs, garden, basement, rear courtyard as subassemblies of ONE scene.
- `tests/experience/*`: volume overlap tests, graph connectivity, portal clearance, path sample collisions, abort/return/retarget.
- Preserve semantic content/metadata, accessible contact and reduced motion; test WebGL availability and mobile GPU budget.
- `public/rein-lux-logo.png` is existing original asset candidate; verify visually with owner/asset before claiming exact original master.

## Gate checklist
### Phase 1
- [x] Inspect branch and dependency / current scene implementation
- [x] Map a single-coordinate-system architectural layout and connected service destinations
- [ ] Verify actual world geometry and clearance against generated collision mesh (Phase 2)

### Phase 2
- [ ] Produce architectural mesh with real apertures, stairs, excavated ramp, garage and storage room
- [ ] Confirm no above-ground/basement intersection

### Phase 3-6
- [ ] Path sampling and swept collision verification per service
- [ ] Browser desktop/mobile scene tour with screenshot/video evidence
- [ ] Retarget/cancel/back route working

### Phase 7
- [ ] Render quality approval; preserved logo, SEO, contact and mobile loading
- [ ] Lint/build check
- [ ] Separate Vercel preview URL confirmed, NOT assumed


## Phase 1 implementation follow-up — 2026-10-22

Implemented on `preview/interactive-building`:
- Explicit garden connector X=-15..-10, Z=13..17 bridges the previous 1 m gap.
- Front connector X=10..26, Z=16..19 is entirely streetward of the ramp head; extends to the right perimeter passage. Side passage now reaches Z=19. These supersede earlier conceptual connector dimensions.
- Graph validation now rejects separated adjacent volumes and connections with fewer than two shared dimensions of at least 0.9 m. This is a coarse planning clearance gate, NOT a mesh collision or floor-elevation test.
- Four Node tests cover service reachability/return, disconnected garden bounds, corner-only contact, and disconnected basement. Run with Node 22.18+ / 24: `node --test tests/experience/layout.test.mjs`.
- Synchronized package-lock with existing Three/R3F declarations after `npm ci` failed due to missing entries; `npm install --ignore-scripts --no-audit --no-fund` succeeded.

Validation actually performed:
- Planning tests: 4 passed.
- `npx tsc --noEmit`: passed.
- `npm run lint`: failed on existing architecture-page anchor and CookieBanner synchronous effect state update; existing unused target warning in BuildingWorld.
- `npm run build`: blocked by runtime `ENOENT uv_resident_set_memory`; no successful production build claimed.
- No browser visual tour, collision sweep, mobile performance measurement or new deployment verification performed in this phase.
- Blender executable not found on PATH.

Additional scene audit:
- BuildingWorld has a horizontal ramp block, an uncut 65 m terrain slab through the basement access, and a lobby slab centered at Y=1.7 across the intended camera corridor.
- Rendered BuildingWorld does not consume canonical zones. Its camera target variable is unused. Neither geometry nor initial framing is validated.
- The iframe prototype retargets via a direct segment from the current pose to an exterior waypoint; this is not safe reverse traversal.
- Keep React Three Fiber and Three.js already declared; no extra animation library needed for the planning phase. Future navigation should own position, look target, portal state and cancel/return state together.

Phase 2 gate remains OPEN. Next: derive floors/walls/portals from the canonical layout, cut terrain around the ramp and basement, define a graded ramp surface with transitions and basement headroom, then verify the actual meshes. Do not start four camera tours on the current geometry.
