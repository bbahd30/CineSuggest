import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SelectInput from "@mui/material/Select/SelectInput";
import { Box } from "@mui/system";
import { FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { useDispatch } from "react-redux";
import { fetchMoviesData } from "../Slices/movieCarouselSlice";

import useFetchData from "../hooks/fetchDataFunction";
import { fetchMovies } from "../Api/movieApi";
import { Typography } from "@mui/material";
import Navbar from "../Components/Navbar";
import { useSelector } from "react-redux";
import MovieCarousel from "../Components/MovieCarousel";

let filters = {};
const sortbyData = [
    { value: "popularity.desc", label: "Popularity Descending" },
    { value: "popularity.asc", label: "Popularity Ascending" },
    { value: "vote_average.desc", label: "Rating Descending" },
    { value: "vote_average.asc", label: "Rating Ascending" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
];

const ExplorePage = () =>
{
    const dispatch = useDispatch();
    // const { data, loading, error } = useSelector((state) => state.movieCarousel);
    const [selectedOption, setSelectedOption] = useState([])
    const [sorting, setSorting] = useState("")
    // const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    // const [loading, setLoading] = useState(false);
    const movieState = useSelector((state) => state.movies)
    const genre = movieState.genres
    const { data, loading, error } = useSelector(
      (state) => state.carousel
    );
    const sortingOptions = [
    { value: "popularity.desc", label: "Decreasing Popularity" },
    { value: "popularity.asc", label: "Increasing Popularity" },
    { value: "vote_average.desc", label: "Decreasing Rating" },
    { value: "vote_average.asc", label: "Increasing Rating" },
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    { value: "primary_release_date.asc", label: "Release Date Ascending" },
    { value: "original_title.asc", label: "Title (A-Z)" },
    ];
    
    useState(() =>
    {
        console.log(selectedOption)
    }, [selectedOption])

    useEffect(() => {
        dispatch(fetchMoviesData({ pageNum, selectedOption, sorting }));
    }, [dispatch, pageNum, selectedOption, sorting]);
    
    const fetchInitialData = () => {
        dispatch(fetchMoviesData({ pageNum, filters }));

        // fetchMovies("/discover/movie", filters).then((response) => {
        //     setData(response?.data?.results);
        //     console.log(response)
        //     setPageNum((prev) => prev + 1);
        // });
    };

    useEffect(() => {
        fetchInitialData();
    }, []);
    
    const handleChange = (event) => 
    {
        const selectedValues = Array.isArray(event.target.value)
        ? event.target.value
          : [event.target.value];
        setSelectedOption(selectedValues);
        const genreIds = JSON.stringify(selectedValues).slice(1, -1);
        filters.with_genres = genreIds;
        setPageNum(1);
        fetchInitialData();
    };

    const handleSorting = (event, action) => 
    {
        const newSortingValue = event.target.value;
        setSorting(newSortingValue);
        if (action.action !== "clear") {
            filters.sort_by = newSortingValue
        }
        else
            delete filters.sort_by;
        setPageNum(1);
        fetchInitialData();
    }

    // const fetchNextPageData = () => {
    //     dispatch(fetchMoviesData({ pageNum, selectedOption, sorting }));
    //     setPageNum((prev) => prev + 1);
    // };

    return (
        <>
            <Navbar />
           <Paper elevation={8} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                // position: 'sticky',
                marginTop: '60px'
            }}>
                <div>
                <Typography variant='h4' fontWeight="400" fontFamily="Poppins" fontSize="20px" sx={{color: 'black'}}>
                    Explore Movies
                </Typography>
                </div>
                <div>
                    <FormControl sx={{ m: 1, minWidth: '300px' }}>
                <InputLabel id="genreInput">Genres</InputLabel>
                <Select
                labelId="genreInput"
                id="genreSelectInput"
                value={selectedOption}
                multiple
                label="Genres"
                onChange={handleChange}
                sx={{
                    borderRadius: "4px",
                }}
                >
                {Object.keys(genre).map((key) => (
                    <MenuItem
                    key={key}
                    value={genre[key].id}
                    sx={{
                        "&.Mui-selected": {
                        backgroundColor: "#259dbb",
                        color: "white",
                        },
                    }}
                    >
                    {genre[key].name}
                    </MenuItem>
                ))}
                </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: '300px' }}>
                        <InputLabel id="soringInput">Sort by</InputLabel>
                        <Select
                        labelId="soringInput"
                        id="sorting"
                        value={sorting}
                        label="Genres"
                        onChange={handleSorting}
                        sx={{
                            borderRadius: "4px",
                        }}
                        >
                        {sortingOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
            </Paper>
                {(
                    <>
                        {!loading && data?.length > 0 ? (
                        <MovieCarousel data={data} filters={filters} />
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
        </>
    );
};

export default ExplorePage