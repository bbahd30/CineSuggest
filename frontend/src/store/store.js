import { configureStore } from '@reduxjs/toolkit';
import bgImageReducer from '../Slices/movieSlice';
import movieCarouselReducer from '../Slices/movieCarouselSlice';
export const store = configureStore({
    reducer: {
        movies: bgImageReducer,
        carousel: movieCarouselReducer
    },
})