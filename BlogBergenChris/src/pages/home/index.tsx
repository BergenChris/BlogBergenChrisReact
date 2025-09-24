import { useEffect, useState } from 'react';
import type { BlogItem } from '../../types';
import './index.css';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/BergenChris/BlogBergenChrisReact/refs/heads/main/BlogBergenChris/public/data/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.blogs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading JSON:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading blogs...</p>;

  if (items.length === 0) return null;

  const reversed = items.slice().reverse();
  const newest = reversed[0];
  const rest = reversed.slice(1);


  function getRandomItems<T>(arr: T[], n: number): T[] {
    const result: T[] = [];
    const taken = new Set<number>();

    while (result.length < n && result.length < arr.length) {
      const idx = Math.floor(Math.random() * arr.length);
      if (!taken.has(idx)) {
        taken.add(idx);
        result.push(arr[idx]);
      }
    }
    return result;
  }


  const randomOthers = getRandomItems(rest, 2);

  return (
    <div className="home-container">
      <header className="hero">
        <h1 className="blog-title">
          <div>
            Welkom bij mijn Blog @ 
            <img src="/data/logo/logoDeskDrive.svg" alt="logo DeskDrive" />
          </div>
        </h1>
        <p>Fijn dat je hier bent! Dit is mijn plek om alles te delen over mijn stage: wat ik meemaak, wat ik leer en de dingen die ik tegenkom onderweg. Of je nu mentor, begeleider bent, of gewoon nieuwsgierig, hier vind je mijn persoonlijke verhalen, ervaringen en handige tips die ik onderweg verzamel.</p>
        <p>Op deze site kun je niet alleen de nieuwste blogs bekijken, maar ook ontdekken wat deze stage precies inhoudt en hoe ik mezelf ontwikkel. Ik neem je mee in de hoogtepunten, maar ook de uitdagingen die horen bij zo een leertraject. Mijn doel is om jou een eerlijk en inspirerend kijkje te geven in mijn avontuur.</p>
        <p>Ik hoop dat mijn verhalen je aan het denken zetten, je motiveren of gewoon leuk zijn om te lezen. Dus, klik snel door en lees mee - ik neem je graag mee op deze reis!</p>
      </header>

      <main>
      
        <section className="latest-blog">
          <h2>Laatste blog</h2>
          <article className="home-item" key={newest.id}>
            <h3>
              <Link to={`/blog/${newest.id}`} className="home-link">{newest.title}</Link>
            </h3>
            <p className="home-description">{newest.description}</p>
          </article>
        </section>

       
        {randomOthers.length > 0 && (
          <section className="random-blogs">
            <h2>Andere blogs</h2>
            <ul className="home-list">
              {randomOthers.map(({ id, title, description }) => (
                <li key={id} className="home-item">
                  <h3>
                    <Link to={`/blog/${id}`} className="home-link">{title}</Link>
                  </h3>
                  <p className="home-description">{description}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

