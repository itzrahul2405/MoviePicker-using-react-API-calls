import React from 'react'

import classes from './Movie.module.css'


const Movie = (props) => {
    const deleteHandler = (ID) => {
        props.deleteMovie(ID)
    }

    return (
        <li className={classes.movie} key={props.id}>
            <h2>{props.title}</h2>
            <h3>{props.releaseDate}</h3>
            <p>{props.openingText}</p>
            <button onClick={() => deleteHandler(props.id)}>DELETE</button>
        </li>
    );
};


export default Movie;