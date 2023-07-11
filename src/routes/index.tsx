import React, { lazy, Suspense } from 'react';

import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';

import Wave from 'assets/waves-bg.svg';

const Landing = lazy(() => import('pages'));
const Layout = lazy(() => import('layout'));

const rootStyle = document.documentElement.style;
rootStyle.backgroundImage = `url(${Wave})`;
rootStyle.backgroundRepeat = 'no-repeat';
rootStyle.backgroundPosition = 'center';
rootStyle.backgroundSize = 'cover';

document.body.style.background = 'transparent';

const DefaultRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<Layout />}>
            <Route path='/' element={<Landing />} />
          </Route>
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default DefaultRoutes;
