import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Navigation } from '../components/Customs';
const Public  = () => {
  return (
    <React.Fragment>
      <div className='shopify-section '>
             <Header />
             <Navigation />
        </div>
      <div className='main'>
        <Outlet />
      </div>
    </React.Fragment>
  )

}

export default Public;