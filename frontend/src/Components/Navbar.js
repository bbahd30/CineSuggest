import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MainLogo from './MainLogo';
import { Link } from 'react-router-dom';

const Navbar = () =>
{
    return (
        <div>
            <AppBar
                elevation={0}
                sx={{
                    zIndex: 1000,
                    backgroundColor: '#212121',
                }}
            >
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton color="inherit" sx={{ mr: 2, display: { md: "none" } }}>
                            <MenuIcon />
                        </IconButton>
                        <Link
                            to="/"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                            }}
                        >
                            <MainLogo />
                        </Link>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Link
                            to="/explore/"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                marginRight: '30px',
                            }}
                        >
                            Explore
                        </Link>
                        <Link
                            to="/search/"
                            style={{
                                textDecoration: 'none',
                                color: 'white',
                                fontWeight: 'bold',
                                marginRight: '30px',
                            }}
                        >
                            Browse
                        </Link>
                        {/* <MainLogo sx={{ display: { xs: 'block', md: 'none' } }} /> */}
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navbar;
