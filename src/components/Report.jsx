// src/components/Report.jsx
import React from 'react';

export default function Report({ points }) {
  const handleGenerateReport = () => {
    const text = `Reporte automático\nTotal de puntos: ${points.length}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reporte.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="my-6">
      <button onClick={handleGenerateReport} className="bg-green-600 text-white px-4 py-2 rounded">
        Generar Reporte
      </button>
    </div>
  );
}