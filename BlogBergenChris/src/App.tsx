import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/home';
import LatestBlogRedirect from './pages/blog/latestblog';
import BlogBergenChris from './pages/blog/blog';
import BlogById from './pages/blog/[id]';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Graph from './pages/graphs';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backgroundToggled, setBackgroundToggled] = useState(false);


  const contentRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const timestamp = new Date().getTime(); 
    const html = document.documentElement;
    html.style.backgroundImage = backgroundToggled
      ? `url('/data/background/background1.jpg?t=${timestamp}')`
    : `url('/data/background/background2.jpg?t=${timestamp}')`;

  }, [backgroundToggled]);




  return (
    <BrowserRouter>
      <header className="navbar">
        <button
           className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>Blog Pagina</Link>
          <Link to="/blog/latestblog" onClick={() => setMenuOpen(false)}>Laatste Blog</Link>
        </nav>
        <button
          onClick={() => setBackgroundToggled(!backgroundToggled)}
          className={`background-changer`}
        >
          Achtergrond 🔄
        </button>
        
        
      </header>

      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogBergenChris />} />
        <Route path="/blog/:id" element={<BlogById />} />
        <Route path="/blog/latestblog" element={<LatestBlogRedirect />} />
        <Route path="/graphs" element={<Graph/>}/>
     
      </Routes>
    

    </BrowserRouter>
  );
}

export default App;
