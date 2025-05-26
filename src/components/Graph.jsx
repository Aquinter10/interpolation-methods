import React from 'react';
import { Chart, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(LineElement, PointElement, LinearScale, Title, CategoryScale);

export default function Graph({ points, evaluate }) {
  const xMin = Math.min(...points.map(p => p.x)) - 1;
  const xMax = Math.max(...points.map(p => p.x)) + 1;
  const xs = Array.from({ length: 100 }, (_, i) => xMin + i * (xMax - xMin) / 99);
  const ys = xs.map(evaluate);

  const data = {
    datasets: [
      {
        label: 'Interpolación',
        data: xs.map((x, i) => ({ x, y: ys[i] })),
        borderColor: 'blue',
        fill: false,
      },
      {
        label: 'Puntos',
        data: points.map(p => ({ x: p.x, y: p.y })),
        borderColor: 'red',
        backgroundColor: 'red',
        showLine: false,
        pointRadius: 5,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Gráfica de Interpolación' },
    },
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        title: { display: true, text: 'x' },
      },
      y: {
        type: 'linear',
        title: { display: true, text: 'y' },
      },
    },
  };

  return <Line data={data} options={options} />;
}
