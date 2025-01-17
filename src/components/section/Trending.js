import Tabs from "../Tabs";
import TrendingMovie from "../TrendingMovie";
import React, {useEffect, useState} from "react";

const timeWindows = [
    {value: global.config.API.TIME_WINDOW.DAY, label: "Today"},
    {value: global.config.API.TIME_WINDOW.WEEK, label: "This week"}
]

const maxMovies = 12

export default function Trending() {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [trendingMovies, setTrendingMovies] = useState([]);

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getTrendingMovies = async (timeWindow) => {
        const response = await fetch(global.config.API.URL + "trending/movie/" + timeWindow +
            global.config.API.KEY + "&language=" + global.config.LANGUAGE);
        const data = await response.json();

        return data.results;
    }

    function updateTrending(timeWindow) {
        getTrendingMovies(timeWindow).then(data => setTrendingMovies(data));
    }

    useEffect(() => {
        updateTrending(timeWindows[0].value)
    }, [])

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <section className="trending light-bg">
            <div className="wrapper">
                <hgroup className="separator">
                    <h1>Want some options right away?</h1>
                    <p>Check out what movies are trending at the moment!</p>
                </hgroup>
                <Tabs categories={timeWindows}
                      onSelectCategory={(timeWindow) => updateTrending(timeWindow)}></Tabs>
                <div className="movie-grid">
                    {trendingMovies.slice(0, maxMovies).map((movie) => (
                        <TrendingMovie movie={movie} key={movie.id}></TrendingMovie>))}
                </div>
            </div>
        </section>
    )
}