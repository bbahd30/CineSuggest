import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovies } from "../Api/movieApi";

export const fetchMoviesData = createAsyncThunk(
    "movies/fetchMoviesData",
    async ({ pageNum, filters }) =>
    {
        console.log(filters)
        const response = await fetchMovies(`/discover/movie?page=${pageNum}`, filters);
        const payload = {
            data: response.data.results,
        };
        return payload;
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
        setScrolling: (state, action) => 
        {
            state.pageNum = action.payload['pageNum']
            state.filters = action.payload['filters']
        }

    },
    extraReducers: (builder) =>
    {
        builder
            .addCase(fetchMoviesData.pending, (state) =>
            {
                state.loading = true;
            })
            .addCase(fetchMoviesData.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.data = action.payload.data;
                state.pageNum += 1;
            })
            .addCase(fetchMoviesData.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { setScrolling } = movieCarouselSlice.actions
export default movieCarouselSlice.reducer;