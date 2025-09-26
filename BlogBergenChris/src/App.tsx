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
  const [hideButton, setHideButton] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
    const timestamp = new Date().getTime(); 
    const html = document.documentElement;
    html.style.backgroundImage = backgroundToggled
      ? `url('/data/background/background1.jpg?t=${timestamp}')`
    : `url('/data/background/background2.jpg?t=${timestamp}')`;

  }, [backgroundToggled]);

  // Check of de inhoud korter is dan het vensterhoogte
useEffect(() => {
  const checkSticky = () => {
    const contentHeight = contentRef.current?.offsetHeight || 0;
    const windowHeight = window.innerHeight;
    setIsSticky(contentHeight < windowHeight);
  };

  checkSticky();
  window.addEventListener('resize', checkSticky);
  return () => window.removeEventListener('resize', checkSticky);
}, []);

// Scroll detection
useEffect(() => {
  let timeoutId:NodeJs.Timeout;

  const handleScroll = () => {
    setHideButton(true);
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setHideButton(false);
    }, 1000);
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);


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
