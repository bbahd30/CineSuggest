import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import MovieDetailPage from './Pages/MovieDetailPage'
import MoviesPage from './Pages/MoviesPage'
import { fetchMovies } from './Api/movieApi'
import HomePage from './Pages/HomePage'
import { getGenres, getMoviesData } from './Slices/movieSlice'
import SearchPage from './Pages/SearchPage'
import NotFoundPage from './Pages/NotFoundPage'
import Header from './Components/Header'
import Footer from './Components/Footer'
import useFetchData from './hooks/fetchDataFunction'
import ExplorePage from './Pages/ExplorePage'

function App()
{
  const dispatch = useDispatch()
  const { data, loading } = useFetchData("/genre/movie/list")
  const fetchConfiguration = () =>
  {
    fetchMovies("/configuration")
      .then((response) =>
      {
        const imgUrl = {
          backdrop: response.data.images.secure_base_url + "original",
          poster: response.data.images.secure_base_url + "poster",
        }
        dispatch(getMoviesData(imgUrl))
      })
  }

  useEffect(() => 
  {
    fetchConfiguration()
  }, [])

  useEffect(() => 
  {
    const genresList = {}
    if (data?.data?.genres)
    {
      data.data.genres?.map((item) => genresList[item.id] = item)
      dispatch(getGenres(genresList))
    }
  }, [data])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesPage />} />
          <Route path='/movies/:movieId' element={<MovieDetailPage />} />
          <Route path='/search' element={<SearchPage />} />
          {/* <Route path='/search/:query' element={<SearchPage />} /> */}
          <Route path='/explore' element={<ExplorePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
