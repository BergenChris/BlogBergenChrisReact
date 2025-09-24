import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogItem } from '../../types';

function LatestBlogRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        const blogs: BlogItem[] = data.blogs;

        if (blogs.length > 0) {
          const latestBlog = blogs[blogs.length - 1];
          navigate(`/blog/${latestBlog.id}`);
        } else {
          navigate('/blog');
        }
      })
      .catch((err) => {
        console.error('Error loading blogs.json:', err);
        navigate('/blog');
      });
  }, [navigate]);

  return (
    <div className="blog-page-container">
      <div className="blog-item">
        <p className="loading">Laatste blog wordt geladen...</p>
      </div>
    </div>
  );
}

export default LatestBlogRedirect;
