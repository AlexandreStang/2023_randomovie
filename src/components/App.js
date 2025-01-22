import React, {useEffect, useState} from 'react';
import '../css/styles.css';
import '../config.js';
import Hero from "./section/Hero";
import Trending from "./section/Trending";
import Footer from "./section/Footer";
import PopUp from "./section/PopUp";

const defaultQueryURL = global.config.API.URL + "discover/movie" + global.config.API.KEY +
    "&language=" + global.config.LANGUAGE +
    "&vote_count.gte=" + 50

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
    const [canTryAgain, setCanTryAgain] = useState(false);

    // GETTERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getRandomPage = async (url) => {
        const response = await fetch(url + "&page=1");
        const data = await response.json();

        return Math.floor(Math.random() * (Math.min(data.total_pages, 500))) + 1;
    }

    const getRandomMovieID = async (url) => {
        const pageNumber = await getRandomPage(url);

        const response = await fetch(url + "&page=" + pageNumber);
        const data = await response.json();

        console.log(data)

        if (!data.results.length) {
            alert("Sorry! We could not find any movies with your chosen attributes!");
            return null
        } else {
            return data.results[Math.floor(Math.random() * data.results.length)].id;
        }

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
        const formDataCopy = { ...formData };
        formDataCopy.min_score /= 10;

        let url = defaultQueryURL

        // CHANGE QUERY URL
        Object.keys(formDataCopy).forEach(key => {
            if (formDataCopy[key]) {
                url += queryParameters[key] + formDataCopy[key]
            }
        })

        setQueryURL(url);
        setCanTryAgain(true);
        findRandomMovie(url);
    }

    function handleSelect(id) {
        setMovieID(id)
        setCanTryAgain(false)
    }

    function closePopup() {
        setMovieID("")
    }

    function findRandomMovie(url) {
        getRandomMovieID(url).then((randomMovieID) => {
            if (randomMovieID !== null) {
                setMovieID(randomMovieID);
            }
        })
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (

        <div>
            {movieID !== "" ? <PopUp
                movieID={movieID}
                onClosePopup={closePopup}
                canTryAgain={canTryAgain}
                onTryAgain={() => findRandomMovie(queryURL)}
            /> : ""}

            <Hero onSubmit={(formData) => handleSubmit(formData)}></Hero>

            <Trending onSelectMovie={(id) => handleSelect(id)}></Trending>

            <Footer></Footer>
        </div>

    );

}