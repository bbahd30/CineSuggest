import { Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';

const Container = ({ header, children }) =>
{
    return (
        <Box sx={{
            marginTop: "5rem",
            marginX: "auto",
            color: "blue"
        }}>
            <Stack spacing={4}>
                <Box sx={{
                    position: "relative",
                    width: "100%",

                }}>
                    <Typography variant='h5' fontWeight="700">
                        {header}
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
};

export default Container;