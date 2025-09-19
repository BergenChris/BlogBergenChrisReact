import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogItem } from '../../types';
import './blog.css';

function Blog() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(true); // default reversed, zoals je eerder had

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

  // items gesorteerd afhankelijk van isReversed
  const displayItems = isReversed ? [...items].reverse() : items;

  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <h1>Overzicht van alle blogs</h1>
        <button className='order' onClick={() => setIsReversed((prev) => !prev)}>
          {isReversed ? 'Eerste → Laatste':'Laatste → Eerste'} 
        </button>
      </header>

      <ul className="blog-list">
        {displayItems.map((item) => (
          <li key={item.id} className="blog-item">
            <h3>
              <Link to={`/blog/${item.id}`} className="blog-link">
                {item.title}
              </Link>
            </h3>
            <p className="blog-date"><strong>Datum:</strong> {item.date}</p>
            <p className="blog-description">{item.description}</p>

            <div className="blog-metrics">
              <div className="metric">
                <label>Stress:</label>
                <progress max={10} value={item.stress}></progress>
                <span>{item.stress}/10</span>
              </div>
              <div className="metric">
                <label>Motivatie:</label>
                <progress max={10} value={item.motivation}></progress>
                <span>{item.motivation}/10</span>
              </div>
              <div className="metric">
                <label>Pos:</label>
                <p style={{ color: 'green' }}>{item.pos.length}</p>
              </div>
              <div className="metric">
                <label>Neg:</label>
                <p style={{ color: 'red' }}>{item.neg.length}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
