import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Categories.css';

export function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [mangas, setMangas] = useState([]);
  const navigate = useNavigate();
  const API_URL = 'https://api.jikan.moe/v4/genres/manga';

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        const uniqueCategories = Array.from(new Set(data.data.map(a => a.mal_id)))
          .map(id => {
            return data.data.find(a => a.mal_id === id)
          });
        setCategories(uniqueCategories || []);
        // Establecer la categoría de acción como seleccionada por defecto
        const actionCategory = uniqueCategories.find(category => category.name.toLowerCase() === 'action');
        if (actionCategory) {
          setSelectedCategory(actionCategory.mal_id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchMangas = async () => {
      if (selectedCategory) {
        try {
          const response = await fetch(`https://api.jikan.moe/v4/manga?genres=${selectedCategory}`);
          const data = await response.json();
          setMangas(data.data || []);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchMangas();
  }, [selectedCategory]);

  return (
    <div className="categories-container">
      <div className="categories-list">
        {categories.slice(0, 15).map((category) => (
          <div
            key={category.mal_id}
            className={`category-item ${selectedCategory === category.mal_id ? 'selected' : ''}`}
            onClick={() => setSelectedCategory(category.mal_id)}
          >
            <p>{category.name}</p>
          </div>
        ))}
      </div>
      <div className="list-manga-category">
        {mangas.length > 0 ? (
          mangas.slice(0, 12).map((manga) => (
            <div key={manga.mal_id} className="manga-panel">
              <img src={manga.images?.jpg?.image_url} alt={manga.title} />
              <h3>{manga.title}</h3>
            </div>
          ))
        ) : (
          <p>No se encontraron mangas para esta categoría.</p>
        )}
      </div>
    </div>
  );
}
