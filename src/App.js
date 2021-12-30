import React, { Component } from 'react'
import axios from 'axios'
import { connect } from "react-redux"
import { createMovie, deleteMovie } from './store'

class App extends Component {
    constructor() {
        super()
        // this.state = {
        //     louisMovie: []
        // }
    }

    // async componentDidMount() {
    //     const myMovie = (await axios.get('/movies')).data
    //     this.setState({
    //         louisMovie: myMovie
    //     })
    // }
    
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
        // const { louisMovie } = this.state
        const { movies } = this.props.movieStore
        const { randoMovie, byeMovie } = this.props
        console.log("these are moviessss", movies)
        console.log("HIIIIIII random movie", this.props.randoMovie)
        
        return (
            <div>
                <h1>Create a Movie!  {movies.length}</h1>
                <div>
                {movies.map(movie => {
                    return (
                        <h3 key={movie.data.id}>{movie.data.name}
                        <button onClick={()=> byeMovie(movie.data.id)}>X</button>
                        </h3>  
                    )
                })}</div>    
                <button onClick={randoMovie}>Create Random Movie</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        randoMovie: () => {
            dispatch(createMovie())
        },
        byeMovie: (id) => {
            dispatch(deleteMovie(id))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);