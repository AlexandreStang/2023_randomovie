import Tabs from "../Tabs";
import TrendingMovie from "../TrendingMovie";
import React, {useEffect, useState} from "react";

export default function Trending() {

    const timeWindows = [
        {value: global.config.API.TIME_WINDOW.DAY, label: "Today"},
        {value: global.config.API.TIME_WINDOW.WEEK, label: "This week"}
    ]

    const [trendingMovies, setTrendingMovies] = useState([]);

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
                    {trendingMovies.slice(0, 12).map((movie) => (
                        <TrendingMovie movie={movie}></TrendingMovie>))}
                </div>
            </div>
        </section>
    )
}