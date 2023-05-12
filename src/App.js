import React, {useState, useEffect} from 'react';
import './css/styles.css';
import Logo from './img/logo/randomovie.svg';
import './config.js';
import PopUp from "./PopUp";

// IMAGES
const MINOR_POSTER_WIDTH = "w300";
const MINOR_BACKDROP_WIDTH = "w1280"; // BANNER SIZE

// FORM
const minYear = 1920;
const maxProviders = 10;

// TRENDING FILMS
const timeWindowDay = "day";
const timeWindowWeek = "week";
const maxTrendingFilms = 6;
let trendingTimeWindow = timeWindowDay;

// TODO: PLACEHOLDER VARIABLES
let releaseYear = 1290; // TEST
let genre = "28" // TEST
let watchProvider = "8"; // TEST
let minScore = 7.0; // TEST

const App = () => {

    //const [active, setActive] = useState("");

    // STATES
    const [bannerPath, setBannerPath] = useState([]);
    const [score, setScore] = useState([50,]);

    const [genres, setGenres] = useState([]);
    const [providers, setProviders] = useState([]);

    const [randomPageNumber, setRandomPageNumber] = useState([]);
    const [randomMovie, setRandomMovie] = useState([]);

    const [trendingFilms, setTrendingFilms] = useState([]);


    // FUNCTIONS

    const searchBanner = async () => {
        const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindowWeek + global.config.API.KEY);
        const data = await response.json();

        const randomBannerIndex = Math.floor(Math.random() * data.results.length);

        return data.results[randomBannerIndex].backdrop_path;
    }


    const updateScore = (e) => {
        setScore(e.target.value);
    };


    const searchGenres = async () => {
        const response = await fetch(global.config.API.URL + "genre/movie/list" + global.config.API.KEY + global.config.LANGUAGE);
        const data = await response.json();

        return data.genres;
    }


    const searchProviders = async () => {
        const response = await fetch(global.config.API.URL + "watch/providers/movie" + global.config.API.KEY + global.config.LANGUAGE + global.config.REGION);
        const data = await response.json();

        return data.results;
    }


    // TODO: Need to completed/renamed/moved elsewhere
    const getRandomPage = async () => {
        let response = await fetch(global.config.API.URL + "discover/movie" + global.config.API.KEY + global.config.LANGUAGE + "&region=" + global.config.REGION + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&" + releaseYear + "&vote_average.gte=" + minScore + "&with_genres=" + genre + "&with_watch_providers=" + watchProvider + global.config.REGION + "&with_watch_monetization_types=flatrate");
        const data = await response.json();

        return Math.floor(Math.random() * (data.total_pages)) + 1;
    }


    // TODO: Need to completed/renamed/moved elsewhere
    const searchRandomMovie = async (pageNumber) => {
        const response = await fetch(global.config.API.URL + "discover/movie" + global.config.API.KEY + global.config.LANGUAGE + "&region=" + global.config.REGION + "&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&" + releaseYear + "&vote_average.gte=" + minScore + "&with_genres=" + genre + "&with_watch_providers=" + watchProvider + global.config.REGION + "&with_watch_monetization_types=flatrate");
        const data = await response.json();

        return data.results[Math.floor(Math.random() * data.results.length)];
    }


    const searchTrendingFilms = async (timeWindow) => {
        const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindow + global.config.API.KEY + global.config.LANGUAGE);
        const data = await response.json();

        return data.results;
    }


    function updateTrendingFilms(timeWindow) {
        trendingTimeWindow = timeWindow;

        searchTrendingFilms(trendingTimeWindow).then(data => setTrendingFilms(data));
    }


    function handleSubmit() {
        getRandomPage().then(data => setRandomPageNumber((data)));
        searchRandomMovie(randomPageNumber).then(data => setRandomMovie(data));
    }


    // EFFECTS
    useEffect(() => {
        searchBanner().then(data => setBannerPath(data));
        searchGenres().then(data => setGenres(data));
        searchProviders().then(data => setProviders(data));
        searchTrendingFilms(trendingTimeWindow).then(data => setTrendingFilms(data));
    }, [])


    // INDEX.HTML
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
                            <p>Tell us what you're looking for and receive something at random!</p>
                        </hgroup>

                        <form id="random-movie-form" onSubmit={handleSubmit}>

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="genre-select">Genre</label>
                                    <div className="select-container">
                                        <select name="genre" id="genre-select">
                                            {genres.map((genre) => (<option value={genre.id}>{genre.name}</option>))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="min-year-input">Min. Release Year</label>
                                    <input type="number" min={minYear} max={new Date().getFullYear()}
                                           placeholder={minYear}
                                           step="1" name="min-year"
                                           id="min-year-input"/>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="streaming-select">Watch Provider</label>
                                    <div className="select-container">
                                        <select name="streaming" id="streaming-select">
                                            {providers.slice(0, maxProviders).map((provider) => (<option
                                                    value={provider.provider_id}>{provider.provider_name}</option>))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item">
                                    <div className="range-label"><label htmlFor="min-score-input">Min. User
                                        Score</label><span
                                        className={"min-score-percentage " + (score > 69 ? "green-txt" : (score > 39 ? "yellow-txt" : "red-txt"))}
                                        id="min-score-percentage">{score + "%"}</span></div>
                                    <input type="range" min="0" max="100" step="1" placeholder={score}
                                           onChange={updateScore} name="min-score"
                                           id="min-score-input"/>
                                </div>

                                <div className="form-item checkbox-container">
                                    <input type="checkbox" name="popular" id="popular-input"/>
                                    <label htmlFor="popular-input">Find me something popular at the moment</label>
                                </div>
                            </div>

                            <div className="button-container">
                                <button id="random-movie-submit" type="submit">Search</button>
                            </div>

                        </form>

                    </div>

                </div>

                <img className="banner"
                     src={bannerPath.length > 0 ? (global.config.API.IMAGE_URL + MINOR_BACKDROP_WIDTH + bannerPath) : ""}
                     alt="Avatar Banner"/>
                <div className="banner-overlay"></div>

            </section>

            <section className="trending light-bg">
                <div className="wrapper">
                    <hgroup className="separator">
                        <h1>Want some options right away?</h1>
                        <p>Check out what movies are trending at the moment!</p>
                    </hgroup>
                    <div className="button-container">
                        <button onClick={() => updateTrendingFilms(timeWindowDay)}
                                className={"small-btn " + (trendingTimeWindow === timeWindowDay ? "selected-btn" : "unselected-btn")}
                                id="trending-day">Today
                        </button>
                        <button onClick={() => updateTrendingFilms(timeWindowWeek)}
                                className={"small-btn " + (trendingTimeWindow === timeWindowWeek ? "selected-btn" : "unselected-btn")}
                                id="trending-week">This week
                        </button>
                        <button onClick={() => updateTrendingFilms(trendingTimeWindow)} className="small-btn"
                                id="trending-refresh">Refresh
                        </button>
                    </div>
                    <div className="movie-grid">
                        {trendingFilms.slice(0, maxTrendingFilms).map((film) => (<div className="movie-item">
                                <a href="" className="poster-link">
                                    <img src={global.config.API.IMAGE_URL + MINOR_POSTER_WIDTH + film.poster_path} alt="Avatar Poster"
                                         className="poster"></img>
                                    <div className="poster-overlay"></div>
                                </a>
                                <a href="#"><h4>{film.title} <span
                                    className="year">({film.release_date.substring(0, 4)})</span></h4></a>
                            </div>))}

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