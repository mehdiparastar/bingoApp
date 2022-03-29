import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import BingoLogo from '../../../../svg/logos/Bingo';

const Footer = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        width={'100%'}
        flexDirection={{ xs: 'column', sm: 'row' }}
      >
        <Box
          display={'flex'}
          component="a"
          underline="none"
          href="/"
          title="bingo"
          height={24}
          width={35}
        >
          <BingoLogo height={'100%'} width={'100%'} />
        </Box>
        <Box display="flex" flexWrap={'wrap'} alignItems={'center'}>
          <Box marginTop={1} marginRight={2}>
            <Link
              component={RouterLink}
              underline="none"
              to={'/'}
              color="textPrimary"
              variant={'subtitle2'}
            >
              Home
            </Link>
          </Box>
          <Box marginTop={1} marginRight={2}>
            <Link
              underline="none"
              component={RouterLink}
              to={'/bingo'}
              color="textPrimary"
              variant={'subtitle2'}
            >
              Bingo
            </Link>
          </Box>
          <Box marginTop={1}>
            <Button
              variant="outlined"
              color="primary"
              component="a"
              target="blank"
              href="https://www.sensory-minds.com/"
              size="small"
            >
              Sensory Minds
            </Button>
          </Box>
        </Box>
      </Box>
    </Grid>
    <Grid item xs={12}>
      <Typography
        align={'center'}
        variant={'subtitle2'}
        color="textSecondary"
        gutterBottom
      >
        &copy; bingo. {new Date().getFullYear()}, mehdi. All rights reserved
      </Typography>
      <Typography
        align={'center'}
        variant={'caption'}
        color="textSecondary"
        component={'p'}
      >
        <strong>
          This is a challenge code.
        </strong>
      </Typography>
    </Grid>
  </Grid>
);

export default Footer;
