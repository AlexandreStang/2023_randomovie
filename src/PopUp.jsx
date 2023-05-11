import React from 'react';

const PopUp = ({ movie }) => {

    function closePopup() {
        //
    }

    function reloadPopup() {

    }

    return (
        <div className="popup-container" id="popup-container">
            <div className="popup light-bg">
                <header>
                    <a href="#" onClick={reloadPopup}>Not what you’re looking for? Click here for another random movie!</a>
                <a href="#" onClick={closePopup} className="right-side-icon"><i className="fas fa-times icon"></i></a>
            </header>
            <div className="flex-container">
                <aside>
                    <div className="separator"><img src="img/posters/spider-man.jpg" alt="Avatar Poster" className="poster"></img></div>
                    <h4 className="separator">Available for streaming on Netflix</h4>
                    <h4 className="separator"><a href=""><i className="fas fa-link left-side-icon"></i> Watch Trailer</a></h4>
                </aside>
                <div className="popup-text">
                    <hgroup className="green-separator">
                        <h1>{movie.title}</h1>
                        <p>{movie.release_date.split('-')[0]} • PG-13 • Action, Adventure, Science Fiction
                            • 2h 28m</p>
                    </hgroup>
                    <div className="separator">
                        <div className="tagline-score">
                            <h4>The Multiverse unleashed.</h4>
                            <h4>User Score: <span className="green-txt" id="popup-score">84%</span></h4>
                        </div>
                        <p>
                            Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of
                            being a
                            super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous,
                            forcing him
                            to discover what it truly means to be Spider-Man.
                        </p>
                    </div>
                    <div className="people">
                        <ul>
                            <li><h4>Director</h4></li>
                            <li>Jon Watts</li>
                        </ul>
                        <ul>
                            <li><h4>Characters</h4></li>
                            <li>Stan Lee</li>
                        </ul>
                        <ul>
                            <li><h4>Characters</h4></li>
                            <li>Steve Ditko</li>
                        </ul>
                        <ul>
                            <li><h4>Writer</h4></li>
                            <li>Chris McKenna</li>
                        </ul>
                        <ul>
                            <li><h4>Writer</h4></li>
                            <li>Erik Sommers</li>
                        </ul>
                        <ul className="casting">
                            <li><h4>Top Casting</h4></li>
                            <li>Tom Holland</li>
                            <li>Zendaya</li>
                            <li>Benedict Cumberbatch</li>
                            <li>Jacob Batalon</li>
                            <li>Jon Favreau</li>
                            <li>Jamie Foxx</li>
                        </ul>
                    </div>
                </div>
            </div>

            </div>
        <div className="popup-bg-overlay"></div>
    </div>
    )

}

export default PopUp;