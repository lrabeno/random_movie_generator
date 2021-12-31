import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger";

const initalState = {
    movies: []
}

const ADD_MOVIE = "ADD_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"
const ADD_STAR = "ADD_STAR"


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
      await axios.put(`/movies/${movie.id}`,  movie )
        dispatch({
            type: ADD_STAR,
            movie: movie,
            id: movie.id
        })        
    }
}


const movieStore = ((state = initalState, action) => {
    if (action.type === ADD_MOVIE) {
        return {...state, movies: [...state.movies, action.movie]}
    }
    if (action.type === DELETE_MOVIE) {
        return {...state, movies: [...state.movies.filter(movie => {
            return movie.id !== action.id
        })]}
    }
    if (action.type === ADD_STAR) {
        return {...state, ...state.movies.map((movie)=> {
            if (movie.id === action.id) {
                movie.stars++
                return movie
            }
            else {
                return movie
            }
        })
        }
    }
    return state
})

const reducer = combineReducers({
    movieStore
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store