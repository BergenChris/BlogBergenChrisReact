import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogItem } from '../../types';
import './blog.css';

function Blog() {
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
    <div className="blog-page-container">
      <header className="blog-header">
        <h1>Blog Bergen Chris</h1>
        <p>Overzicht van alle blogs</p>
      </header>

      <ul className="blog-list">
        {items.slice().reverse().map((item) => (
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
            </div>

            {item.pos.length > 0 && (
              <>
                <h4>✅ Positieve punten</h4>
                <ul className="pos-neg-list">
                  {item.pos.map((p, i) => (
                    <li key={`pos-${i}`} className="positive">{p}</li>
                  ))}
                </ul>
              </>
            )}

            {item.neg.length > 0 && (
              <>
                <h4>❌ Negatieve punten</h4>
                <ul className="pos-neg-list">
                  {item.neg.map((n, i) => (
                    <li key={`neg-${i}`} className="negative">{n}</li>
                  ))}
                </ul>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
