// src/methods/splineLineal.js

export function splineLineal(points) {
  const sorted = [...points].sort((a, b) => a.x - b.x);
  const n = sorted.length - 1;

  const segments = [];

  // Construcción de segmentos lineales entre cada par de puntos
  for (let i = 0; i < n; i++) {
    const x0 = sorted[i].x;
    const x1 = sorted[i + 1].x;
    const y0 = sorted[i].y;
    const y1 = sorted[i + 1].y;

    const m = (y1 - y0) / (x1 - x0);
    const b = y0 - m * x0;

    segments.push({ x0, x1, m, b });
  }

  // Función evaluadora por tramos
  const fn = (x) => {
    for (let seg of segments) {
      if (x >= seg.x0 && x <= seg.x1) {
        return seg.m * x + seg.b;
      }
    }
    return NaN; // Fuera del dominio
  };

  // Construcción del polinomio por tramos como string
  const polyString = segments
    .map(
      (seg, i) =>
        `f${i}(x) = ${seg.m.toFixed(4)}x + ${seg.b.toFixed(4)} , para x ∈ [${seg.x0}, ${seg.x1}]`
    )
    .join('\n');

  return { polyString, fn };
}
