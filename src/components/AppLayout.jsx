// src/layouts/AppLayout.jsx
import React from 'react';
import ScrollToTop from './ScrollToTop';
import Drawer from './Drawer';


const AppLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Drawer />
    </>
  );
};

export default AppLayout;
