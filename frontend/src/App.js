import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import MovieDetailPage from './Pages/MovieDetailPage'
import MoviesPage from './Pages/MoviesPage'
import { FetchMovies } from './Api/FetchMovies'
import HomePage from './Pages/HomePage'
import { getMoviesData } from './Slices.js/movieSlice'
import SearchPage from './Pages/SearchPage'
import NotFoundPage from './Pages/NotFoundPage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import MainLayout from './Components/MainLayout'

function App()
{
  const dispatch = useDispatch()
  const popularMovies = () =>
  {
    FetchMovies("/movie/popular")
      .then((response) =>
      {
        console.log(response)
        dispatch(getMoviesData(response.data))
      })
  }

  useEffect(() => 
  {
    popularMovies()
  }, [])

  return (
    <div className="App">
      {/* <BrowserRouter>
        <Route path='/search/:query' element={<SearchPage />} />
        <Header />
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path='/movies8/:movieId' element={<MovieDetailPage />} />
          <Route path='/search/:query' element={<SearchPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <Footer />
      </BrowserRouter> */}
      <MainLayout />
    </div>
  )
}

export default App
