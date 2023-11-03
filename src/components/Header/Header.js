import React from 'react';
import './Header.scss';
import { path } from '../../utils/constant';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill,faChevronDown,faPhone,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faInstagram,faTwitter,faGoogle,faChrome } from '@fortawesome/free-brands-svg-icons'
import CartWishLists from './CartWishLists';
import { useSelector } from 'react-redux';
import TopHeader from './TopHeader';
const Header  =() => {
  const user = useSelector(state => state.user);
  return (
    <header >
      <TopHeader />

      <div className='header-section'>
        <div className='wrapper-section-header'>
          <div className='container'>
              <div className='grid_full_section w-100 d-flex'>
                  <div className='grid_item left_grid- w-25'>
                     <a href=''>
                        <img src='https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683' height="24" />
                     </a>
                  </div>
                  <div className='grid_item right_grid-item w-75 justify-content-end d-flex'>
                    <div className='phone_support'>
                        <div className='heading'>
                          <FontAwesomeIcon icon={faPhone} className='mx-2' />
                          <span>(+1800) 000 8808</span>
                        </div>
                        <div className='time_extra'>
                           Mon-Sat 9:00AM - 8:00PM
                        </div>
                    </div>
                    <div className='email_support'>
                        <div className='heading'>
                          <FontAwesomeIcon icon={faEnvelope} className='mx-2' />
                          <span>SUPPORT@TADATHEMES.COM</span>
                        </div>
                        <div className='time_extra'>
                            Online Support 24/7
                        </div>
                    </div>
                    <div className='wishlists_cart '>
                      <CartWishLists />
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header;