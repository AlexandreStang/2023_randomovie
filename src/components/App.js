import React, {useEffect, useState} from 'react';
import { useMediaQuery } from 'react-responsive';
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
    // min_release_year: "&primary_release_date.gte=",
    max_release_year: "&primary_release_date.lte=",
    min_score: "&vote_average.gte=",
    country: "&watch_region=",
    provider_id: "&with_watch_providers="
}

export default function App() {

    // VARIABLES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [movieID, setMovieID] = useState("");
    const [queryURL, setQueryURL] = useState(defaultQueryURL);
    const [canTryAgain, setCanTryAgain] = useState(false);

    const [scrollPosition, setScrollPosition] = useState(window.scrollY)
    const isSmallScreen = useMediaQuery({query: '(max-width: 900px) or (max-height: 750px)' })

    // GETTERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getRandomPage = async (url) => {
        const response = await fetch(url + "&page=1");
        const data = await response.json();

        return Math.floor(Math.random() * (Math.min(data.total_pages, global.config.API.MAX_PAGES))) + 1;
    }

    const getRandomMovieID = async (url) => {
        const pageNumber = await getRandomPage(url);

        const response = await fetch(url + "&page=" + pageNumber);
        const data = await response.json();

        // console.log(data)

        if (!data.results.length) {
            alert("Sorry! We could not find any movies with your chosen attributes!");
            return null
        } else {
            return data.results[Math.floor(Math.random() * data.results.length)].id;
        }

    }

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        if (movieID !== "" && !isSmallScreen) {
            document.body.classList.add("no-scroll")
        } else {
            document.body.classList.remove("no-scroll")
        }
        // Cleanup on unmount and dependency change
        // Ensure side effects from **previous** execution are undone
        return () => document.body.classList.remove("no-scroll");
    }, [movieID, isSmallScreen]);

    function handleSubmit(formData) {
        let url = defaultQueryURL

        // CHANGE QUERY URL
        Object.keys(formData).forEach(key => {
            if (formData[key]) {
                url += queryParameters[key] + formData[key]
            }
        })

        setQueryURL(url);
        searchRandomMovie(url);
    }

    function searchRandomMovie(url) {
        getRandomMovieID(url).then((randomMovieID) => {
            if (randomMovieID !== null) {
                openPopup(randomMovieID, true)
            }
        })
    }

    function openPopup(id, canTryAgain) {
        saveScrollPosition();
        setMovieID(id);
        setCanTryAgain(canTryAgain);
    }

    function closePopup() {
        setMovieID("");
        restoreScrollPosition(scrollPosition);
    }

    function saveScrollPosition() {
        setScrollPosition(window.scrollY);
    }

    function restoreScrollPosition(position) {
        const scrollRestoration = setInterval(() => {
            window.scrollTo({top: position, behavior: "instant"})

            if (window.scrollY === position) {
                clearInterval(scrollRestoration)
            }

        }, 10)

        setTimeout(() => {clearInterval(scrollRestoration)}, 100);
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (

        <>
            {movieID !== "" ? <PopUp
                movieID={movieID}
                onClosePopup={closePopup}
                canTryAgain={canTryAgain}
                onTryAgain={() => searchRandomMovie(queryURL)}
                isSmallScreen={isSmallScreen}
            /> : ""}

            {movieID === "" || (!isSmallScreen && movieID !== "") ?
                <>
                    <Hero onSubmit={(formData) => handleSubmit(formData)}></Hero>

                    <Trending onSelectMovie={(id) => openPopup(id, false)}></Trending>

                    <Footer></Footer>
                </> : null}
        </>

    );

}