import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import './css/Manga.css'
export function Manga() {
    const {id} = useParams();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true); 
    const API_URL = 'https://api.jikan.moe/v4/manga/'

    useEffect (() => {
        const fetchManga = async () => {
            try{
                const response = await fetch(API_URL + id);
                const data = await response.json();
                setManga(data.data);    
            } catch (error) { 
                console.error(error)
            } finally {
                setLoading(false);
                }
            }
            fetchManga();
            }, [id]);



    return (
        <div className="manga">
            {manga && (
                <div className="manga-contain">
                    <div className="manga-img">
                    <img src={manga.images?.jpg?.image_url} alt={manga.title} />
                    </div>
                    <div className="manga-info">
                    <h2>{manga.title}</h2>
                    <p>{manga.synopsis}</p>
                        <p><strong>Score:</strong> {manga.score}</p>
                        <p><strong>Type:</strong> {manga.type}</p>
                        <p><strong>Chapters:</strong> {manga.chapters || 'N/A'}</p>
                    </div>
                </div>
            )
            }
            { !manga && loading &&
             <div className="manga-placeholder">
             <div className="manga-placeholder-img"></div>
             <div className="manga-placeholder-info">
                 <div className="placeholder-title"></div>
                 <div className="placeholder-text"></div>
                 <div className="placeholder-text short"></div>
             </div>
            </div>
            }
            {!manga && !loading &&
            <p>No manga found</p>
            }
        </div>
        );
}