import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Blog } from './../../types';

function BlogPageById() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blogs.json')
      .then(res => res.json())
      .then(data => {
        // data.blogs is array van blogs
        const found = data.blogs.find((b: Blog) => b.id === Number(id));
        setBlog(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading blog...</p>;
  if (!blog) return <p>Blog niet gevonden.</p>;

  return (
    <div>
      <h1>{blog.title}</h1>
      <p><strong>Datum:</strong> {blog.date}</p>
      <p><strong>Beschrijving:</strong> {blog.description}</p>

      <p><strong>Positieve punten:</strong></p>
      <ul>
        {blog.pos.map((p, i) => <li key={i}>{p}</li>)}
      </ul>

      <p><strong>Negatieve punten:</strong></p>
      <ul>
        {blog.neg.map((n, i) => <li key={i}>{n}</li>)}
      </ul>

      <p><strong>Stress:</strong> {blog.stress}</p>
      <p><strong>Motivatie:</strong> {blog.motivation}</p>
    </div>
  );
}

export default BlogPageById;
