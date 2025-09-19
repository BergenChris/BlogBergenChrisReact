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
          // Option 1: Last blog in array
          const latestBlog = blogs[blogs.length - 1];

          // Option 2: Or find highest ID (if order is uncertain)
          // const latestBlog = blogs.reduce((prev, curr) => (curr.id > prev.id ? curr : prev));

          navigate(`/blog/${latestBlog.id}`);
        } else {
          // No blogs? Go back to blog list or homepage
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
