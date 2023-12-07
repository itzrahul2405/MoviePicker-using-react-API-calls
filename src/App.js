import './App.css';
import React, { useCallback, useState } from 'react'
import MoviesList from './components/MoviesList';
import { useEffect } from 'react';
import InputForm from './components/InputForm';


function App() {

  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null);

 
  const fetchMoviesHandler = useCallback( async () => {
    setIsLoading(true)
    setError(null)
    try{      
      const response = await fetch('https://react-http-ce1f7-default-rtdb.firebaseio.com/movies.json')
      // console.log(response)
      if(!response.ok){
        throw new Error('Something went wrong!')
      }
      const data = await response.json()
      console.log(data)

      const loadedMovies = []

      for(const key in data){
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key]['opening-text'],
          releaseDate: data[key]['release-date']
        })
      } 
        setMovies( loadedMovies)
      }
      catch(error){
        // console.error('Error fetching movies:', error)
        setError(error.message)
      }
      setIsLoading(false)
  }, [])


  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])
  // when page is refresh function is recreated => infinite call ( to avoid it use usecallback) 



  const addMovieHandler = async(newMovie) => {
    // console.log(newMovie)
    const response = await fetch('https://react-http-ce1f7-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(newMovie),
      header: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();
    console.log(data)
  }
  


  let content = <p>Loading...</p>

  if(!isLoading && error){
    content = <p>{error}</p>
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
        <InputForm addMovie={addMovieHandler}/>
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