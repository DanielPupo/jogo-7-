const assert=require('node:assert/strict');
const {Simulation}=require('../dist/engine.js');
function run(c,seconds=25,seed=42){const s=new Simulation(c,seed);for(let i=0;i<seconds*60;i++)s.step(1/60);return s;}
let a=new Simulation({population:11,initial:1});assert.deepEqual(a.counts(),{S:10,I:1,R:0});
let b=run({population:70,initial:4,transmission:false,recovery:0});assert.equal(b.cases,4);assert.equal(b.counts().I,4);
let c=run({population:30,initial:3,transmission:false,recovery:8},9);assert.deepEqual(c.counts(),{S:27,I:0,R:3});
let d=run({population:90,initial:10,recovery:12},120);assert.equal(d.counts().S+d.counts().I+d.counts().R,90);assert.ok(d.cases<=90);assert.ok(d.agents.every(a=>a.x>=d.cfg.radius&&a.x<=900-d.cfg.radius&&a.y>=d.cfg.radius&&a.y<=520-d.cfg.radius));
assert.equal(a.protect(0,'vaccine'),false);assert.equal(a.protect(1,'vaccine'),true);assert.equal(a.protect(1,'vaccine'),false);assert.equal(a.protect(0,'mask'),true);assert.equal(a.protect(0,'mask'),false);
let e=run({population:50},20),f=run({population:50},20);assert.deepEqual(e.history,f.history);
let unprotected=0,protectedCases=0;for(let seed=1;seed<=30;seed++){unprotected+=run({population:50,recovery:0},25,seed).cases;protectedCases+=run({population:50,recovery:0,masked:1,vaccinated:1},25,seed).cases;}assert.ok(protectedCases<unprotected,`Protection: ${protectedCases} vs ${unprotected}`);
// High probability contact infects only susceptible, never recovered.
let g=new Simulation({population:11,initial:1,speed:0,recovery:0,radius:15});g.agents.forEach(x=>{x.x=300;x.y=300});g.agents[2].state='R';for(let i=0;i<600;i++)g.step(1/60);assert.equal(g.agents[2].state,'R');assert.equal(g.counts().S,0);
console.log('8 checks passed: initialization, no transmission, recovery, population/bounds, protection, reproducibility, comparative effect, recovered protection.');
