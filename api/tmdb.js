import axios from "axios";
import { apiKey } from "../constants";

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`;

// endpoints with dynamic params

// movie
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id  => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;

// person
const personDetailsEndpoint = person_id => `${apiBaseUrl}/person/${person_id}?api_key=${apiKey}`;
const personMoviesEndpoint = person_id => `${apiBaseUrl}/person/${person_id}/movie_credits?api_key=${apiKey}`;

// functions to get images of different widths, (show images using these to improve the loading times)
export const image500 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500' + posterPath : null;
export const image342 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342' + posterPath : null;
export const image185 = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185' + posterPath : null;

// fallback images 
export const fallbackMoviePoster = require("../assets/images/fallbackMoviePoster.jpg");
export const fallbackPersonImage = require("../assets/images/fallbackPersonImage.jpg");

// API CALL Method 
const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.log('error: ', error);
        return {};
    }
}

// home screen apis
export const fetchTrending = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchWatchlist = () => {
    return apiCall(upcomingMoviesEndpoint);
}
export const fetchTopRated = () => {
    return apiCall(topRatedMoviesEndpoint);
}
export const fetchUpcoming = () => {
    return apiCall(upcomingMoviesEndpoint);
}

// film screen apis
export const fetchFilmDetails = (FilmId) => {
    return apiCall(movieDetailsEndpoint(FilmId));
}
export const fetchCast = (FilmId) => {
    return apiCall(movieCreditsEndpoint(FilmId));
}
export const fetchSimilarMovies = (FilmId) => {
    return apiCall(similarMoviesEndpoint(FilmId));
}

// person screen apis
export const fetchPersonDetails = (personId) => {
    console.log('personId: ', personId);
    return apiCall(personDetailsEndpoint(personId));
}
export const fetchPersonFilms = (personId) => {
    return apiCall(personMoviesEndpoint(personId));
}

// search screen apis
export const searchFilms = (params) => {
    return apiCall(searchMoviesEndpoint, params);
}


