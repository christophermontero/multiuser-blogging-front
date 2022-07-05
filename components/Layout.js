import dynamic from 'next/dynamic';
import React from 'react';
//import Header from './Header';
const Header = dynamic(() => import('./Header'), { ssr: false });

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
};

export default Layout;
