import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useEffect } from 'react';
import ContentWrapper from '../Components/ContentWrapper';
import MainLayout from '../Components/MainLayout';
import MovieCarousel from '../Components/MovieCarousel';
import Navbar from '../Components/Navbar';
import Welcome from '../Components/Welcome';
import useFetchData from '../hooks/fetchDataFunction';

const MoviesPage = () => {
  const { data } = useFetchData("/trending/movie/day");
  const { data: topRated } = useFetchData("/movie/top_rated");
  const { data: popular } = useFetchData("/movie/popular");

  const carousels = [
    { title: "Trending", data: data?.data?.results },
    { title: "Top Rated", data: topRated?.data?.results },
    { title: "Catch the popular", data: popular?.data?.results },
  ];

  return (
    <div>
      <Navbar />
      <Welcome />

      {carousels.map((carousel) => (
        <Box key={carousel.title} sx={{ backgroundColor: "black" }}>
          <Typography
            variant="h3"
            fontWeight="500"
            fontSize="30px"
            fontFamily="Archivo"
            sx={{ color: "white", padding: "30px 0" }}
          >
            {carousel.title}
          </Typography>
          <MovieCarousel data={carousel.data} />
        </Box>
      ))}
    </div>
  );
};

export default MoviesPage;