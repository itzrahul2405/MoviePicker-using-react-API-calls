import Movie from "./Movie";
import  classes from "./MoviesList.module.css";

const MoviesList = (props) => {
  return (
    <>
      <ul className={classes.moviesList}>
        {props.movies.map((movie) => (
          <Movie title={movie.title} releaseDate={movie.releaseDate} openingText={movie.openingText}/>
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
