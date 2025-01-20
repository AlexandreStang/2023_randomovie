import React from "react";

export default function TrendingMovie({movie, onClickMovie}) {

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