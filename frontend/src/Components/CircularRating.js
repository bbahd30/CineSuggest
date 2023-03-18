import React from 'react';
import { CircularProgress } from '@mui/material';
import { Box, Typography } from '@mui/material';
import { fontSize } from '@mui/system';
const CircularRating = (props) =>
{
    return (
        <Box sx={{
            position: 'relative',
            display: 'inline-flex'
        }}>
            <CircularProgress
                value={props.value * 10}
                variant="determinate"
                size="3.5rem"
                sx={{
                    color: (theme) =>
                    {
                        const score = props.value * 10;
                        if (score < 40)
                        {
                            return theme.palette.error.main;
                        } else if (score < 50)
                        {
                            return theme.palette.warning.main;
                        } else
                        {
                            return theme.palette.success.main;
                        }
                    },
                    fontWeight: "bold",
                }}
            >
            </CircularProgress>

            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                    {props.value}
                </Typography>
            </Box>
        </Box>
    );
};

export default CircularRating;