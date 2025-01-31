import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './css/ListManga.css';

export function ListManga() {
  const { categoryId } = useParams();
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'https://api.jikan.moe/v4/manga';

  useEffect(() => {
    const fetchMangas = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?genres=${categoryId}`);
        const data = await response.json();
        setMangas(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (categoryId) {
      fetchMangas();
    }
  }, [categoryId]);

  if (loading) {
    return <p>Cargando mangas...</p>;
  }

  return (
    <section className="list-manga">
      <h2>Mangas encontrados de esta categoría</h2>
      {mangas.length > 0 ? (
        mangas.map((manga) => (
          <Link key={manga.mal_id} className="manga-panel" to={`/manga/${manga.mal_id}`}>
            <img src={manga.images?.jpg?.image_url} alt={manga.title} />
            <h2>{manga.title}</h2>
          </Link>
        ))
      ) : (
        <p>No se encontraron mangas para esta categoría.</p>
      )}
    </section>
  );
}
