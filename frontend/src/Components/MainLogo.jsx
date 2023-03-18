import { Typography, Box } from '@mui/material';
import React from 'react';

const MainLogo = () => {
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between',}}>
                <Typography variant='h1' fontSize="5.1rem" fontFamily="Poppins" fontWeight="700">C</Typography>
                <Typography variant='h6' fontFamily="Poppins" fontWeight="400" sx={{paddingTop: '10px'}}>ineSuggest</Typography>
            </Box>
        </>
    );
};

export default MainLogo;