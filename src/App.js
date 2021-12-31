import React, { Component } from 'react'
import axios from 'axios'
import faker from 'faker'
import { connect } from "react-redux"
import { createMovie, deleteMovie, addStar } from './store'

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

        const { movies } = this.props.movieStore
        const { randoMovie, byeMovie, addAStar } = this.props
        console.log("these are moviessss", this.props)

        
        return (
            <div>
                <h1>Create a Movie!  {movies.length}</h1>
                <div>
                {movies.map(movie => {
                    return (
                        <div key={movie.id}>
                        <h3 >
                            {movie.name} 
                        
                        <button onClick={()=> byeMovie(movie.id)}>X</button>
                        
                        </h3> 
                        <h4>rating: {movie.stars}</h4> 
                        <button onClick={()=> addAStar(movie)}>+</button>
                         </div>
                    )
                })}</div>    
                <button onClick={randoMovie}>Create Random Movie</button>
                <div>

                </div>
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
        },
        byeMovie: (id) => {
            dispatch(deleteMovie(id))
        },
        addAStar: (movie) => {
            dispatch(addStar(movie))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);