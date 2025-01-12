import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './css/ListManga.css';

export function SearchManga({ search }) {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'https://api.jikan.moe/v4/manga';

  useEffect(() => {
    const fetchMangas = async () => {
      if (search) {
        setLoading(true);
        try {
          const response = await fetch(`${API_URL}?q=${search}`);
          const data = await response.json();
          setMangas(data.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchMangas();
  }, [search]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <section className="list-manga">
      {mangas.length > 0 ? (
        mangas.map((manga) => (
          <Link key={manga.mal_id} className="manga-panel" to={`/manga/${manga.mal_id}`}>
            <img src={manga.images?.jpg?.image_url} alt={manga.title} />
            <h2>{manga.title}</h2>
          </Link>
        ))
      ) : (
        <p>No mangas found.</p>
      )}
    </section>
  );
}