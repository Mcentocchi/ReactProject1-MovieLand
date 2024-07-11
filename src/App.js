import React from 'react';
import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg'
const API_URL= "http://www.omdbapi.com?apikey=5471129e";

const movie1 = {
    "Title": "Batman Returns",
    "Year": "1992",
    "imdbID": "tt0103776",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOGZmYzVkMmItM2NiOS00MDI3LWI4ZWQtMTg0YWZkODRkMmViXkEyXkFqcGdeQXVyODY0NzcxNw@@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    
    const [searchTerm , setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('spider'); 
    }, []);
    return (
        <div>
            <div className='app'>
                <h1>Movie Land</h1>
                <div className='search'>
                    <input 
                        placeholder='Search for movies'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}	
                    />
                    <img 
                        src={SearchIcon}
                        alt='Search Icon'
                        onClick={() => searchMovies(searchTerm)}
                    />
                </div>
                {movies?.length > 0
                ? (
                    <div className='container'>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <h2>No movies found</h2>
                )}

            </div>  
        </div>
    );
}

export default App;