import Tabs from "../Tabs";
import React, {useEffect, useState} from "react";

const timeWindows = [
    {value: global.config.API.TIME_WINDOW.DAY, label: "Today"},
    {value: global.config.API.TIME_WINDOW.WEEK, label: "This week"}
]

const maxMovies = 12

export default function Trending({onSelectMovie}) {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [timeWindow, setTimeWindow] = useState([timeWindows[0].value]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getTrendingMovies = async (timeWindow) => {
        const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindow +
            global.config.API.KEY + "&language=" + global.config.LANGUAGE);
        const data = await response.json();

        return data.results;
    }

    useEffect(() => {
        getTrendingMovies(timeWindow).then(data => setTrendingMovies(data));
    }, [timeWindow])

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <section className="trending light-bg">
            <div className="wrapper">
                <hgroup className="separator">
                    <h1>Want some options right away?</h1>
                    <p>Check out what movies are trending at the moment!</p>
                </hgroup>
                <Tabs categories={timeWindows}
                      onSelectCategory={(timeWindow) => setTimeWindow(timeWindow)}></Tabs>
                <div className="movie-grid">
                    {trendingMovies.slice(0, maxMovies).map((movie) => (
                        <TrendingMovie
                            movie={movie}
                            onClickMovie={(movieID) => onSelectMovie(movieID)}
                            key={movie.id}></TrendingMovie>))}
                </div>
                {/*<div className={"page-navigation"}>*/}
                {/*    <div className={"clickable"} onClick={x => changePage(-1)}><i className="fas fa-angle-left"></i> Prev</div>*/}
                {/*    <div className={"clickable"} onClick={x=> changePage(1)}>Next <i className="fas fa-angle-right"></i> </div>*/}
                {/*</div>*/}
            </div>
        </section>
    )
}

function TrendingMovie({movie, onClickMovie}) {

    function handleClick() {
        onClickMovie(movie.id)
    }

    return (
        <div className="movie-item">
            <div className="poster-link clickable" onClick={handleClick}>
                <img
                    src={global.config.API.IMAGE_URL +
                        global.config.API.IMAGE_WIDTH.SMALL_POSTER +
                        movie.poster_path}
                    alt={movie.title + "Poster"}
                    className="poster"></img>
                <div className="poster-overlay"></div>
            </div>
            <div className="clickable" onClick={handleClick}>
                <h4>{movie.title} {" "}
                    <span className="year">({movie.release_date.split('-')[0]})</span>
                </h4>
            </div>
        </div>
    )
}