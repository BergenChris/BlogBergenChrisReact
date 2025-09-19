
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BlogPage from './pages/blogpage';
import HomePage from './pages/home';
import BlogPageById from './pages/blogpage/[id]';


function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/home" style={{ marginRight: '10px' }}>Home</Link>
        <Link to="/blog" style={{ marginRight: '10px' }}>Blog</Link>
       
      </nav>

      <Routes>
        <Route path="/home" element={<HomePage/>} /> 
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogPageById />} />

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
