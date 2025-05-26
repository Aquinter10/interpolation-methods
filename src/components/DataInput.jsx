import React from 'react';

export default function DataInput({ points, setPoints }) {
  const handleChange = (index, key, value) => {
    const newPoints = [...points];
    newPoints[index] = { ...newPoints[index], [key]: parseFloat(value) };
    setPoints(newPoints);
  };

  const addPoint = () => {
    if (points.length < 8) {
      setPoints([...points, { x: 0, y: 0 }]);
    }
  };

  const removePoint = (index) => {
    const newPoints = points.filter((_, i) => i !== index);
    setPoints(newPoints);
  };

  return (
    <div>
      <h2 className="font-semibold mb-2">Puntos (x, y)</h2>
      {points.map((point, index) => (
        <div key={index} className="flex gap-2 items-center mb-2">
          <input
            type="number"
            value={point.x}
            onChange={(e) => handleChange(index, 'x', e.target.value)}
            className="border p-1 w-20"
          />
          <input
            type="number"
            value={point.y}
            onChange={(e) => handleChange(index, 'y', e.target.value)}
            className="border p-1 w-20"
          />
          <button onClick={() => removePoint(index)} className="text-red-500">×</button>
        </div>
      ))}
      <button onClick={addPoint} className="text-blue-500">+ Agregar punto</button>
    </div>
  );
}