import { useEffect, useState } from 'react';
import type { BlogItem } from '../../types';
import './index.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blogs.json')
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
    <div className="home-container">
      <header className="hero">
        <h1>Welkom bij Blog Bergen Chris</h1>
        <p>Lees hier de laatste inzichten, verhalen en gedachten van Chris.</p>
      </header>

      <main>
        
        <ul className="home-list">
        {items.slice().reverse().map(({ id, title, description }) => (
          <li key={id} className="home-item">
            <h3>
              <Link to={`/blog/${id}`} className="home-link">{title}</Link>
            </h3>
            <p className="home-description">{description}</p>
          </li>
        ))}

      </ul>
      </main>
    </div>
  );
}
