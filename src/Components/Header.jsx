import { useState } from "react";
import { HiSearch } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import "./css/Header.css";

export default function Header({ changeSearch }) {
  const [prevSearch, setPrevSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    changeSearch(prevSearch);
    setPrevSearch("");
    navigate(`/search?query=${prevSearch}`);
  };

  return (
    <header className="header">
      <div className="Search">
        <input 
          type="text" 
          placeholder="Buscar..." 
          value={prevSearch}
          onChange={(e) => setPrevSearch(e.target.value)}  
        />
        <button className="button" onClick={handleSearch}> 
          <HiSearch />
        </button>
      </div>
      <nav className="nav">
        <Link className="button" to={`/`}>Inicio</Link>
        <Link className="button" to={`/categories`}>Categorías</Link>
        
      </nav>
    </header>
  );
}
