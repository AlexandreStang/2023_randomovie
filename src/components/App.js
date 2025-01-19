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

    const [movieID, setMovieID] = useState("");
    const [movieAttributes, setMovieAttributes] = useState();

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