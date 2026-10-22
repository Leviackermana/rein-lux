import test from 'node:test';
import assert from 'node:assert/strict';
import { zones, validateNavigationGraph, reachable, serviceDestinations } from '../../lib/experience/buildingLayout.ts';
test('all planned services connect in both directions',()=>{
 assert.deepEqual(validateNavigationGraph(),[]);
 for(const dest of Object.values(serviceDestinations)) {
  assert.ok(reachable('forecourt',dest)); assert.ok(reachable(dest,'forecourt'));
 }
});
test('logical connectivity cannot hide the original garden gap',()=>{
 const broken=zones.map(z=>z.id==='gardenConnector'?{...z,bounds:{min:[-12,0,13],max:[-10,3,17]}}:z);
 assert.ok(validateNavigationGraph(broken).some(e=>e.startsWith('Spatial gap:')));
});
test('a corner contact is not a traversable portal',()=>{
 const broken=zones.map(z=>z.id==='gardenConnector'?{...z,bounds:{min:[-13,0,17],max:[-10,3,19]}}:z);
 assert.ok(validateNavigationGraph(broken).some(e=>e.startsWith('Insufficient shared clearance:')));
});
test('removing circulation edges disconnects the basement',()=>{
 const broken=zones.map(z=>z.id==='garage'?{...z,neighbors:[]}:z);
 assert.ok(validateNavigationGraph(broken).some(e=>e.includes('Disconnected service: entruempelung')));
});
