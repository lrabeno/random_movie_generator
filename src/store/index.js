import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger";

const initalState = {
    movies: []
}

const GET_MOVIES = 'GET_MOVIES'
const ADD_MOVIE = "ADD_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"
const ADD_STAR = "ADD_STAR"
const REMOVE_STAR = "REMOVE_STAR"


export const getMovies = () => {
    return async (dispatch) => {
      const movies = (await axios.get('/movies')).data;
      dispatch({
          type: GET_MOVIES,
          movies: movies
      });
    };
  };
  

export const createMovie = (name) => {
    return async(dispatch) => {
        const movie = (await axios.post('/movies', {name})).data
        dispatch({
            type: ADD_MOVIE,
            movie: movie
        })
    }
}

export const deleteMovie = (id) => {
    return async(dispatch) => {
        const movie = await (await axios.delete(`/movies/${id}`)).data
        dispatch({
            type: DELETE_MOVIE,
            movie: movie,
            id: id
        })
    }
}

export const addStar = (movie) => {
    return async(dispatch) => {
      await axios.put(`/movies/${movie.id}`, {stars: movie.stars, id: movie.id})
        dispatch({
            type: ADD_STAR,
            movie: movie.id,
            stars: movie.stars,
            id: movie.id
        })        
    }
}

export const removeStar = (movie) => {
    return async(dispatch) => {
       await axios.put(`/movies/${movie.id}`,{stars: movie.stars , id: movie.id})
      dispatch({
          type: REMOVE_STAR,
          movie: movie.id,
          stars: movie.stars,
          id: movie.id
      })
    }
} 


const movieStore = ((state = initalState, action) => {
    if (action.type === GET_MOVIES) {
        return {movies: action.movies}
    }
    if (action.type === ADD_MOVIE) {
        return {...state, movies: [...state.movies, action.movie]}
    }
    if (action.type === DELETE_MOVIE) {
        return {...state, movies: [...state.movies.filter(movie => {
            return movie.id !== action.id
        })]}
    }
    if (action.type === ADD_STAR) {
        return {...state, movies: [...state.movies.map((movie)=> {
            if (movie.id === action.id) {
                movie.stars++
                return movie
            }
            else {
                return movie
            }
        })
        ]}
    }
    if (action.type === REMOVE_STAR) {
        return {...state, movies: [...state.movies.map((movie)=> {
            if (movie.id === action.id) {
                movie.stars--
                return movie
            }
            else {
                return movie
            }
        })
        ]}
    }
    return state
})

const reducer = combineReducers({
    movieStore
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store