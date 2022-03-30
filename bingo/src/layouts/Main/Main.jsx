import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import { Topbar, Sidebar, Footer } from './components';
import Container from '@mui/material/Container';
import { pages } from '../navigation';
import { Outlet } from 'react-router-dom';

const HideOnScroll = ({ children }) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    )
}

HideOnScroll.propTypes = {
    children: PropTypes.node.isRequired,
}

const Main = () => {
    const theme = useTheme();
    const [openSidebar, setOpenSidebar] = useState(false);

    const handleSidebarOpen = () => {
        setOpenSidebar(true);
    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    }

    return (
        <div>
            <HideOnScroll>
                <AppBar
                    position={'fixed'}
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                    }}
                    elevation={1}
                >
                    <Container maxWidth='xl'>
                        <Topbar
                            onSidebarOpen={handleSidebarOpen}
                        />
                    </Container>
                </AppBar>
            </HideOnScroll>
            <Sidebar
                onClose={handleSidebarClose}
                open={openSidebar}
                variant="temporary"
                pages={pages}
            />
            <Box height={{ xs: 56, sm: 64 }} />
            <Container maxWidth='lg'>
                <Box sx={{ padding: 1, marginBottom: 1 }} >
                    <Outlet />
                </Box>
            </Container>
            <AppBar
                position={'fixed'}
                variant=""
                sx={{
                    backgroundColor: theme.palette.background.paper,
                    top: 'auto',
                    bottom: 0
                }}
                elevation={0}
            >
                <Divider />
                <Container maxWidth='xl'>
                    <Footer />
                </Container>
            </AppBar>
        </div>
    )
};

Main.propTypes = {
    children: PropTypes.node,
}

export default Main
