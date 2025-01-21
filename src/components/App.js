import React, {useEffect, useState} from 'react';
import '../css/styles.css';
import '../config.js';
import Hero from "./section/Hero";
import Trending from "./section/Trending";
import Footer from "./section/Footer";
import PopUp from "./section/PopUp";

const defaultQueryURL = global.config.API.URL + "discover/movie" + global.config.API.KEY + "&language=" + global.config.LANGUAGE

const queryParameters = {
    language: "&with_original_language=",
    genre_id: "&with_genres=",
    min_release_year: "&primary_release_date.gte=",
    min_score: "&vote_average.gte=",
    country: "&watch_region=",
    provider_id: "&with_watch_providers="
}

export default function App() {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [movieID, setMovieID] = useState("");
    const [queryURL, setQueryURL] = useState(defaultQueryURL);

    // GETTERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getRandomPage = async () => {
        const response = await fetch(queryURL + "&page=1");
        const data = await response.json();

        return Math.floor(Math.random() * (Math.min(data.total_pages, 500))) + 1;
    }

    const getRandomMovieID = async () => {
        const pageNumber = await getRandomPage();

        const response = await fetch(queryURL + "&page=" + pageNumber);
        const data = await response.json();

        console.log(data)

        return data.results[Math.floor(Math.random() * data.results.length)].id;
    }

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        if (movieID !== "") {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
        // Cleanup on unmount and dependency change
        // Ensure side effects from **previous** execution are undone
        return () => document.body.classList.remove("no-scroll");
    }, [movieID]);

    function handleSubmit(formData) {
        console.log(formData)


        // CHANGE QUERY URL


        getRandomMovieID().then((randomMovieID) => setMovieID(randomMovieID))
    }

    function closePopup() {
        setMovieID("")
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (

        <div>
            {movieID !== "" ? <PopUp
                movieID={movieID}
                onClosePopup={closePopup}
            /> : ""}

            <Hero onSubmit={(formData) => handleSubmit(formData)}></Hero>

            <Trending onSelectMovie={(movieID) => setMovieID(movieID)}></Trending>

            <Footer></Footer>
        </div>

    );

}