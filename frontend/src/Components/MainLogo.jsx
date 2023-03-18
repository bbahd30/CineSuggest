import { Typography, Box } from '@mui/material';
import React from 'react';

const MainLogo = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h2' fontFamily="Poppins" fontWeight="700">C</Typography>
                <Typography variant='h6' fontFamily="Poppins" fontWeight="400">ineSuggest</Typography>
            </Box>
        </>
    );
};

export default MainLogo;