import React, { Component } from 'react'
import axios from 'axios'
import faker from 'faker'
import { connect } from "react-redux"
import Nav from './Nav'
import Body from './Body'
import store, { getMovies, createMovie } from './store'

class App extends Component {
    constructor() {
        super()
        this.state = store.getState()
    }

    async componentDidMount() {
        this.setState({ initialState: 'There are no movies!' });
        store.dispatch(getMovies()); // THIS IS FOR WHEN YOU REFRESH TO KEEP MOVIES ON PAGE
      }
    
    // deletelouisMovie = async(id) => { 
    //     console.log(id)
    //     await axios.delete(`delete/${id}`)
    //     this.setState({
    //             louisMovie: this.state.louisMovie.filter(movie => {
    //        return movie.id !== id
    //     }
    //     )})
    // }
    
    render() {

        const { movies } = this.props.movieStore
        const { randoMovie } = this.props
        const { initialState } = this.state
        
        return (
            <div>
                <Nav movies={movies}/>

                <button className="create" onClick={randoMovie}>Create Random Movie</button>
                <h1>Movie List</h1>
                <h2>Number Of Movies ({movies.length})</h2>
                {movies.length === 0 ? (<h1>{initialState}</h1>)
                : (      
                <Body/>
                )}
    
            </div>
        )
    }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        randoMovie: () => {
            const name = faker.company.catchPhrase()
            console.log(name)
            dispatch(createMovie(name))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);