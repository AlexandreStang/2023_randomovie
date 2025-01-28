import Logo from "../../img/logo/randomovie.svg";
import React, {useCallback, useEffect, useState} from "react";

import Select from "../form/Select";
import Score from "../Score";

const minYear = 1920;
const maxProviders = 10;
const defaultScore = 50;

export default function Hero({onSubmit}) {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [languages, setLanguages] = useState([])
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([])
    const [providers, setProviders] = useState([]);
    const [formData, setFormData] = useState({
        language: "",
        genre_id: "",
        min_release_year: minYear,
        min_score: defaultScore,
        country: "",
        provider_id: ""
    });

    // GETTERS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getLanguages = useCallback(async () => {
        const response = await fetch(
            global.config.API.URL + "configuration/languages" + global.config.API.KEY + "&language=" + global.config.LANGUAGE
        );
        const data = await response.json();
        return sortData(data.filter((lang) => lang.name !== ""), "english_name");
    }, []);

    const getGenres = useCallback(async () => {
        const response = await fetch(
            global.config.API.URL + "genre/movie/list" + global.config.API.KEY + "&language=" + global.config.LANGUAGE
        );
        const data = await response.json();
        return data.genres;
    }, []);

    const getCountries = useCallback(async () => {
        const response = await fetch(
            global.config.API.URL + "watch/providers/regions" + global.config.API.KEY + "&language=" + global.config.LANGUAGE
        );
        const data = await response.json();
        return sortData(data.results, "english_name");
    }, []);

    const getProviders = async (country) => {
        const response = await fetch(global.config.API.URL + "watch/providers/movie" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE + "&watch_region=" + country);
        const data = await response.json();

        return data.results;
    }

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    useEffect(() => {
        getLanguages().then(data => setLanguages(data));
        getGenres().then(data => setGenres(data));
        getCountries().then(data => setCountries(data));
    }, [getLanguages, getGenres, getCountries]);

    function sortData(data, value) {
        return data.sort((a, b) => a[value].localeCompare(b[value]))
    }

    const handleLanguageChange = useCallback((selectedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            language: selectedValue,
        }));
    }, []);

    const handleGenreChange = useCallback((selectedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            genre_id: selectedValue,
        }));
    }, []);

    const handleCountryChange = useCallback((selectedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            country: selectedValue,
        }));
        getProviders(selectedValue).then(data => setProviders(data));
    }, []);

    const handleProviderChange = useCallback((selectedValue) => {
        setFormData((prevData) => ({
            ...prevData,
            provider_id: selectedValue,
        }));
    }, []);

    function handleSubmit() {
        const formDataCopy = { ...formData };
        formDataCopy.min_release_year += "-01-01"
        formDataCopy.min_score /= 10;
        onSubmit(formDataCopy)
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <section className="hero dark-bg">
            <div className="wrapper">
                <header>
                    <img src={Logo} alt="Randomovie Logo"/>
                </header>

                <div className="welcome">
                    <hgroup className="separator">
                        <h1>Looking for new cinematic experiences?</h1>
                        <p>Tell us what you're looking for and receive something new to watch at random!</p>
                    </hgroup>

                    <form id="random-movie-form">

                        <div className="form-grid">

                            <Select
                                data={languages}
                                config={{title: "Language", value: "iso_639_1", name: "english_name"}}
                                onChangeOption={handleLanguageChange}>
                            </Select>

                            <Select
                                data={genres}
                                config={{title: "Genre", value: "id", name: "name"}}
                                onChangeOption={handleGenreChange}>
                            </Select>

                            <div className="form-item">
                                <label htmlFor="min-year-input">Min. Release Year</label>
                                <input type="number" min={minYear} max={new Date().getFullYear()}
                                       step="1" name="min-year"
                                       id="min-year-input"
                                       value={formData.min_release_year}
                                       onChange={(e) =>
                                           setFormData({...formData, min_release_year: e.target.value})}/>
                            </div>

                            <div className="form-item">
                                <div className="range-label"><label htmlFor="min-score-input">Min. User
                                    Score</label>
                                <Score percentage={formData.min_score}></Score>
                                </div>
                                <input type="range" min="0" max="100" step="1" placeholder={defaultScore}
                                       name="min-score"
                                       id="min-score-input"
                                       value={formData.min_score}
                                       onChange={(e) =>
                                           setFormData({...formData, min_score: e.target.value})}/>
                            </div>

                            <Select
                                data={countries}
                                config={{title: "Your country", value: "iso_3166_1", name: "english_name"}}
                                onChangeOption={handleCountryChange}>
                            </Select>

                            <Select
                                data={providers}
                                config={{title: "Watch Provider", value: "provider_id", name: "provider_name"}}
                                onChangeOption={handleProviderChange}
                                isDisabled={(formData.country) <= 0}
                                maxOptions={maxProviders}>
                            </Select>

                            {/*<div className="form-item checkbox-container">*/}
                            {/*    <input type="checkbox" name="popular" id="popular-input"/>*/}
                            {/*    <label htmlFor="popular-input">Find me something popular at the moment</label>*/}
                            {/*</div>*/}
                        </div>

                    </form>

                    <div className="button-container">
                        <button id="random-movie-submit" onClick={handleSubmit}>Search</button>
                    </div>

                </div>

            </div>

            <Banner></Banner>

        </section>
    )
}

function Banner() {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [bannerPath, setBannerPath] = useState([]);

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const getBanner = async () => {
        const response = await fetch(global.config.API.URL +
            "trending/movie/" +
            global.config.API.TIME_WINDOW.WEEK + global.config.API.KEY);
        const data = await response.json();

        const rand = Math.floor(Math.random() * data.results.length);

        return data.results[rand].backdrop_path;
    }

    useEffect(() => {
        getBanner().then(data => setBannerPath(data));
    }, [])

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <div>
            <img className="banner"
                 src={bannerPath.length > 0 ? (global.config.API.IMAGE_URL +
                     global.config.API.IMAGE_WIDTH.BANNER +
                     bannerPath) : ""}
                 alt="Banner"/>
            <div className="banner-overlay"></div>
        </div>
    )
}