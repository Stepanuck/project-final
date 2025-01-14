import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './css/ListManga.css';
import './css/listMangaSearch.css'

export function ListPopularManga() {
  const [popularMangas, setPopularMangas] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'https://api.jikan.moe/v4/top/manga?filter=bypopularity&limit=10';

  useEffect(() => {
    const fetchPopularMangas = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPopularMangas(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMangas();
  }, []);

  if (loading) {
    return <p>Cargando Manga Populares</p>;
  }

  return (
    <section className="list-manga">
      <h2>Mangas Populares</h2>
      <div className="manga-grid">
      {popularMangas.length > 0 ? (
        popularMangas.map((manga) => (
          <Link key={manga.mal_id} className="manga-panel" to={`/manga/${manga.mal_id}`}>
            <img src={manga.images?.jpg?.image_url} alt={manga.title} />
            <p>{manga.title}</p>
          </Link>
        ))
      ) : (
        <p>No se encontraron mangas populares</p>
      )}
      </div>
    </section>
  );
}
