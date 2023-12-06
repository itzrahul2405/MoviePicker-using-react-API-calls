import './App.css';
import React, { useState } from 'react'
import MoviesList from './components/MoviesList';




function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  
  
  const fetchMoviesHandler = async () => {
    try{

      setIsLoading(true)
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
        setIsLoading(false)
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
        {isLoading && <p className='loading-text'>Loading...</p>}
        {(!isLoading && movies.length===0) && <p className='loading-text'>Movie Not Found!</p>}
        <MoviesList movies={movies}/>
      </section>
    </React.Fragment>
  );
}

export default App;













// USING .then()  && .catch()

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







// USING async-await

// const fetchMoviesHandler = async () => {
//   try{
//     const response = await fetch('https://swapi.dev/api/films')
//     const data = await response.json()
    
//     const transformedMovies = data.results.map(movieData => {
//       return {
//           id: movieData.episode_id,
//           title: movieData.title,
//           openingText: movieData.opening_crawl,
//           releaseDate: movieData.release_date
//         }
//       })

//       setMovies( transformedMovies)
//     }
//   catch(error){
//     console.log('Error fetching movies:', error)
//   }
// }