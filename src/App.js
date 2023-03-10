import React, {useState, useEffect} from 'react';
import './css/styles.css';
import Logo from './img/logo/randomovie.svg';
import Banner from './img/banner/avatar.jpg';
import Poster from './img/posters/avatar.jpg';

// API
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "?api_key=f4f9e1b6b219580330ca8cc48f5b1165";
const LANGUAGE = "&language=en-CA";
const REGION = "&watch_region=CA";

// IMAGES
const IMAGE_URL = "https://image.tmdb.org/t/p/";
const MINOR_POSTER_WIDTH = "w300";

// GLOBAL VARIABLES
const minYear = 1920;
const maxProviders = 10;
const maxTrendingFilms = 6;
let trendingTimeWindow = "day";

const App = () => {

    const [active, setActive] = useState("");
    const [genres, setGenres] = useState([]);
    const [providers, setProviders] = useState([]);
    const [trendingFilms, setTrendingFilms] = useState([]);

    const searchGenres = async () => {
        const response = await fetch(API_URL + "genre/movie/list" + API_KEY + LANGUAGE);
        const data = await response.json();

        return data.genres;
    }

    const searchProviders = async () => {
        const response = await fetch(API_URL + "watch/providers/movie" + API_KEY + LANGUAGE + REGION);
        const data = await response.json();

        return data.results;
    }

    const searchTrendingFilms = async (timeWindow) => {
        const response = await fetch(API_URL + "trending/movie/" + timeWindow + API_KEY + LANGUAGE);
        const data = await response.json();

        //console.log(data);
        console.log(data.results);

        return data.results;
    }

    function updateFilms(timeWindow) {
        trendingTimeWindow = timeWindow;

        searchTrendingFilms(trendingTimeWindow).then(data => setTrendingFilms(data));
    }

    useEffect(() => {
        searchGenres().then(data => setGenres(data));
        searchProviders().then(data => setProviders(data));
        searchTrendingFilms(trendingTimeWindow).then(data => setTrendingFilms(data));
    }, [])


    return (

        <div>
            <section className="hero dark-bg">
                <div className="wrapper">
                    <header>
                        <a className="logo" href="#"><img src={Logo} alt="Randomovie Logo"/></a>
                    </header>

                    <div className="welcome">
                        <hgroup className="separator">
                            <h1>Looking for new cinematic experiences?</h1>
                            <p>Tell us what you're looking for and receive something random!</p>
                        </hgroup>

                        <form action="#" id="random-movie-form">

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="genre-select">Genre</label>
                                    <div className="select-container">
                                        <select name="genre" id="genre-select">
                                            {
                                                genres.map((genre) => (
                                                    <option value={genre.id}>{genre.name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="min-year-input">Min. Release Year</label>
                                    <input type="number" min={minYear} max={new Date().getFullYear()} placeholder="1920"
                                           step="1" name="min-year"
                                           id="min-year-input"/>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="streaming-select">Watch Provider</label>
                                    <div className="select-container">
                                        <select name="streaming" id="streaming-select">
                                            {
                                                providers.slice(0, maxProviders).map((provider) => (
                                                    <option value={provider.provider_id}>{provider.provider_name}</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item">
                                    <div className="range-label"><label htmlFor="min-score-input">Min. User
                                        Score</label><span
                                        className="min-score-percentage" id="min-score-percentage"></span></div>
                                    <input type="range" min="0" max="100" step="1" placeholder="50" name="min-score"
                                           id="min-score-input"/>
                                </div>

                                <div className="form-item checkbox-container">
                                    <input type="checkbox" name="popular" id="popular-input"/>
                                    <label htmlFor="popular-input">Find me something popular at the moment</label>
                                </div>
                            </div>

                            <div className="button-container">
                                <button id="random-movie-submit">Search</button>
                            </div>

                        </form>

                    </div>

                </div>

                <img className="banner" src={Banner} alt="Avatar Banner"/>
                <div className="banner-overlay"></div>

            </section>

            <section className="trending light-bg">
                <div className="wrapper">
                    <hgroup className="separator">
                        <h1>Want some options right away?</h1>
                        <p>Check out what movies are trending right now!</p>
                    </hgroup>
                    <div className="button-container">
                        <button onClick={() => updateFilms("day")} className="small-btn selected-btn" id="trending-day">Today</button>
                        <button onClick={() => updateFilms("week")} className="small-btn unselected-btn" id="trending-week">This week</button>
                        <button onClick={() => updateFilms(trendingTimeWindow)} className="small-btn" id="trending-refresh">Refresh</button>
                    </div>
                    <div className="movie-grid">
                        {
                            trendingFilms.slice(0, maxTrendingFilms).map((film) => (
                                <div className="movie-item">
                                    <a href="" className="poster-link">
                                        <img src={IMAGE_URL + MINOR_POSTER_WIDTH + film.poster_path} alt="Avatar Poster" className="poster"></img>
                                        <div className="poster-overlay"></div>
                                    </a>
                                    <a href="#"><h4>{film.title} <span className="year">({film.release_date.substring(0, 4)})</span></h4></a>
                                </div>
                            ))
                        }

                    </div>
                </div>
            </section>

            <footer>
                <p>Built by <a href="http://alexandrestang.com/">Alexandre Stang</a> | Powered by <a
                    href="https://www.themoviedb.org/">TheMovieDB</a></p>
            </footer>
        </div>

    );

}

export default App;