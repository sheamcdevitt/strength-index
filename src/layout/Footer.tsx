import React from 'react';

import { Box, Link, Typography } from '@mui/material';
import { Twitter, LinkedIn, GitHub } from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      p={{
        xs: '12px 0px',
        sm: '24px 3rem',
        md: '24px 5rem',
        lg: '24px 0',
      }}
      flexDirection={{ xs: 'column', sm: 'row' }}
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem',
        margin: '64px auto 0',
        borderTop: '1px solid #eaeaea',
        blur: '10px',
      }}
    >
      <Typography variant='h4' color='text.secondary' align='center'>
        {'© 2023 Shéa McDevitt'}
      </Typography>
      <Box
        justifyContent={{ xs: 'center', lg: 'space-between' }}
        sx={{
          display: 'flex',

          gap: '1rem',
        }}
      >
        <Link
          href='https://twitter.com/sheamcdev'
          target='_blank'
          rel='noopener noreferrer'
          color={'#8e88fb '}
        >
          <Twitter />
        </Link>
        <Link
          href='https://www.linkedin.com/in/sh%C3%A9a-mcdevitt-401006190/'
          target='_blank'
          rel='noopener noreferrer'
          color={'#8e88fb '}
        >
          <LinkedIn />
        </Link>
        <Link
          href='
          https://www.github.com/sheamcdevitt'
          target='_blank'
          rel='noopener noreferrer'
          color={'#8e88fb '}
        >
          <GitHub />
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
