import './App.css';
import React, { useState } from 'react'
import MoviesList from './components/MoviesList';
import { useEffect } from 'react';




function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);
  const [retryIntervalId, setRetryIntervalId] = useState(null)

  
  
  const fetchMoviesHandler = async () => {

    setIsLoading(true)
    setError(null)

    try{      
      const response = await fetch('https://swapi.dev/api/film')
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
        startRetrying();
      }
      setIsLoading(false)
  }


  const startRetrying = () => {
    setRetryIntervalId(setInterval(() => {
      fetchMoviesHandler()
    }, 5000))
  }

  const cancelRetrying = () => {
    clearInterval(retryIntervalId)
    setRetryIntervalId(null)
  }

  useEffect(() => {
    return () => {
      // Cleanup function to clear the interval when the component is unmounted
      if (retryIntervalId) {
        clearInterval(retryIntervalId);
      }
    };
  }, [retryIntervalId]);


  let content = <p>Loading...</p>

  if(!isLoading && error){
    content = <p>{error} <strong>...Retrying</strong><button onClick={cancelRetrying}>Cancel</button></p>
  }

  if(!isLoading && !error && movies.length === 0){
    content = <p>Movie Not Found ! </p>
  } 
  if(!isLoading && !error && movies.length> 0){
    content = <MoviesList movies={movies}/>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} className='btn'>Fetch Movies</button>
      </section>
      <section>
        {content}
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