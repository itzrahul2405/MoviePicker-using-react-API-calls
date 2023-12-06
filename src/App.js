import './App.css';
import React, { useState } from 'react'
import MoviesList from './components/MoviesList';




function App() {

  const [movies, setMovies] = useState([])

  // const fetchMoviesHandler = () => {
  //   fetch('https://swapi.dev/api/films')
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date
  //       }
  //     })

  //     setMovies( transformedMovies)
  //   })

  // }


  const fetchMoviesHandler = async () => {
    try{
      const response = await fetch('https://swapi.dev/api/films')
      const data = await response.json()
      
      const transformedMovies = data.results.map(movieData => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.release_date
          }
        })
  
        setMovies( transformedMovies)
    }
    catch(error){
      console.log('Error fetching movies:', error)
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} className='btn'>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies}/>
      </section>
    </React.Fragment>
  );
}

export default App;
