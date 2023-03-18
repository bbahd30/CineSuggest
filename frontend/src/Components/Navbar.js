import { AppBar, IconButton, Toolbar, Stack, Menu } from '@mui/material';
import { Box, display } from '@mui/system';
import React from 'react';
import MainLogo from './MainLogo';
import MenuIcon from '@mui/icons-material/Menu';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const Navbar = () =>
{
    return (
        <AppBar elevation={0} sx={{ zIndex: 1000 }}>
            <Toolbar sx={{ alignItems: "center", justifyContent: "space-between", backgroundColor: "#0389be" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton
                        color='inherit'
                        sx={{ mr: 2, display: { md: "none" } }}
                    >
                        < MenuIcon />
                    </IconButton>
                    <Box sx={{
                        display: {
                            xs: "inline-block",
                            md: "none"
                        }
                    }}>
                        <MainLogo />
                    </Box>
                </Stack>

                <Box flexGrow={1} alignItems="center" display={{ xs: "none", md: "flex" }}>
                    <Box sx={{ marginRight: "30px" }}>
                        <MainLogo />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;