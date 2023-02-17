import React, {useState, useEffect} from 'react';
import './css/styles.css';
import Logo from './img/logo/randomovie.svg';
import Banner from './img/banner/avatar.jpg';

// API
const API_URL = "https://api.themoviedb.org/3/";
const API_KEY = "?api_key=f4f9e1b6b219580330ca8cc48f5b1165";
const LANGUAGE = "&language=en-CA";
const REGION = "&watch_region=CA";

// GLOBAL VARIABLES
const minYear = 1920;
const maxProviders = 10;

const App = () => {

    const [genres, setGenres] = useState([]);
    const [providers, setProviders] = useState([]);

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

    useEffect(() => {
        searchGenres().then(data => setGenres(data));
        searchProviders().then(data => setProviders(data));
    }, [])


    return (

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
                            <button onClick="loadPopup()" id="random-movie-submit">Search</button>
                        </div>

                    </form>

                </div>

            </div>


            <img className="banner" src={Banner} alt="Avatar Banner"/>
            <div className="banner-overlay"></div>

        </section>

    );

}

export default App;