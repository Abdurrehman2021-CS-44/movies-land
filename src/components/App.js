import React, { useEffect, useState } from "react";
import "../App.css";
import SearchIcon from "../search.svg"
import Movie from "./Movie"

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = "https://www.omdbapi.com/?i=tt3896198&apikey="+API_KEY;

function App() {
    const [moviesData, setMoviesData] = useState([]);
    const [search, setSearch] = useState("");

    const getData = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();
        setMoviesData(data.Search);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setSearch(value)
    }

    const handleClick = () => {
        getData(search === "" ? "Batman" : search);
    }

    useEffect(() => {
        getData("Batman");
    }, [])

    return (<div className="app">
        <h1>Movies Land</h1>
        <div className="search">
            <input 
                type="text" 
                placeholder="Search for the movie" 
                value={search}
                onChange={handleChange}
            />
            <img src={SearchIcon} onClick={handleClick}/>
        </div>
        <div className="container">
            {   
                moviesData?.length > 0 ?
                moviesData.map((movie, index)=>{
                return (<Movie
                        key = {index}
                        Title = {movie.Title}
                        Year = {movie.Year}
                        Poster = {movie.Poster}
                        Type = {movie.Type}
                    />)})
                :
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            }
        </div>
    </div>);
}

export default App;