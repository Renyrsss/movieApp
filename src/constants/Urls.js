const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL = "https://youtube.com/watch"

const TMDB_API_KEY = "32c3bd6c0e9930ba86eb120ca76a4a3b";

const ENDPOINTS = {
      NOW_PLAYING_MOVIES : "/movie/now_playing",
      UPCOMING_MOVIES : "/movie/upcoming",
      GENRES : "/genre/movie/list",
      MOVIE : "/movie"
};
const APPEND_TO_RESPONSE = {
      VIDEO : "videos",
      CREDITS : "credits",
}
export {TMDB_BASE_URL , TMDB_API_KEY , TMDB_IMAGE_BASE_URL , ENDPOINTS , APPEND_TO_RESPONSE,YOUTUBE_BASE_URL}