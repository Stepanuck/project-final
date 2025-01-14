import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import './css/ListManga.css';
import "./css/ListMangaSearch.css";
import './css/Manga.css'

export function SearchManga() {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'https://api.jikan.moe/v4/manga';
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const search = queryParams.get('query');

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
    <section className="list-manga-search">
      <div className="contain-h2">
      <h2 className="search-manga-h2">Resultados para {search}</h2>
      </div>
      <div className="manga-grid">
        {mangas.length > 0 ? (
          mangas.slice(0, 10).map((manga) => (
            <Link key={manga.mal_id} className="manga-panel" to={`/manga/${manga.mal_id}`}>
              <img src={manga.images?.jpg?.image_url} alt={manga.title} />
              <p>{manga.title}</p>
            </Link>
          ))
        ) : (
          <div className="manga-not-found">
          <p >No se encontraron mangas.</p>
          </div>  
        )}
      </div>
    </section>
  );
}
