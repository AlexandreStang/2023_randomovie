import React, {useEffect, useState} from 'react';
import '../../config.js';

const maxCrew = 6;
const maxCast = 7;

export default function PopUp({movieID, watchProvider, onClosePopup, onTryAgain}) {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [movieProvider, setMovieProvider] = useState([""]);
    const [movieCertification, setMovieCertification] = useState([""]);
    const [movieTrailer, setMovieTrailer] = useState([""])

    // GETTERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getMovieDetails = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID +
            global.config.API.KEY + "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        console.log("MovieDetails", data)
        console.log(data.release_date)

        return data;
    }

    const getMovieCredits = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + "/credits" +
            global.config.API.KEY + "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        console.log("MovieCredits", data)

        return data;
    }

    const getMovieReleaseDates = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + "/release_dates" +
            global.config.API.KEY + "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        console.log("MovieReleaseDate", data)

        return data.results;
    }

    const getMovieTrailers = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + "/videos" +
            global.config.API.KEY)
        const data = await response.json();

        console.log("MovieTrailer", data)

        return data.results
    }

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        console.log(movieID, watchProvider)

        getMovieDetails(movieID).then(data => setMovieDetails(data));
        getMovieCredits(movieID).then(data => setMovieCredits(data));
        getMovieReleaseDates(movieID).then(data => findMovieCertification(data));
        getMovieTrailers(movieID).then(data => findMovieTrailer(data));

        watchProvider ? setMovieProvider(watchProvider) : setMovieProvider("");

    }, [movieID, watchProvider]);

    function calculateRuntime(time) {
        const minutes = time % 60;

        if (time < 60) {
            return (minutes + "m");
        }

        var hours = Math.floor(time / 60);

        return (hours + "h " + minutes + "m");
    }

    function findMovieCertification(allReleases) {
        try {
            const localRelease = allReleases.find((release) => release.iso_3166_1 === global.config.REGION);
            const certifiedRelease = localRelease.release_dates.find((release) => release.certification !== "");

            setMovieCertification(certifiedRelease.certification ? certifiedRelease.certification : "");
        } catch (error) {
            setMovieCertification("");
        }
    }

    function findMovieTrailer(trailers) {
        try {
            const trailer = trailers.find((video) => video.type === "Trailer" && video.site === "YouTube");

            setMovieTrailer(trailer.key ? "https://www.youtube.com/watch?v=" + trailer.key : "");
        } catch (error) {
            setMovieTrailer("");
        }
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div className="popup-container" id="popup-container">
            <div className="popup light-bg">
                <header>
                    <div className={"clickable"} onClick={onTryAgain}>Not what you’re looking for? Click here for
                        another random movie!
                    </div>
                    <div className="right-side-icon clickable" onClick={onClosePopup}>
                        <i className="fas fa-times icon"></i>
                    </div>
                </header>
                <div className="flex-container">
                    <aside>
                        {/*POSTER*/}
                        <div className="separator">
                            <img
                                src={global.config.API.IMAGE_URL + global.config.API.IMAGE_WIDTH.MEDIUM_POSTER +
                                    movieDetails.poster_path}
                                alt="Poster"
                                className="poster">
                            </img>
                        </div>
                        {/*WATCH PROVIDER*/}
                        {movieProvider ?
                            <h4 className="separator">Available on {movieProvider}</h4>
                        : ""}
                        {/*TRAILER*/}
                        {movieTrailer ?
                            <h4 className="separator"><a href={movieTrailer}>
                                <i className="fas fa-link left-side-icon"></i> Watch Trailer</a>
                            </h4> : ""}
                    </aside>
                    <div className="popup-text">
                        <hgroup className="green-separator">
                            {/*TITLE*/}
                            <h1>
                                {movieDetails.title}
                            </h1>
                            {/*RELEASE DATE, , GENRES, RUNTIME*/}
                            <p>
                                {movieDetails.release_date ? movieDetails.release_date.split('-')[0] : "Unknown"}
                                {" • "}
                                {movieCertification ? movieCertification + " • " : ""}
                                {movieDetails.genres ?
                                    movieDetails.genres.map((genre, i) => i + 1 === movieDetails.genres.length ?
                                        genre.name : genre.name + ", ") : "Unknown"}
                                {" • "}
                                {calculateRuntime(movieDetails.runtime)}
                            </p>
                        </hgroup>
                        <div className="separator">
                            <div className="tagline-score">
                                {/*TAGLINE*/}
                                <h4>{movieDetails.tagline}</h4>
                                {/*USER SCORE*/}
                                <h4>User Score:
                                    {" "}
                                    <span className="green-txt" id="popup-score">
                                        {Math.round(movieDetails.vote_average * 10)}%
                                    </span>
                                </h4>
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
                                {movieCredits.cast ? movieCredits.cast.slice(0, maxCast).map(
                                    (castMember) => <li key={castMember.id}>{castMember.name}</li>) : <li>Unknown</li>}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="popup-bg-overlay"></div>
        </div>
    )
}