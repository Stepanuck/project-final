import { useEffect, useState } from 'react';
import { HiArrowsRightLeft } from 'react-icons/hi2';

import './css/RandomManga.css'

export default function RandomManga() {
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [synopsis, setSynopsis] = useState('');
    const API_URL = "https://api.jikan.moe/v4/random/manga";

    useEffect(() => {
        fetchManga();
    }, []);

    const fetchManga = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            setManga(data.data); 
            setSynopsis(data.data.synopsis.substring(0, 100) + '...');
            console.log(data)
        } catch (error) {
            console.log("Error: " + error);
        } finally {
            setLoading(false); 
        }
    };
    if (!manga) {
        return <p>No se encontró ningún manga.</p>;
    }

    return (
        <>
            {manga &&
            <article className='mangaMain'>
            <img 
                src={manga.images?.jpg?.image_url} 
                alt={manga.title || "Manga sin título"} 
            />
            <div className='content'>
            <h2>{manga.title}</h2>
            <p>{synopsis || "Sin descripción disponible."}</p>
            </div>
            <button className='button button-random' onClick={() => fetchManga()}>
                {
                    loading && <div className='spin'></div> 
                }
                {
                    !loading && <><HiArrowsRightLeft size={18}/>Obtener otro manga </>   
                }  
                </button>
            </article>
            }
        </>
    );
}
