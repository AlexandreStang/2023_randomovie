import React, {useEffect, useState} from "react";

export default function Banner() {

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