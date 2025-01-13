import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import { Main } from './Components/Main';
import { Manga } from './Components/Manga';
import { Categories } from './Components/Categories';
import { ListManga } from './Components/ListManga';
import { SearchManga } from './Components/SearchManga';

import './reset.css';

export default function App() {
  const [search, setSearch] = useState('');
  const [listManga, setListManga] = useState([]);
  const API_URL = 'https://api.jikan.moe/v4/manga?q=';

  const changeSearch = (value) => { setSearch(value); };

  useEffect(() => {
    const fetchManga = async () => {
      try {
        const response = await fetch(API_URL + search);
        const manga = await response.json();
        setListManga(manga.data);
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchManga();
  }, [search]);

  return (
    <>
      <Header search={search} changeSearch={changeSearch} />
      <Routes>
        <Route path="/" element={<Main search={search} />} />
        <Route path="/manga/:id" element={<Manga />} />
        <Route path="/search" element={<SearchManga search={search} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryId" element={<ListManga />} />
      </Routes>
    </>
  );
}


