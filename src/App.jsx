import React, { useState } from 'react';
import DataInput from './components/DataInput';
import Graph from './components/Graph';
import PolynomialDisplay from './components/PolynomialDisplay';
import Report from './components/Report';
import { generateText } from './components/CompareMethods';
import { lagrangeInterpolante } from './methods/lagrange';
import { vandermondeInterpolante } from './methods/vandermonde';
import { newtonInterpolante } from './methods/newton';
import { splineLineal } from './methods/splineLineal';
import { splineCubico } from './methods/splineCubico';
import './App.css'

export default function App() {
  const [points, setPoints] = useState([]);
  const [polynomial, setPolynomial] = useState('');
  const [evaluateFn, setEvaluateFn] = useState(null);
  const [method, setMethod] = useState('lagrange');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async () => {
    let tempinput = `Usando los puntos ${JSON.stringify(points)} compara con los siguientes metodos de interpolacion cual es la mejor opcion: Lagrange, newton, spline cubico, spline lineal y vandermonde. Finalmente dime los beneficios de haber usado el metodo ${method} para la interpolacion de los puntos si mi resultado fue el polinomio ${polynomial}. Trata de no extenderte mucho. No mas de 100 palabras y no uses ningun formato de texto.`;
    setInput(tempinput);
    const result = await generateText(input);
    setOutput(result);
  };

  const handleCalculate = () => {
    if (points.length === 0) return;

    let result;
    try {
      if (method === 'lagrange') {
        result = lagrangeInterpolante(points);
      } else if (method === 'vandermonde') {
        result = vandermondeInterpolante(points);
      } else if (method === 'newton') {
  result = newtonInterpolante(points);
      } else if (method === 'spline') {
  result = splineLineal(points);
      } else if (method === 'Spline Cubico') {
  result = splineCubico(points);
      } 

      

      setPolynomial(result.polyString);
      setEvaluateFn(() => result.fn);
    } catch (error) {
      console.error('Error al calcular interpolación:', error);
      alert('Ocurrió un error al calcular la interpolación.');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Interpolación Numérica</h1>
      
      <DataInput points={points} setPoints={setPoints} />

      <div className="my-4">
        <label className="mr-2 font-semibold">Método:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="lagrange">Lagrange</option>
          <option value="vandermonde">Vandermonde</option>
          <option value="newton">Newton</option>
          <option value="spline">Spline Lineal</option>
          <option value="Spline Cubico">Spline Cubico</option>



        </select>
      </div>

      <button
        onClick={handleCalculate}
        className="bg-blue-600 text-white px-4 py-2 rounded my-4"
      >
        Calcular Interpolación
      </button>

      {evaluateFn && <Graph points={points} evaluate={evaluateFn} />}
      {polynomial && <PolynomialDisplay polyString={polynomial} />}

      { points && (
        <div className="p-4">
          <h3 className="text-2xl font-bold">Comparar metodos</h3>
          <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white">comparar</button>
          <div className="mt-4 border p-2">{output}</div>
          <br></br>
        </div>
        
      )}

      <Report points={points} />

      <br></br>
      <div className="button-group">
        <a href="https://aquinter10.github.io/proyecto-analisis-numerico/" className="button">Go back Home</a>
      </div>
    </div>
  );
}
