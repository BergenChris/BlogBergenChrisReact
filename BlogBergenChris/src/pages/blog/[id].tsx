import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import type { BlogItem } from '../../types';
import './blog.css';

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

  useEffect(() => {
    const handleKeyDown = (event:any) => {
      if (event.key === 'ArrowRight') {
        handleNext();
      }
      if (event.key ==='ArrowLeft'){
        handlePrevious();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="blog-page-container">
      <article className="blog-item">
        <div className='blog-metrics'>
          <div className="blog-metrics-tags">
          {blogById && blogById.tags && blogById.tags.length > 0 && (
           blogById.tags.map((tag, i) => (
            
                    <button  key={i} className="tag-button-id" onClick={() => navigate(`/blog?tag=${encodeURIComponent(tag)}`)}>
                      {tag}
                    </button>
           
           ))
          )}
           </div>
        </div>
        <div className='blog-image'>
          <img src={`/data/blogPictures/img${id}.png`}  onError={(e) => (e.currentTarget.style.display = 'none')}/>
          <img src={`/data/blogPictures/img${id}.jpeg`}  onError={(e) => (e.currentTarget.style.display = 'none')}/>
          <img src={`/data/blogPictures/img${id}.svg`}  onError={(e) => (e.currentTarget.style.display = 'none')}/>
        </div>
        <div>
          <h1>{blogById.title}</h1>
        <p className="blog-date"><strong>Datum:</strong> {blogById.date}</p>
        <p className="blog-description">{blogById.description}</p>
        </div>
        

        <div className="blog-metrics">
              <div className="metric">
                <Link to={`/graphs`}>
                  <p>Stress</p>
                <progress max={10} value={blogById.stress}></progress>
                <span>{blogById.stress}/10</span>
                </Link>
              </div>
              <div className="metric">
                <Link to={`/graphs`}>
                  <p>Motivatie</p>
                  <progress max={10} value={blogById.motivation}></progress>
                  <span>{blogById.motivation}/10</span>
                  </Link>
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
         <Link to={`/graphs`} className='graph-link'>Grafiek</Link>
      </div>
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
