// These are model scores and sensitivity bounds, never probabilities.
export function placement(route, model) {
  const assessment = model.routes.find(r => r.id === route.id);
  if (!assessment) throw Error(`Missing placement: ${route.id}`);
  const imputed = Object.keys(model.factors).filter(k => assessment.factors[k] === null);
  const axis = key => {
    let value=0, lower=0, upper=0;
    for (const [factor, weight] of Object.entries(model.axes[key].weights)) {
      const input=assessment.factors[factor];
      const v=input ?? model.prior, spread=model.sensitivity[input === null ? 'imputed' : 'assessed'];
      value += weight * v;
      lower += weight * Math.max(0,v-spread);
      upper += weight * Math.min(1,v+spread);
    }
    return {value, lower, upper};
  };
  return {...assessment, x:axis('x'), y:axis('y'), imputed};
}

export function validatePlacement(model, routes) {
  const keys=Object.keys(model.factors);
  if (model.prior !== 0.5 || keys.length !== 6) throw Error('Unexpected placement model');
  if (model.routes.length !== routes.length || new Set(model.routes.map(r=>r.id)).size !== routes.length) throw Error('Placement route coverage mismatch');
  for (const axis of Object.values(model.axes)) {
    if (Math.abs(Object.values(axis.weights).reduce((a,b)=>a+b,0)-1)>1e-9) throw Error('Placement weights must sum to one');
    if (Object.entries(axis.weights).some(([k,w])=>!keys.includes(k)||!Number.isFinite(w)||w<0)) throw Error('Invalid placement weight');
  }
  for (const route of routes) {
    const p=placement(route,model);
    if (!p.xBasis || !p.yBasis) throw Error('Missing placement rationale');
    for (const k of keys) if (p.factors[k] !== null && (!Number.isFinite(p.factors[k]) || p.factors[k]<0 || p.factors[k]>1)) throw Error(`Invalid factor ${route.id}/${k}`);
  }
  return model;
}

function hash(id) {let h=2166136261;for(const c of id) h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;}

// Stable over filtering/reload: call with the entire route sample before filtering.
// Each mark starts with <=3px noise. A deterministic spiral resolves collisions.
export function arrangePoints(points) {
  const placed=[];
  for (const point of [...points].sort((a,b)=>a.id.localeCompare(b.id))) {
    const angle=hash(point.id)/4294967296*Math.PI*2;
    let result;
    for (let i=0;i<1600;i++) {
      const radius=i===0?3:3+1.35*Math.sqrt(i);
      const a=angle+i*2.399963229728653;
      const px=Math.max(107,Math.min(681,point.x+Math.cos(a)*radius));
      const py=Math.max(73,Math.min(427,point.y+Math.sin(a)*radius));
      result={...point,px,py};
      if (placed.every(p=>Math.hypot(p.px-px,p.py-py)>=23)) break;
      if(i===1599) throw Error('Could not separate model marks');
    }
    placed.push(result);
  }
  return new Map(placed.map(p=>[p.id,p]));
}
