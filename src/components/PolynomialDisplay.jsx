// src/components/PolynomialDisplay.jsx
import React from 'react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function PolynomialDisplay({ polyString }) {
  return (
    <div className="my-4">
      <h3 className="font-semibold mb-2">Polinomio resultante</h3>
      <BlockMath math={`f(x) = ${polyString}`} />
    </div>
  );
}


