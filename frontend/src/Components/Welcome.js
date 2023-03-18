import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Box, Stack } from '@mui/system';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from "swiper"
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button, Chip, Divider, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import useFetchData from '../hooks/fetchDataFunction';
import PlayArrow from '@mui/icons-material/PlayArrow';

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { CircularProgress } from '@mui/material';
import CircularRating from './CircularRating';
import ContentWrapper from './ContentWrapper';

const Welcome = () =>
{
    const dispatch = useDispatch()
    const [movies, setMovies] = useState([])
    const movieState = useSelector((state) => state.movies)

    const { data, loading } = useFetchData("/movie/popular")
    useEffect(() =>
    {
        setMovies(data?.data?.results || [])
    }, [data])

    return (
        <>
            {!loading &&
                <Box sx={{
                    position: "relative",
                    color: "black"
                }}>
                    <Swiper
                        grabCursor={true}
                        loop={true}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                        style={{
                            width: "100%", height: "max-content"
                        }}
                    >
                        {movies?.map((movie, index) =>
                        (
                            <SwiperSlide key={index}>
                                <Box sx={{
                                    paddingTop: {
                                        xs: "130%",
                                        sm: "80%",
                                        md: "60%",
                                        lg: "45%"
                                    },
                                    backgroundPosition: "top",
                                    backgroundSize: "cover",
                                    backgroundImage: `url(${movieState.url + movie.backdrop_path})`,
                                    "&::before": {
                                        content: "''",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        width: "100%",
                                        height: "100%",
                                        background: "linear-gradient(to right, rgb(0 0 0), rgb(0 0 0 / 0%))",
                                        opacity: '0.9',
                                        zIndex: 1
                                    },
                                }}>
                                    <Box sx={{
                                        width: "100%",
                                        height: "100%",
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        zIndex: '1000',
                                        paddingX: { sm: "10px", md: "5rem", lg: "10rem" }
                                    }}>
                                        <Box sx={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                            position: "relative",
                                            color: "white",
                                            width: { sm: "unset", md: "30%", lg: "40%" },
                                            paddingX: '30px',
                                        }}>
                                            <Stack spacing={4} direction="column">
                                                <Typography
                                                    variant='h4'
                                                    fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                                                    fontWeight="700"
                                                    textAlign="center"
                                                    fontFamily="Poppins">
                                                    {movie.title || movie.name}
                                                </Typography>
                                                <Stack direction="row" spacing={2} alignItems="center" sx={{
                                                    position: "relative",
                                                    marginLeft: "0 auto",
                                                }}
                                                >
                                                    <CircularRating value={movie.vote_average} />
                                                    {movie.genre_ids.splice(0, 2).map((genreId, index) => (
                                                        <Chip
                                                            variant="filled"
                                                            color="primary"
                                                            key={index}
                                                            label={movieState?.genres[genreId]?.name}
                                                            sx={{ backgroundColor: "#259dbb" }}
                                                        />
                                                    ))}
                                                </Stack>
                                                <Typography variant='body'>
                                                    {movie.overview}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    startIcon={<PlayArrow />}
                                                    component={Link}
                                                    // color="#259dbb"
                                                    // to={routesGen.mediaDetail(mediaType, movie.id)}
                                                    sx={{
                                                        width: "max-content",
                                                        backgroundColor: '#259dbb'
                                                    }}
                                                >
                                                    watch now
                                                </Button>
                                            </Stack>
                                        </Box>
                                    </Box>
                                </Box>
                            </SwiperSlide>
                        ))
                        }
                    </Swiper>
                </Box>}
        </>
    );
};

export default Welcome;