import { configureStore } from '@reduxjs/toolkit';
import bgImageReducer from '../Slices.js/movieSlice';

export const store = configureStore({
    reducer: {
        movies: bgImageReducer,

    },
})