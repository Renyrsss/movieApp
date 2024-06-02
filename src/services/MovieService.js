const axios = require("axios").default
import {TMDB_API_KEY ,TMDB_BASE_URL , TMDB_IMAGE_BASE_URL , ENDPOINTS,YOUTUBE_BASE_URL} from "../constants/Urls"
import Language from "../constants/Languages"

const TMDB_HTTP_REQUEST = axios.create({
      baseURL:TMDB_BASE_URL,
      params : {
            api_key : TMDB_API_KEY,
      },
});

const getNowPlayingMovies = () => 
      TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

const getUpComingMovies = () => 
      TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);


const getMovieById = (movieId , append_to_response = "") => 
      TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}` , append_to_response ? {params : {append_to_response}}: null);

const getRec = (movieId) => 
      TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}/recommendations`);

const getSim = (movieId) => 
      TMDB_HTTP_REQUEST.get(`${ENDPOINTS.MOVIE}/${movieId}/similar`);

const searchMovie = async (search) => {
      const url = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`;
      let movies = {}
      const options = {
      method: 'GET',
      headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMmMzYmQ2YzBlOTkzMGJhODZlYjEyMGNhNzZhNGEzYiIsInN1YiI6IjY2MjlmNWM0MjNkMjc4MDExZDMzM2E3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._-ikcO8nObaGJi-4l3zrFgeI8VfhtGo5nTFSyrMqupQ'
      }
      };
      await fetch(url, options)
            .then(res => res.json())
            .then(json => movies = json.results)
            .catch(err => console.error('error:' + err));

      return movies
}
      


const getAllGenres = () => 
      TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);





const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;
const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getLanguage = (language_iso) => Language.find(language => language.iso_639_1 === language_iso);




export {getNowPlayingMovies ,searchMovie,getUpComingMovies,getSim,getMovieById,getRec,getAllGenres, getPoster , getLanguage , getVideo}