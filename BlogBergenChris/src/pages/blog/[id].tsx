import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { BlogItem } from '../../types';
import './blog.css'; // Reuse dezelfde CSS als BlogPage

function BlogById() {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/blogs.json')
      .then(res => res.json())
      .then(data => {
        const found = data.blogs.find((b: BlogItem) => b.id === Number(id));
        setBlog(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading blog...</p>;
  if (!blog) return <p className="no-blogs">Blog niet gevonden.</p>;

  return (
    <div className="blog-page-container">
      <article className="blog-item">
        <div>
          <img src={`/data/blogPictures/img${id}.png`} style={{ width: '75%' }} onError={(e) => (e.currentTarget.style.display = 'none')}/>
        </div>
        <div>
          <h1>{blog.title}</h1>
        <p className="blog-date"><strong>Datum:</strong> {blog.date}</p>
        <p className="blog-description">{blog.description}</p>
        </div>
        

        <div className="blog-metrics">
          <div className="metric">
            <label>Stress:</label>
            <progress max={10} value={blog.stress}></progress>
            <span>{blog.stress}/10</span>
          </div>
          <div className="metric">
            <label>Motivatie:</label>
            <progress max={10} value={blog.motivation}></progress>
            <span>{blog.motivation}/10</span>
          </div>
        </div>
        <div>
           {blog.pos.length > 0 && (
          <>
            <h3>Positieve punten</h3>
            <ul className="pos-neg-list">
              {blog.pos.map((p, i) => <li key={`pos-${i}`} className="positive">{p}</li>)}
            </ul>
          </>
        )}

        {blog.neg.length > 0 && (
          <>
            <h3>Negatieve punten</h3>
            <ul className="pos-neg-list">
              {blog.neg.map((n, i) => <li key={`neg-${i}`} className="negative">{n}</li>)}
            </ul>
          </>
        )}
        </div>

       
      </article>
    </div>
  );
}

export default BlogById;
