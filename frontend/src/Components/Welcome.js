import React, { useState } from 'react';
import { useDispatch } from '@reduxjs/toolkit'
import { Box } from '@mui/system';


const Welcome = ({ mediaType, mediaCategory }) =>
{
    const dispatch = useDispatch()
    const [movies, setMovies] = useState([])
    const [genres, setGenres] = useState([])

    return (
        <div>
            {
                movies.map((movie, index) =>
                (
                    <Box key={index} sx={{
                        paddingTop: {
                            xs: "130%",
                            sm: "80%",
                            md: "60%",
                            lg: "45%"
                        },
                        backgroundPosition: "top",
                        backgroundSize: "cover",
                        backgroundImage: `url(${movie.poster_path})`
                    }}>
                        movie.title
                    </Box>
                ))
            }
        </div>
    );
};

export default Welcome;