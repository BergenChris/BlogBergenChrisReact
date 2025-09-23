import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/home';
import LatestBlogRedirect from './pages/blog/latestblog';
import BlogBergenChris from './pages/blog/blog';
import BlogById from './pages/blog/[id]';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [backgroundToggled, setBackgroundToggled] = useState(false);
  
  useEffect(() => {
    const timestamp = new Date().getTime(); // to force reload
    // Apply background depending on toggle state
    const html = document.documentElement;
    html.style.backgroundImage = backgroundToggled
      ? `url('/data/background/background1.jpg?t=${timestamp}')`
    : `url('/data/background/background2.jpg?t=${timestamp}')`;

  }, [backgroundToggled]);

  return (
    <BrowserRouter>
      {/* Fixed Hamburger and Menu */}
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
        
        
      </header>

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogBergenChris />} />
        <Route path="/blog/:id" element={<BlogById />} />
        <Route path="/blog/latestblog" element={<LatestBlogRedirect />} />
      </Routes>
      <button className='toggle' onClick={()=> setBackgroundToggled(!backgroundToggled) }>Achtergrond</button>
    </BrowserRouter>
  );
}

export default App;
