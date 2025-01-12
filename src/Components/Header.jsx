import { useState } from "react";
import {HiSearch} from 'react-icons/hi';
import {Link} from 'react-router-dom';
import "./css/Header.css"

export default function Header({ changeSearch}) {
  const [prevSearch , setPrevSearch] = useState("");
  return (
        <header className="header">
      <div className="Search">
        <input type="text" 
        placeholder="Buscar..." 
        value={prevSearch}
        onChange={(e) => setPrevSearch(e.target.value)} 
        />
        <button className="button" onClick={() => changeSearch(prevSearch)}><HiSearch/></button>
      </div>
      <nav className="nav">
        <Link className="button" to={`/`} href="#inicio">Inicio</Link>
        <a className= "button" href="#mas-buscados">Más Buscados</a>
        <Link className= "button" to={`/categories`}>Categorías</Link>
        <a className= "button" href="#resenas">Reseñas</a>
        <a className= "button" href="#temas">Temas</a>
      </nav>
      <div className="header_log">
        <button className="button login">Iniciar Sesión</button>
        <button className="button register">Crear Cuenta</button>
      </div>
    </header>
    )
}