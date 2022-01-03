import React from "react";
import { connect } from "react-redux";
import { deleteMovie, addStar, removeStar } from './store'

const Body = (props) => {
    const { movies } = props.movieStore
    const { byeMovie, addAStar, byeStar } = props
    
    return (
        <div>    
            {
            movies
                .sort((a,b) => b.stars - a.stars)
                .map(movie => {
                console.log('movie id from body', movie.id)
                return (
                    <div className="movie-div" key={movie.id}>
                     <h3 className="movie">
                        {movie.name} 
                        <button className="remove" onClick={()=> byeMovie(movie.id)}>Delete Movie</button>
                        </h3> 
                        <div className="rating">
                            <h4>Star Rating: {movie.stars}</h4> 
                            <button className="plus" onClick={()=> addAStar({stars: movie.stars + 1, id: movie.id})}
                            disabled={movie.rating === 5 ? true : false}
                            >Add Star</button>
                            <button className="minus" onClick={()=> byeStar({stars: movie.stars - 1, id: movie.id})} 
                            disabled={movie.rating === 1 ? true : false}
                            >Remove Star</button>
                        </div>
                        </div>
                    )
            })}
        </div>    
   )
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
    return {
        byeMovie: (id) => {
            dispatch(deleteMovie(id))
        },
        addAStar: (movie) => {
            dispatch(addStar(movie))
        },
        byeStar: (movie) => {
            dispatch(removeStar(movie))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Body);

