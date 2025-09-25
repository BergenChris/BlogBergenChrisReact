import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { BlogItem } from '../../types';
import './blog.css';

function Blog() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<BlogItem[]>(items);
  const [loading, setLoading] = useState(true);
  const [isReversed, setIsReversed] = useState(true); 
  const [tags,setTags] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const urlTag = searchParams.get('tag');

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BergenChris/BlogBergenChrisReact/refs/heads/main/BlogBergenChris/public/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.blogs);
        setFilteredItems(data.blogs);

        const allTags = new Set<string>(); //set zorgt dat er geen dubbele tags zijn
        data.blogs.forEach((blog: BlogItem) => {
          if (blog.tags) 
            {
              blog.tags.forEach((tag) => allTags.add(tag));
            }
        });
        setTags(Array.from(allTags));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  if (urlTag) {
    const filtered = items.filter(
      (item) => item.tags && item.tags.includes(urlTag)
    );
    setFilteredItems(filtered);
  } else {
    setFilteredItems(items);
  }
}, [urlTag, items]);

  if (loading) return <p className="loading">Loading blogs...</p>;
  const displayItems = isReversed ? [...filteredItems].reverse() : filteredItems;

  return (
    <div className="blog-page-container">
      <header className="blog-header">
        <h1>Overzicht van alle blogs</h1>
        <button className='order' onClick={() => setIsReversed((prev) => !prev)}>
          {isReversed ? 'Eerste → Laatste':'Laatste → Eerste'} 
        </button>
      </header>
      <div className='tag-container'>
         <h2>tags:</h2>
         <div className='tag-container-buttons'>
          {
          tags.map((tag, index) => (
            <button key={index} className="tag-button" onClick={()=>setSearchParams({tag})}>
              {tag}
            </button>
          ))
        }
         </div>
         <div>
          <button className='reset-tags' onClick={()=>setSearchParams({})}>toon alles</button>
         </div>
      </div>
      <ul className="blog-list">
        {displayItems.map((item) => (
          <li key={item.id} className="blog-item">
            <div>
              <img src={`/data/blogPictures/img${item.id}.png`} style={{ width: '40%' }} onError={(e) => (e.currentTarget.style.display = 'none')}/>
               <h3>
              <Link to={`/blog/${item.id}`} className="blog-link">
                {item.title}
              </Link>
              </h3>
              <p className="blog-date"><strong>Datum:</strong> {item.date}</p>
              <p className="blog-description">{item.description}</p>
            </div>
            <div className="blog-metrics">
              <div className="metric">
                <Link to={`/graphs`}>
                  <p>Stress</p>
                <progress max={10} value={item.stress}></progress>
                <span>{item.stress}/10</span>
                </Link>
              </div>
              <div className="metric">
                <Link to={`/graphs`}>
                  <p>Motivatie</p>
                  <progress max={10} value={item.motivation}></progress>
                  <span>{item.motivation}/10</span>
                  </Link>
              </div>
            </div>
            <div className='blog-metrics-container-tags'>
                {
                  item.tags && item.tags.length > 0 && item.tags.map((tag, index) => (
                    <div>
                    <button key={index} className="tag-button" onClick={()=>{setSearchParams({tag})}}>
                      {tag}
                    </button>
                    </div>

                  ))
                }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Blog;
