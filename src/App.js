import React, {useState, useEffect} from 'react';
import './css/styles.css';
import Logo from './img/logo/randomovie.svg';
import './config.js';
//import PopUp from "./PopUp";

// IMAGES
const MINOR_POSTER_WIDTH = "w300";
const MINOR_BACKDROP_WIDTH = "w1280"; // BANNER SIZE

// FORM
const minYear = 1920;
const defaultMinScore = 50;
const maxProviders = 10;

// TRENDING FILMS
const timeWindowDay = "day";
const timeWindowWeek = "week";
const maxTrendingFilms = 12;
let trendingTimeWindow = timeWindowDay;

// TODO: PLACEHOLDER VARIABLES
// let releaseYear = 1290; // TEST
// let genre = "28" // TEST
// let watchProvider = "8"; // TEST
// let minScore = 7.0; // TEST

const App = () => {

    //const [active, setActive] = useState("");

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [bannerPath, setBannerPath] = useState([]);

    const [genres, setGenres] = useState([]);
    const [providers, setProviders] = useState([]);

    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [movieReleaseDates, setMovieReleaseDates] = useState([]);

    const [trendingFilms, setTrendingFilms] = useState([]);

    const [formGenre, setFormGenre] = useState(28);
    const [formReleaseYear, setFormReleaseYear] = useState(minYear);
    const [formWatchProvider, setFormWatchProvider] = useState(8);
    const [formMinScore, setFormMinScore] = useState(defaultMinScore);


    // GET METHODS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getBanner = async () => {
        const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindowWeek + global.config.API.KEY);
        const data = await response.json();

        const randomBannerIndex = Math.floor(Math.random() * data.results.length);

        return data.results[randomBannerIndex].backdrop_path;
    }


    const getGenres = async () => {
        const response = await fetch(global.config.API.URL + "genre/movie/list" + global.config.API.KEY +
            global.config.LANGUAGE);
        const data = await response.json();

        //setRmGenre(data.genres[0].id);
        return data.genres;
    }


    const getProviders = async () => {
        const response = await fetch(global.config.API.URL + "watch/providers/movie" + global.config.API.KEY +
            global.config.LANGUAGE + global.config.REGION);
        const data = await response.json();

        //setRmWatchProvider(data.results[0].provider_id);
        return data.results;
    }


    const getRandomPage = async () => {
        let response = await fetch(global.config.API.URL + "discover/movie" + global.config.API.KEY +
            global.config.LANGUAGE + "&region=" + global.config.REGION +
            "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&" + formReleaseYear +
            "&vote_average.gte=" + formMinScore/10 + "&with_genres=" + formGenre + "&with_watch_providers=" + formWatchProvider +
            global.config.REGION + "&with_watch_monetization_types=flatrate");
        const data = await response.json();

        return Math.floor(Math.random() * (data.total_pages)) + 1;
    }


    const getRandomMovieID = async () => {
        const pageNumber = await getRandomPage();

        const response = await fetch(global.config.API.URL + "discover/movie" + global.config.API.KEY +
            global.config.LANGUAGE + "&region=" + global.config.REGION +
            "&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&" + formReleaseYear +
            "&vote_average.gte=" + formMinScore/10 + "&with_genres=" + formGenre + "&with_watch_providers=" + formWatchProvider +
            global.config.REGION + "&with_watch_monetization_types=flatrate");
        const data = await response.json();

        // TODO: DEBUG CONSOLE
        // console.log(formGenre);
        // console.log(formReleaseYear);
        // console.log(formWatchProvider);
        // console.log(formMinScore);

        //console.log(data.results);
        return data.results[Math.floor(Math.random() * data.results.length)].id;
    }

    const getMovieDetails = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + global.config.API.KEY + global.config.LANGUAGE)
        const data = await response.json();

        return data;
    }

    const getTrendingMovies = async (timeWindow) => {
        const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindow +
            global.config.API.KEY + global.config.LANGUAGE);
        const data = await response.json();

        return data.results;
    }


    // OTHER METHODS
    function updateTrendingFilms(timeWindow) {
        trendingTimeWindow = timeWindow;
        getTrendingMovies(timeWindow).then(data => setTrendingFilms(data));
    }


    function handleSubmit() {

        getRandomMovieID().then(id => {
            getMovieDetails(id).then(data => setMovieDetails(data));
        })


    }

    function closePopup() {
        setMovieDetails([]);
    }


    // POPUP COMPONENT - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    function PopUp ({movie}) {

        return (
            <div className="popup-container" id="popup-container">
                <div className="popup light-bg">
                    <header>
                        <a href="#" onClick={handleSubmit}>Not what you’re looking for? Click here for another random movie!</a>
                        <a href="#" className="right-side-icon" onClick={closePopup}><i className="fas fa-times icon"></i></a>
                    </header>
                    <div className="flex-container">
                        <aside>
                            <div className="separator"><img src="img/posters/spider-man.jpg" alt="Avatar Poster" className="poster"></img></div>
                            <h4 className="separator">Available for streaming on Netflix</h4>
                            <h4 className="separator"><a href=""><i className="fas fa-link left-side-icon"></i> Watch Trailer</a></h4>
                        </aside>
                        <div className="popup-text">
                            <hgroup className="green-separator">
                                <h1>{movie.title}</h1>
                                <p>2021 • PG-13 • Action, Adventure, Science Fiction
                                    • 2h 28m</p>
                            </hgroup>
                            <div className="separator">
                                <div className="tagline-score">
                                    <h4>The Multiverse unleashed.</h4>
                                    <h4>User Score: <span className="green-txt" id="popup-score">84%</span></h4>
                                </div>
                                <p>
                                    Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of
                                    being a
                                    super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous,
                                    forcing him
                                    to discover what it truly means to be Spider-Man.
                                </p>
                            </div>
                            <div className="people">
                                <ul>
                                    <li><h4>Director</h4></li>
                                    <li>Jon Watts</li>
                                </ul>
                                <ul>
                                    <li><h4>Characters</h4></li>
                                    <li>Stan Lee</li>
                                </ul>
                                <ul>
                                    <li><h4>Characters</h4></li>
                                    <li>Steve Ditko</li>
                                </ul>
                                <ul>
                                    <li><h4>Writer</h4></li>
                                    <li>Chris McKenna</li>
                                </ul>
                                <ul>
                                    <li><h4>Writer</h4></li>
                                    <li>Erik Sommers</li>
                                </ul>
                                <ul className="casting">
                                    <li><h4>Top Casting</h4></li>
                                    <li>Tom Holland</li>
                                    <li>Zendaya</li>
                                    <li>Benedict Cumberbatch</li>
                                    <li>Jacob Batalon</li>
                                    <li>Jon Favreau</li>
                                    <li>Jamie Foxx</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="popup-bg-overlay"></div>
            </div>
        )

    }


    // EFFECTS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        getBanner().then(data => setBannerPath(data));
        getGenres().then(data => setGenres(data));
        getProviders().then(data => setProviders(data));
        getTrendingMovies(trendingTimeWindow).then(data => setTrendingFilms(data));
    }, [])



    // INDEX.HTML - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (

        <div>
            {movieDetails?.length !== 0 ? <PopUp movie={movieDetails} /> : ""}

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

                        <form id="random-movie-form">

                            <div className="form-grid">
                                <div className="form-item">
                                    <label htmlFor="genre-select">Genre</label>
                                    <div className="select-container">
                                        <select name="genre" id="genre-select" value={formGenre} onChange={(e) => setFormGenre(e.target.value)}>
                                            {genres.map((genre) => (<option value={genre.id}>{genre.name}</option>))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="min-year-input">Min. Release Year</label>
                                    <input type="number" min={minYear} max={new Date().getFullYear()}
                                           step="1" name="min-year"
                                           id="min-year-input"
                                           value={formReleaseYear}
                                           onChange={(e) => setFormReleaseYear(e.target.value)}/>
                                </div>

                                <div className="form-item">
                                    <label htmlFor="streaming-select">Watch Provider</label>
                                    <div className="select-container">
                                        <select name="streaming" id="streaming-select" value={formWatchProvider} onChange={(e) => setFormWatchProvider(e.target.value)}>
                                            {providers.slice(0, maxProviders).map((provider) => (<option
                                                value={provider.provider_id}>{provider.provider_name}</option>))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-item">
                                    <div className="range-label"><label htmlFor="min-score-input">Min. User
                                        Score</label><span
                                        className={"min-score-percentage " + (formMinScore > 69 ? "green-txt" :
                                            (formMinScore > 39 ? "yellow-txt" : "red-txt"))}
                                        id="min-score-percentage">{formMinScore + "%"}</span></div>
                                    <input type="range" min="0" max="100" step="1" placeholder={formMinScore}
                                           name="min-score"
                                           id="min-score-input"
                                           value={formMinScore}
                                           onChange={(e) => setFormMinScore(e.target.value)}/>
                                </div>

                                <div className="form-item checkbox-container">
                                    <input type="checkbox" name="popular" id="popular-input"/>
                                    <label htmlFor="popular-input">Find me something popular at the moment</label>
                                </div>
                            </div>

                        </form>

                        <div className="button-container">
                            <button id="random-movie-submit" onClick={handleSubmit}>Search</button>
                        </div>

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
                                className={"small-btn " + (trendingTimeWindow === timeWindowDay ? "selected-btn" :
                                    "unselected-btn")}
                                id="trending-day">Today
                        </button>
                        <button onClick={() => updateTrendingFilms(timeWindowWeek)}
                                className={"small-btn " + (trendingTimeWindow === timeWindowWeek ? "selected-btn" :
                                    "unselected-btn")}
                                id="trending-week">This week
                        </button>
                        {/*<button onClick={() => updateTrendingFilms(trendingTimeWindow)} className="small-btn"*/}
                        {/*        id="trending-refresh">Refresh*/}
                        {/*</button>*/}
                    </div>
                    <div className="movie-grid">
                        {trendingFilms.slice(0, maxTrendingFilms).map((film) => (<div className="movie-item">
                            <a href="" className="poster-link">
                                <img src={global.config.API.IMAGE_URL + MINOR_POSTER_WIDTH + film.poster_path}
                                     alt="Avatar Poster"
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