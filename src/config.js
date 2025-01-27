module.exports = global.config = {
    API: {
        URL : "https://api.themoviedb.org/3/",
        KEY : "?api_key=f4f9e1b6b219580330ca8cc48f5b1165",
        IMAGE_URL : "https://image.tmdb.org/t/p/",
        IMAGE_WIDTH : {
            SMALL_POSTER: "w300",
            MEDIUM_POSTER: "w500",
            BANNER: "w1280"
        },
        TIME_WINDOW : {
            DAY: "day",
            WEEK: "week"
        }
        ,
        MAX_PAGES: 500
    },
    LANGUAGE : "en-US",
    REGION : 'US',
};
