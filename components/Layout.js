import dynamic from 'next/dynamic';
import React from 'react';
const Header = dynamic(() => import('./Header'), { ssr: false });

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
