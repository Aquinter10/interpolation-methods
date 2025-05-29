// src/utils/splineCubico.js
export function splineCubico(points) {
  const n = points.length - 1;
  const xs = points.map(p => p.x);
  const ys = points.map(p => p.y);
  const h = Array(n).fill(0).map((_, i) => xs[i + 1] - xs[i]);
  const alphas = Array(n).fill(0).map((_, i) => {
    if (i === 0) return 0;
    return (3 / h[i]) * (ys[i + 1] - ys[i]) - (3 / h[i - 1]) * (ys[i] - ys[i - 1]);
  });

  const l = Array(n + 1).fill(1);
  const mu = Array(n + 1).fill(0);
  const z = Array(n + 1).fill(0);

  for (let i = 1; i < n; i++) {
    l[i] = 2 * (xs[i + 1] - xs[i - 1]) - h[i - 1] * mu[i - 1];
    mu[i] = h[i] / l[i];
    z[i] = (alphas[i] - h[i - 1] * z[i - 1]) / l[i];
  }

  const a = ys.slice();
  const b = Array(n).fill(0);
  const c = Array(n + 1).fill(0);
  const d = Array(n).fill(0);

  for (let j = n - 1; j >= 0; j--) {
    c[j] = z[j] - mu[j] * c[j + 1];
    b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
    d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
  }

  // Generamos las funciones para cada intervalo
  const splines = Array(n).fill(0).map((_, i) => ({
    a: a[i],
    b: b[i],
    c: c[i],
    d: d[i],
    x0: xs[i],
    x1: xs[i + 1],
    toString: () =>
      `f${i}(x) = ${a[i].toFixed(4)} + ${b[i].toFixed(4)}(x-${xs[i]}) + ${c[i].toFixed(4)}(x-${xs[i]})² + ${d[i].toFixed(4)}(x-${xs[i]})³, para x ∈ [${xs[i]}, ${xs[i + 1]}]`,
  }));

  const fn = (x) => {
    for (const s of splines) {
      if (x >= s.x0 && x <= s.x1) {
        const dx = x - s.x0;
        return s.a + s.b * dx + s.c * dx * dx + s.d * dx * dx * dx;
      }
    }
    return null; // or NaN
  };

  return {
    polyString: splines.map(s => s.toString()).join(' '),
    fn
  };
}
