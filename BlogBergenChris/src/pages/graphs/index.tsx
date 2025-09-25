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
  const [graphType, setGraphType] = useState<"motivation"|"stress">("motivation");

  const [loading, setLoading] = useState(true);
  const otherGraphType = graphType === 'motivation' ? 'stress' : 'motivation';


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

  const toggleGraph = () => {
    setGraphType((prev) => (prev === 'motivation' ? 'stress' : 'motivation'));
  };


  if (loading) return <p className="loading">Loading blogs...</p>;


  return (
    <div className="graph-page-container">
        <header className="graph-header">
            <h1>Grafiek {graphType} <a onClick={()=>setGraphType(otherGraphType)}>/{otherGraphType}</a></h1>
        </header>       
        {items.length > 0 && (
            <div className="chart-container">
                <Line
                data={{
                    labels: items.map((item) => `ID ${item.id}`),
                    datasets: [
                    {
                        label: graphType.toUpperCase(),
                        data: items.map((item) => item[graphType]),
                        borderColor: 'rgba(54, 162, 235, 1)',       // Blauw
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
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
                        text: 'Motivatie per Blog ID',
                    },
                    },
                    scales: {
                    y: {
                        beginAtZero: true,
                        max: 10, // Pas aan op basis van je motivatie-schaal
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
