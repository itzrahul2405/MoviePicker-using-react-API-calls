import Movie from "./Movie";
import  classes from "./MoviesList.module.css";

const MoviesList = (props) => {
  return (
    <>
      <ul className={classes.moviesList}>
        {props.movies.map((movie) => (
          <Movie id={movie.id} title={movie.title} releaseDate={movie.releaseDate} openingText={movie.openingText} deleteMovie={props.deleteMovie}/>
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
