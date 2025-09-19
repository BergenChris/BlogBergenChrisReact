import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Blog } from './../../types';



function BlogPage() {
  const [items, setItems] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.blogs);
        console.log(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>BlogBergenChris</h1>
      <ul>
        {items.slice().reverse().map((item) => (
          <li key={item.id} style={{ marginBottom: '2rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
            <h3><Link to={`/blog/${item.id}`} style={{ textDecoration: 'none', color: 'inherit',border: '1px solid #000', padding: '0.2rem' }}>
          {item.title}
        </Link></h3>
            <p><strong>Datum:</strong> {item.date}</p>
            <p><strong>Beschrijving:</strong> {item.description}</p>
            <p><strong>Positieve punten:</strong></p>
            <ul>
              {item.pos.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
            <p><strong>Negatieve punten:</strong></p>
            <ul>
              {item.neg.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
            <p><strong>Stress:</strong> {item.stress}</p>
            <p><strong>Motivatie:</strong> {item.motivation}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default BlogPage;
