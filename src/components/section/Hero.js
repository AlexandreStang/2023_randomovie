import Logo from "../../img/logo/randomovie.svg";
import React, {useEffect, useState} from "react";
import Banner from "../Banner";

const minYear = 1920;
const maxProviders = 10;
const defaultScore = 50;

export default function Hero(OnSubmit) {

    // STATES - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    const [languages, setLanguages] = useState([])
    const [genres, setGenres] = useState([]);
    const [countries, setCountries] = useState([])
    const [providers, setProviders] = useState([]);
    const [formData, setFormData] = useState({
        lang: global.config.LANGUAGE,
        genre_id: 28,
        min_release_year: minYear,
        region: global.config.REGION,
        watch_provider_id: 8,
        min_score: defaultScore
    });

    // FUNCTIONS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    const getLanguages = async () => {
        const response = await fetch(global.config.API.URL + "configuration/languages" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE);
        const data = await response.json();

        const filtered_data = data.filter((lang) => lang.name !== "")
        const sorted_data = filtered_data.sort((lang_a, lang_b) => lang_a.english_name.localeCompare(lang_b.english_name))

        return sorted_data;
    }

    const getGenres = async () => {
        const response = await fetch(global.config.API.URL + "genre/movie/list" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE);
        const data = await response.json();

        return data.genres;
    }

    const getCountries = async () => {
        const response = await fetch(global.config.API.URL + "watch/providers/regions" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE);
        const data = await response.json();
        console.log(data)

        return data.results;
    }

    const getProviders = async () => {
        const response = await fetch(global.config.API.URL + "watch/providers/movie" + global.config.API.KEY +
            "&language=" + global.config.LANGUAGE + "&watch_region=" + global.config.REGION);
        const data = await response.json();

        return data.results;
    }

    useEffect(() => {
        getLanguages().then(data => setLanguages(data));
        getGenres().then(data => setGenres(data));
        getCountries().then(data => setCountries(data));
        getProviders().then(data => setProviders(data));
    }, [])

    function handleSubmit() {
        console.log(formData)
        OnSubmit(formData)
    }

    // RETURN - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    return (
        <section className="hero dark-bg">
            <div className="wrapper">
                <header>
                    <a className="logo" href="#"><img src={Logo} alt="Randomovie Logo"/></a>
                </header>

                <div className="welcome">
                    <hgroup className="separator">
                        <h1>Looking for new cinematic experiences?</h1>
                        <p>Tell us what you're looking for and receive something at random!</p>
                    </hgroup>

                    <form id="random-movie-form">

                        <div className="form-grid">
                            <div className="form-item">
                                <label htmlFor="streaming-select">Language</label>
                                <div className="select-container">
                                    <select name="streaming" id="language-select" value={formData.lang}
                                            onChange={(e) =>
                                                setFormData({...formData, lang: e.target.value})}>
                                        {languages.map((language) => (<option
                                            value={language.iso_3166_1}>{language.english_name}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-item">
                                <label htmlFor="genre-select">Genre</label>
                                <div className="select-container">
                                    <select name="genre" id="genre-select" value={formData.genre_id}
                                            onChange={(e) =>
                                                setFormData({...formData, genre: e.target.value})}>
                                        {genres.map((genre) => (<option value={genre.id}>{genre.name}</option>))}
                                    </select>
                                </div>
                            </div>

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
                                <label htmlFor="streaming-select">Your country</label>
                                <div className="select-container">
                                    <select name="streaming" id="streaming-select" value={formData.watch_provider_id}
                                            onChange={(e) =>
                                                setFormData({...formData, watch_provider: e.target.value})}>
                                        {countries.map((country) => (<option
                                            value={country.iso_3166_1}>{country.english_name}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-item">
                                <label htmlFor="streaming-select">Watch Provider</label>
                                <div className="select-container">
                                    <select name="streaming" id="streaming-select" value={formData.watch_provider_id}
                                            onChange={(e) =>
                                                setFormData({...formData, watch_provider: e.target.value})}>
                                        {providers.slice(0, maxProviders).map((provider) => (<option
                                            value={provider.provider_id}>{provider.provider_name}</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-item">
                                <div className="range-label"><label htmlFor="min-score-input">Min. User
                                    Score</label><span
                                    className={"min-score-percentage " + (formData.min_score > 69 ? "green-txt" :
                                        (formData.min_score > 39 ? "yellow-txt" : "red-txt"))}
                                    id="min-score-percentage">{formData.min_score + "%"}</span></div>
                                <input type="range" min="0" max="100" step="1" placeholder={defaultScore}
                                       name="min-score"
                                       id="min-score-input"
                                       value={formData.min_score}
                                       onChange={(e) =>
                                           setFormData({...formData, min_score: e.target.value})}/>
                            </div>

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