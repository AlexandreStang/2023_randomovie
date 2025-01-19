import React, {useState} from 'react';
import '../css/styles.css';
import '../config.js';
import Hero from "./section/Hero";
import Trending from "./section/Trending";
import Footer from "./section/Footer";
import PopUp from "./section/PopUp";



// POPUP
const maxCrew = 6;


export default function App() {

    //const [active, setActive] = useState("");

    const [movieAttributes, setMovieAttributes] = useState();

    const [movieDetails, setMovieDetails] = useState([]);
    const [movieCredits, setMovieCredits] = useState([]);
    const [movieReleaseDates, setMovieReleaseDates] = useState([]);

    // OTHER METHODS
    function calculateRuntime(time) {
        const minutes = time % 60;

        if (time < 60) {
            return (minutes + "m");
        }

        var hours = Math.floor(time / 60);

        return (hours + "h " + minutes + "m");
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

    const getMovieReleaseDates = async (movieID) => {
        const response = await fetch(global.config.API.URL + "movie/" + movieID + "/release_dates" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE)
        const data = await response.json();

        let regionIndex = 0;

        for (let i = 0; i < data.results.length + 1; i++) {
            if (data.results[i].iso_3166_1 === global.config.REGION) {
                regionIndex = i;
                break;
            }
        }

        return data.results[regionIndex].release_dates;
    }

    // const getRandomPage = async () => {
    //     let response = await fetch(global.config.API.URL + "discover/movie" + global.config.API.KEY +
    //         "&language=" + global.config.LANGUAGE + "&region=" + global.config.REGION +
    //         "&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&" + formReleaseYear +
    //         "&vote_average.gte=" + formMinScore / 10 + "&with_genres=" + formGenre + "&with_watch_providers=" + formWatchProvider +
    //         global.config.REGION + "&with_watch_monetization_types=flatrate");
    //     const data = await response.json();
    //
    //     return Math.floor(Math.random() * (data.total_pages)) + 1;
    // }


    // const getRandomMovieID = async () => {
    //     const pageNumber = await getRandomPage();
    //
    //     const response = await fetch(global.config.API.URL + "discover/movie" + global.config.API.KEY +
    //         "&language=" + global.config.LANGUAGE + "&region=" + global.config.REGION +
    //         "&sort_by=popularity.desc&include_adult=false&include_video=false&page=" + pageNumber + "&" + formReleaseYear +
    //         "&vote_average.gte=" + formMinScore / 10 + "&with_genres=" + formGenre + "&with_watch_providers=" + formWatchProvider +
    //         global.config.REGION + "&with_watch_monetization_types=flatrate");
    //     const data = await response.json();
    //
    //     // TODO: DEBUG CONSOLE
    //     // console.log(formGenre);
    //     // console.log(formReleaseYear);
    //     // console.log(formWatchProvider);
    //     // console.log(formMinScore);
    //
    //     //console.log(data.results);
    //     return data.results[Math.floor(Math.random() * data.results.length)].id;
    // }

    function handleSubmit(formData) {
        setMovieAttributes(formData)

        // getRandomMovieID().then(id => {
        //     getMovieDetails(id).then(data => setMovieDetails(data));
        //     getMovieCredits(id).then(data => setMovieCredits(data));
        //     getMovieReleaseDates(id).then(data => setMovieReleaseDates(data))
        // })

    }

    // function closePopup() {
    //     setMovieDetails([]);
    // }


    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (

        <div>
            {movieDetails?.length !== 0 ? <PopUp movie={movieDetails}/> : ""}

            <Hero onSubmit={(formData) => handleSubmit(formData)}></Hero>

            <Trending></Trending>

            <Footer></Footer>
        </div>

    );

}