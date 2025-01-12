import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';    
import './css/Categories.css'

export function Categories() {
    
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const API_URL = 'https://api.jikan.moe/v4/genres/manga';
    

    useEffect (() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                setCategories(data.data || []);
                } catch (error) {
                    console.error(error);
                    }
                    }
                    fetchCategories();
                    }, []);
                    return (
                        <section className="list-categories">
                          {categories.map((category) => (
                            <div
                             key={category.mal_id}
                             className="categories"
                             onClick={() => navigate(`/categories/${category.mal_id}`)}
                            >
                                <p>{category.name}</p>
                                </div>
                            ))}
                        </section>
                    );
                }
        
