import axios from "axios";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk"
import logger from "redux-logger";

const initalState = {
    movies: []
}

const ADD_MOVIE = "ADD_MOVIE"
const DELETE_MOVIE = "DELETE_MOVIE"


export const createMovie = () => {
    return async(dispatch) => {
        const movie = await axios.post('/movies')
        dispatch({
            type: ADD_MOVIE,
            movie: movie
        })
    }
}

export const deleteMovie = (id) => {
    return async(dispatch) => {
        const movie = await (await axios.delete(`/delete/${id}`)).data
        dispatch({
            type: DELETE_MOVIE,
            movie: movie,
            id: id
        })
    }
}


const movieStore = ((state = initalState, action) => {
    if (action.type === ADD_MOVIE) {
        return {...state, movies: [...state.movies, action.movie]}
    }
    if (action.type === DELETE_MOVIE) {
        return {...state, movies: [...state.movies.filter(movie => {
            return movie.data.id !== action.id
        })]}
    }
    return state
})

const reducer = combineReducers({
    movieStore
})


const store = createStore(reducer, applyMiddleware(thunk, logger))

export default store