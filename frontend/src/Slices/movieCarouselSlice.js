import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { fetchMovies } from "../Api/movieApi"

export const fetchMoviesData = createAsyncThunk(
    "movies/fetchMoviesData",
    async ({ pageState, filters }, { dispatch }) =>
    {
        console.log(pageState, filters)
        const response = await fetchMovies(`/discover/movie?page=${pageState}`, filters);
        return {
            data: response.data.results,
        };
    }
);

const movieCarouselSlice = createSlice({
    name: "movieCarousel",
    initialState: {
        data: [],
        pageNum: 1,
        filters: {},
        loading: false,
        error: null,
    },
    reducers: {
        setPage: (state, action) => 
        {
            state.pageNum = action.payload['page']
        },
        resetData: (state) =>
        {
            state.data = []
        }

    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchMoviesData.pending, (state) =>
            {
                state.loading = true
            })
            .addCase(fetchMoviesData.fulfilled, (state, action) =>
            {
                state.loading = false
                state.data = [...state.data, ...action.payload.data]
            })
            .addCase(fetchMoviesData.rejected, (state, action) =>
            {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const { setPage, resetData } = movieCarouselSlice.actions
export default movieCarouselSlice.reducer