import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { colors } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BingoLogo from '../../../../svg/logos/Bingo';
import { Link as RouterLink } from 'react-router-dom'
const Topbar = ({
  onSidebarOpen,
}) => {
  const theme = useTheme();
  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={'100%'}
    >
      <Box display={'flex'} alignItems={'center'}>
        <Box marginRight={{ xs: 1, sm: 2 }}>
          <IconButton onClick={onSidebarOpen} aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </Box>
        <Box
          display={'flex'}
          alignItems="baseline"
          component={RouterLink}
          underline="none"
          to="/"
          title="bingo"
          height={{ xs: 28, md: 32 }}
          width={45}
        >
          <BingoLogo height={'100%'} width={'100%'} />
        </Box>
      </Box>
      <Box display="flex" alignItems={'center'}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
          <Box>
            <Link underline="none" component={'a'} href="https://www.sensory-minds.com/" target="blank" color="textPrimary">
              Sensory Minds
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
