import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Footer from './Footer';

const MainLayout = () => {
  return (
    <CustomBox className='layout-container' maxWidth='lg'>
      <Outlet />
      <Footer />
    </CustomBox>
  );
};

export default MainLayout;

const CustomBox = styled(Container)(({ theme }) => ({
  margin: '120px auto 12px',
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    margin: '40px auto 12px',
    padding: '0 24px',
  },
}));
