import React, {useState} from 'react';
import './config.js';

function calculateRuntime(time) {
    const minutes = time % 60;

    if (time < 60) {
        return (minutes + "m");
    }

    var hours = Math.floor(time/60);

    return (hours + "h " + minutes + "m");
}

const PopUp = ({movieID}) => {

    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [movieReleaseDate, setMovieReleaseDate] = useState([]);

    function closePopup() {
        setMovieDetails([]);
    }

    const getMovieDetails = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        return data;
    }


    const getMovieCredits = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + "/credits" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        return data;
    }

    const getMovieReleaseDate = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + "/release_dates" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        return data;
    }

    getMovieDetails(movieID).then(data => setMovieDetails(data));
    getMovieCredits(movieID).then(data => setMovieCredits(data));
    getMovieReleaseDate(movieID).then(data => setMovieReleaseDate(data))

    return (
        <div className="popup-container" id="popup-container">
            <div className="popup light-bg">
                <header>
                    <a href="#" onClick={handleSubmit}>Not what you’re looking for? Click here for another random movie!</a>
                    <a href="#" className="right-side-icon" onClick={closePopup}><i className="fas fa-times icon"></i></a>
                </header>
                <div className="flex-container">
                    <aside>
                        {/*POSTER*/}
                        <div className="separator"><img src="img/posters/spider-man.jpg" alt="Avatar Poster" className="poster"></img></div>
                        {/*WATCH PROVIDER*/}
                        <h4 className="separator">Available on {""}</h4>
                        {/*TRAILER*/}
                        <h4 className="separator"><a href=""><i className="fas fa-link left-side-icon"></i> Watch Trailer</a></h4>
                    </aside>
                    <div className="popup-text">
                        <hgroup className="green-separator">
                            {/*TITLE*/}
                            <h1>{movieDetails.title}</h1>
                            {/*RELEASE DATE, , GENRES, RUNTIME*/}
                            <p>{movieDetails.release_date.split('-')[0]} • PG-13 • Action, Adventure, Science Fiction
                                • {calculateRuntime(movieDetails.runtime)}</p>
                        </hgroup>
                        <div className="separator">
                            <div className="tagline-score">
                                {/*TAGLINE*/}
                                <h4>{movieDetails.tagline}</h4>
                                {/*USER SCORE*/}
                                <h4>User Score: <span className="green-txt" id="popup-score">{Math.round(movieDetails.vote_average*10)}%</span></h4>
                            </div>
                            <p>
                                {/*OVERVIEW*/}
                                {movieDetails.overview}
                            </p>
                        </div>
                        {/*PEOPLE*/}
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

export default PopUp;