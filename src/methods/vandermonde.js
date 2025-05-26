// src/methods/vandermonde.js
export function vandermondeInterpolante(points) {
  const n = points.length;
  const V = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => Math.pow(points[i].x, j))
  );

  const y = points.map(p => p.y);

  const a = solveLinearSystem(V, y);

  const polyString = a.map((coef, i) => {
    const rounded = Math.round(coef * 1000) / 1000;
    if (i === 0) return `${rounded}`;
    if (i === 1) return `${rounded}x`;
    return `${rounded}x^${i}`;
  }).join(' + ');

  const fn = (x) => a.reduce((sum, coef, i) => sum + coef * Math.pow(x, i), 0);

  return { polyString, fn };
}

function solveLinearSystem(A, b) {
  const n = A.length;
  const M = A.map((row, i) => [...row, b[i]]);

  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(M[j][i]) > Math.abs(M[maxRow][i])) maxRow = j;
    }

    [M[i], M[maxRow]] = [M[maxRow], M[i]];

    for (let j = i + 1; j < n; j++) {
      const factor = M[j][i] / M[i][i];
      for (let k = i; k <= n; k++) {
        M[j][k] -= factor * M[i][k];
      }
    }
  }

  const x = Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    x[i] = M[i][n] / M[i][i];
    for (let j = i - 1; j >= 0; j--) {
      M[j][n] -= M[j][i] * x[i];
    }
  }

  return x;
}
