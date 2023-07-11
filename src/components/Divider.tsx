import React from 'react';
import { Box, Typography } from '@mui/material';

const Divider: React.FC = () => {
  return (
    <Box
      className='fade-in'
      display='flex'
      justifyContent='center'
      mt={4}
      mb={4}
    >
      <Typography color='#a0a0a0a0' variant='h3'>
        ∿∿∿
      </Typography>
    </Box>
  );
};

export default Divider;
