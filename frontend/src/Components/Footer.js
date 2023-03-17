import { Paper } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import Container from './Container';

const Footer = () =>
{
    return (
        <Container>
            <Paper square={true} sx={{
                backgroundImage: "unset",
                padding: "2rem"
            }}>
                <Stack alignItems="center"
                    justifyContent="space-between"
                    sx={{ height: "max-content" }}>
                    {/* logo */}
                    <Box>
                        { }
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
};

export default Footer;