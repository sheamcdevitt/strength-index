import React from 'react';
import { Box, Typography } from '@mui/material';
import Chart from 'components/Chart';

const Hero: React.FC = () => {
  return (
    <Box
      className='fade-in'
      display='flex'
      flexDirection={{ xs: 'column-reverse', sm: 'row' }}
      mb={8}
    >
      <Box
        width={{
          xs: '100%',
          md: '75%',
        }}
      >
        <Typography
          className='text-gradient'
          variant='h1'
          mb={3}
          lineHeight={1.4}
        >
          Strength Index
        </Typography>
        <Typography variant='h2'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Typography>
        <Box mt={8}>
          <Chart />
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
