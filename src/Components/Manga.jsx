import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import './css/Manga.css';

export function Manga() {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [recommend, setRecommend] = useState([]);
    const [loadingManga, setLoadingManga] = useState(true);
    const [loadingRecommendations, setLoadingRecommendations] = useState(true);

    const API_URL = `https://api.jikan.moe/v4/manga/${id}`;
    const API_URL_RECOMMEND = `https://api.jikan.moe/v4/manga/${id}/recommendations`;

    useEffect(() => {
        const fetchManga = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setManga(data.data);
            } catch (error) {
                console.error("Error fetching manga:", error);
            } finally {
                setLoadingManga(false);
            }
        };

        const fetchRecommendations = async () => {
            try {
                const response = await fetch(API_URL_RECOMMEND);
                const data = await response.json();
                setRecommend(data.data || []);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            } finally {
                setLoadingRecommendations(false);
            }
        };

        fetchManga();
        fetchRecommendations();
    }, [id]);

    return (
        <div className="manga">
            {!loadingManga && manga && (
                <section className="manga-contain">
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
                </section>
            )}
            {loadingManga && (
                <div className="manga-placeholder">
                    <div className="manga-placeholder-img"></div>
                    <div className="manga-placeholder-info">
                        <div className="placeholder-title"></div>
                        <div className="placeholder-text"></div>
                        <div className="placeholder-text short"></div>
                    </div>
                </div>
            )}

            <div className="recommended-manga">
                <h3>Mangas recomendados</h3>
                {!loadingRecommendations && recommend.length > 0 && (
                    <div className="carousel">
                        {recommend.slice(0, 8).map((rec, index) => (
                            <div key={index} className="carousel-item">
                                 <Link to={`/manga/${rec.entry.mal_id}`}>
                                    <img
                                        src={rec.entry.images?.jpg?.image_url}
                                        alt={rec.entry.title}
                                    />
                                    <p>{rec.entry.title}</p>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                {loadingRecommendations && (
                    <div className="recommendations-placeholder">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="recommendation-placeholder">
                                <div className="recommendation-placeholder-img"></div>
                                <div className="recommendation-placeholder-title"></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {!loadingManga && !manga && !loadingRecommendations && !recommend.length && (
                <div className="manga-not-found">
                    <p>Manga no econtrado</p>
                    <p>Mangas recomendados no encontrado</p>
                </div>
            )}
        </div>
    );
}
