import React from 'react';
import { Box  } from '@mui/system';
import Navbar from '../Components/Navbar';
import { TextField } from '@mui/material';
import Container from "../Components/Container"
import { fetchMovies } from '../Api/movieApi';
import { setPage } from '../Slices/movieCarouselSlice';
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material'
import MovieCard from '../Components/MovieCard'
import { Grid } from "@mui/material";

const SearchPage = () => {
    const [data, setData] = useState(null);
    const pageState = useSelector((state) => state.carousel);
    const pageNum = pageState.pageNum
    const [parameter, setParameter] = useState('');
    const [timer, setTimer] = useState(null);
    
    const handleChange = (e) => {
        const parameter = e.target.value;
        setParameter(parameter);
        clearTimeout(timer);
        setTimer(setTimeout(fetchData, 500));
    };
    
    const fetchData = () =>
    {
        fetchMovies(`/search/multi?query=${parameter}&page=${pageNum}`)
            .then((response) => {
                setData(response.data.results);
            });
    }

    const handleScroll = (e) =>
    {
        console.log("______________")
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight === scrollHeight) {
             loadNext();
          }
    }

    const loadNext = () => {
        fetchData(`/search/multi?query=${parameter}&page=${pageNum}`)
            .then((response) => {
                if (data?.results) {
                    setData([...data, response.data.results]);
                } else {
                    setData(response);
                }
                setPage((prev) => prev + 1);
            });
    };
    
    useEffect(() => {
        setPage(1);
        fetchData();
    }, [parameter]);
    
    return (
    <>
        <Navbar />
            <div style={{backgroundColor: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))'}}>
                <Container>
                <Box sx={{ marginTop: "90px" }}>
                <TextField
                    sx={{
                        width: "100%",
                        marginTop: '30px',
                        backgroundColor: '#1F2937',
                        borderRadius: '4px',
                    }}
                    InputProps={{
                        style: { color: '#FFFFFF' }
                    }}
                    placeholder="Search the best movie for evening"
                    autoFocus
                    onChange={handleChange}
                />
                </Box>
                    {parameter != '' && (
                        data?.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                    {data?.map((item, index) => {
                        if (item.media_type === "person") return null;
                        return (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <MovieCard movie={item} />
                        </Grid>
                        );
                    })}
                    </Grid>
                   <div onScroll={handleScroll} style={{ height: "500px", overflow: "auto" }}>
                    </div>
                </>
                ) : (
                <span className="resultNotFound">No results found!</span>
                )
                )}
        </Container>
        </div>
    </>
    );
};

export default SearchPage;