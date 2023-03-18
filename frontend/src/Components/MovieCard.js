import React from 'react'
import { Typography, Box } from '@mui/material'
import CircularRating from './CircularRating'

import { useSelector } from 'react-redux'
const MovieCard = (props) =>
{
    const movie = props.movie
    const movieState = useSelector((state) => state.movies)

    return (
        <>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{
                    paddingTop: '160%',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundImage: `url(${movieState.url.backdrop + movie.poster_path})`,
                }} />
                <Box sx={{ position: 'absolute', top: '85%', right: '10px', zIndex: 1 }}>
                    <CircularRating value={movie.vote_average} />
                </Box>
            </Box>
            <Box sx={{ color: 'white', marginTop: '20px' }}>
                <Typography variant='h6' fontWeight="400" fontFamily="Poppins" fontSize="20px">
                    {movie.title || movie.name}
                </Typography>
            </Box>
        </>
    );
};

export default MovieCard;