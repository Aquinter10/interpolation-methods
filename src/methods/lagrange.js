// src/methods/lagrange.js
export function lagrangeInterpolante(points) {
  const n = points.length;
  const terms = [];

  for (let i = 0; i < n; i++) {
    const xi = points[i].x;
    const yi = points[i].y;
    let term = `${yi}`;
    for (let j = 0; j < n; j++) {
      if (j !== i) {
        term += `*(x - ${points[j].x})/(${xi - points[j].x})`;
      }
    }
    terms.push(term);
  }

  const polyString = terms.join(' + ');

  const fn = (x) => {
    let result = 0;
    for (let i = 0; i < n; i++) {
      let term = points[i].y;
      for (let j = 0; j < n; j++) {
        if (j !== i) {
          term *= (x - points[j].x) / (points[i].x - points[j].x);
        }
      }
      result += term;
    }
    return result;
  };

  return { polyString, fn };
}
