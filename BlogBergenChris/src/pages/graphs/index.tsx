import { useEffect, useState } from 'react';
import type { BlogItem } from '../../types';
import './graphs.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function Graph() {
  const [items, setItems] = useState<BlogItem[]>([]);

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BergenChris/BlogBergenChrisReact/refs/heads/main/BlogBergenChris/public/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, []);

 


  if (loading) return <p className="loading">Loading blogs...</p>;


  return (
    <div className="graph-page-container">
        <header className="graph-header">
            <h1>Grafiek Motivatie & Stress</h1>
        </header>       
        {items.length > 0 && (
            <div className="chart-container">
                <Line
                  data={{
                    labels: items.map((item) => `ID ${item.id}`),
                    datasets: [
                      {
                        label: 'Motivatie',
                        data: items.map((item) => item.motivation),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 1)',
                        tension: 0.3,
                      },
                      {
                        label: 'Stress',
                        data: items.map((item) => item.stress),
                        borderColor: 'rgba(255, 99, 132, 1)',
                        backgroundColor: 'rgba(255, 99, 132, 1)',
                        tension: 0.3,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        position: 'top' as const,
                      },
                      title: {
                        display: true,
                        text: 'Motivatie en Stress per Blog ID',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        max: 10,
                      },
                    },
                  }}
                />

            </div>
            )}


        
    </div>
  );
}

export default Graph;
