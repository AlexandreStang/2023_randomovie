import React from "react";

export default function TrendingMovie({movie}) {
    return (
        <div className="movie-item">
            <a href="#" className="poster-link">
                <img
                    src={global.config.API.IMAGE_URL +
                        global.config.API.IMAGE_WIDTH.SMALL_POSTER +
                        movie.poster_path}
                    alt={movie.title + "Poster"}
                    className="poster"></img>
                <div className="poster-overlay"></div>
            </a>
            <a href="#"><h4>{movie.title} <span
                className="year">({movie.release_date.split('-')[0]})</span></h4></a>
        </div>
    )
}