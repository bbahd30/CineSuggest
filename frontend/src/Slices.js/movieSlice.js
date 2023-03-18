import { createSlice } from '@reduxjs/toolkit';

export const genreSlice = createSlice({
    name: 'movie',
    initialState: {
        url: {},
        genres: {},
    },
    reducers: {
        getMoviesData: (state, action) =>
        {
            state.url = action.payload['backdrop']
        },
        getGenres: (state, action) => 
        {
            state.genres = action.payload
        }
    }
})

export const { getMoviesData, getGenres } = genreSlice.actions
export default genreSlice.reducer