import './App.css';
import React, { useState } from 'react'
import MoviesList from './components/MoviesList';




function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

  
  
  const fetchMoviesHandler = async () => {

    setIsLoading(true)
    setError(null)

    try{      
      const response = await fetch('https://swapi.dev/api/films')
      // console.log(response)
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const data = await response.json()
      console.log(data)
      
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
        // console.error('Error fetching movies:', error)
        setError(error.message)
      }
      setIsLoading(false)
  }
  
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} className='btn'>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <p className='loading-text'>Loading...</p>}
        {(!isLoading && movies.length===0 && !error) && <p className='loading-text'>Movie Not Found!</p>}
        {(!isLoading && error) && <p>{error}</p>}
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