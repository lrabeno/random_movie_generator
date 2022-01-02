import React from "react";

const Nav = ({movies}) => {
    return (
    <div>
    <nav>
    <h1>Average Rating({movies.length === 0 ? 0 :
        Math.round(
            movies
            .map((movie)=> movie.stars)
            .reduce((accum, currVal)=> accum + currVal, 0) /
            movies.length)
        })</h1>
        </nav>
        </div>
    )}

export default Nav