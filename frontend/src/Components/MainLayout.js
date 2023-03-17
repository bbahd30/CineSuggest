import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';


const MainLayout = () =>
{
    return (
        <>
            <Box display="flex" minHeight="100vh">
                <Navbar />
                <Box
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh">
                    <Outlet />
                </Box>

            </Box>
            <Footer />
        </>
    );
};

export default MainLayout;