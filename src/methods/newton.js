// src/methods/newton.js

export function newtonInterpolante(points) {
  const n = points.length;
  const x = points.map(p => p.x);
  const y = points.map(p => p.y);
  const coef = [...y]; // coeficientes divididos

  // Construcción de la tabla de diferencias divididas
  for (let j = 1; j < n; j++) {
    for (let i = n - 1; i >= j; i--) {
      coef[i] = (coef[i] - coef[i - 1]) / (x[i] - x[i - j]);
    }
  }

  // Construir el polinomio como string y función evaluadora
  const terms = [];
  const fn = (z) => {
    let result = coef[0];
    for (let i = 1; i < n; i++) {
      let term = coef[i];
      for (let j = 0; j < i; j++) {
        term *= (z - x[j]);
      }
      result += term;
    }
    return result;
  };

  for (let i = 0; i < n; i++) {
    let term = coef[i].toFixed(4);
    for (let j = 0; j < i; j++) {
      term += `*(x - ${x[j].toFixed(2)})`;
    }
    terms.push(term);
  }

  const polyString = terms.join(' + ');

  return { polyString, fn };
}
