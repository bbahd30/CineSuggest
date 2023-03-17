import { configureStore } from '@reduxjs/toolkit';
import genreReducer from '../Slices.js/movieSlice';

export const store = configureStore({
    reducer: {
        genre: genreReducer,

    },
})