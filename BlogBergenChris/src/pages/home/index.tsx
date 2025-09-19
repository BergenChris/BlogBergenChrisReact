import { useEffect, useState } from 'react';
import type { Blog } from '../../types';

export default function HomePage() {
  const [lastBlog, setLastBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blogs.json')
      .then(res => res.json())
      .then(data => {
        // data.blogs is array, pak laatste blog
        const blogs: Blog[] = data.blogs;
        if (blogs.length > 0) {
          setLastBlog(blogs[blogs.length - 1]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading latest blog...</p>;

  return (
    <div>
      <h1>Welcome to the Blog Bergen Chris</h1>
      <p>This is the home page.</p>

      {lastBlog ? (
        <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc' }}>
          <h2>Laatste blog: {lastBlog.title}</h2>
          <p><strong>Datum:</strong> {lastBlog.date}</p>
          <p>{lastBlog.description}</p>
          {/* Wil je meer velden hier ook tonen, zoals pos/neg? */}
        </div>
      ) : (
        <p>Geen blogs gevonden.</p>
      )}
    </div>
  );
}
