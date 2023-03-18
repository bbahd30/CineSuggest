import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { SwiperSlide, Swiper } from 'swiper/react';
import CircularRating from './CircularRating';
import { fetchMoviesData } from '../Slices/movieCarouselSlice';

const MovieCarousel = (props) =>
{
    // const data = props.data
    // const movieState = useSelector((state) => state.movies)
    // return (
    //     <Box
    //         sx={{
    //             width: {
    //                 xs: "50%",
    //                 sm: "35%",
    //                 md: "25%",
    //                 lg: "20.5%"
    //             },
    //             width: "100%",
    //             height: 'max-content',
    //         }}>
    //         <Swiper
    //             slidesPerView={4}
    //             grabCursor={true}
    //             spaceBetween={20}
    //             style={{
    //                 width: "100%", height: "max-content",
    //                 backgroundColor: '#000000'
    //             }}>
    //             {data?.map((movie, index) =>
    //             {
    //                 return (
    //                     <SwiperSlide key={index}>
    //                         {/* <Link to={ }> */}
    //                         <Box sx={{ position: 'relative' }}>
    //                             <Box sx={{
    //                                 paddingTop: '160%',
    //                                 backgroundSize: 'contain',
    //                                 backgroundRepeat: 'no-repeat',
    //                                 backgroundPosition: 'center',
    //                                 backgroundImage: `url(${movieState.url.backdrop + movie.poster_path})`,
    //                             }} />
    //                             <Box sx={{ position: 'absolute', top: '85%', right: '10px', zIndex: 1 }}>
    //                                 <CircularRating value={movie.vote_average} />
    //                             </Box>
    //                         </Box>
    //                         <Box sx={{ color: 'white', marginTop: '20px' }}>
    //                             <Typography variant='h6' fontWeight="400" fontFamily="Poppins" fontSize="20px">
    //                                 {movie.title || movie.name}
    //                             </Typography>
    //                         </Box>

    //                         {/* </Link> */}
    //                     </SwiperSlide>
    //                 )
    //             })}
    //         </Swiper>
    //     </Box>
    // );
    const movieState = useSelector((state) => state.movies)
    const data = props.data
    const filters = props.filters
    const dispatch = useDispatch();
    const { loading, data: movieData, error, pageNum } = useSelector((state) => state.carousel);


    const handleReachEnd = () =>
    {
        console.log("naya ")
        console.log(filters)
        dispatch(fetchMoviesData({ pageNum, filters }));
    };

    return (
        <Box
            sx={{
                width: {
                    xs: "50%",
                    sm: "35%",
                    md: "25%",
                    lg: "20.5%"
                },
                width: "100%",
                height: 'max-content',
            }}>
            <Swiper
                slidesPerView={4}
                grabCursor={true}
                spaceBetween={20}
                onReachEnd={handleReachEnd}
                style={{
                    width: "100%", height: "max-content",
                    backgroundColor: '#000000'
                }}>
                {data?.map((movie, index) =>
                {
                    return (
                        <SwiperSlide key={index}>
                            {/* <Link to={ }> */}
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

                            {/* </Link> */}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </Box>
    );
};

export default MovieCarousel;