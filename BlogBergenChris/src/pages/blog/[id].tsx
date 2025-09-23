import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { BlogItem } from '../../types';
import './blog.css'; // Reuse dezelfde CSS als BlogPage

function BlogById() {
  const { id } = useParams<{ id: string }>();
  const [blogs,setBlogs] = useState<BlogItem[]>([]);
  const [blogById, setBlogById] = useState<BlogItem | null>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = blogs.findIndex(b => b.id === Number(id));
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < blogs.length - 1;

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/blogs.json')
      .then(res => res.json())
      .then(data => {
        setBlogs(data.blogs);
        const found = data.blogs.find((b: BlogItem) => b.id === Number(id));
        setBlogById(found || null);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="loading">Loading blog...</p>;
  if (!blogById) return <p className="no-blogs">Blog niet gevonden.</p>;

  const handlePrevious = () => {
    if (hasPrevious) {
      const prevId = blogs[currentIndex - 1].id;
      navigate(`/blog/${prevId}`);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      const nextId = blogs[currentIndex + 1].id;
      navigate(`/blog/${nextId}`);
    }
  };

  return (
    <div className="blog-page-container">
      <article className="blog-item">
        <div className='blog-metrics'>
          {blogById && blogById.tags && blogById.tags.length > 0 && (
           blogById.tags.map((tag, i) => (
            <div className="blog-metrics-tags" key={i}>
                    <button className="tag-button-id" onClick={() => navigate(`/blog?tag=${encodeURIComponent(tag)}`)}>
                      {tag}
                    </button>
            </div>
           ))
          )}
        </div>
        <div>
          <img src={`/data/blogPictures/img${id}.png`} style={{ width: '75%' }} onError={(e) => (e.currentTarget.style.display = 'none')}/>
        </div>
        <div>
          <h1>{blogById.title}</h1>
        <p className="blog-date"><strong>Datum:</strong> {blogById.date}</p>
        <p className="blog-description">{blogById.description}</p>
        </div>
        

        <div className="blog-metrics">
          <div className="metric">
            <label>Stress:</label>
            <progress max={10} value={blogById.stress}></progress>
            <span>{blogById.stress}/10</span>
          </div>
          <div className="metric">
            <label>Motivatie:</label>
            <progress max={10} value={blogById.motivation}></progress>
            <span>{blogById.motivation}/10</span>
          </div>
        </div>
        <div>
           {blogById.pos.length > 0 && (
          <>
            <h3>Positieve punten</h3>
            <ul className="pos-neg-list">
              {blogById.pos.map((p, i) => <li key={`pos-${i}`} className="positive">{p}</li>)}
            </ul>
          </>
        )}

        {blogById.neg.length > 0 && (
          <>
            <h3>Negatieve punten</h3>
            <ul className="pos-neg-list">
              {blogById.neg.map((n, i) => <li key={`neg-${i}`} className="negative">{n}</li>)}
            </ul>
          </>
        )}
        </div>

       
      </article>
      <div className='nav-buttons'>
        {hasPrevious && (
          <button onClick={handlePrevious}>Vorige</button>
        )}
        {hasNext && (
          <button onClick={handleNext}>Volgende</button>
        )}
      </div>
    </div>
  );
}

export default BlogById;
