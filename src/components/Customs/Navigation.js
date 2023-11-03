import React from 'react';
import { navigation } from '../../utils/constant';
import { NavLink } from 'react-router-dom';
import './Navigation.scss'
const Navigation  =() => {
 
  return (
  <div className='navigation_styles'>
    <div className='navigation_bar'>
       <div className='container'>
          <div className='navigation_wrapper'>
            <div className='grid_navigation'>
              {navigation && navigation.map((item,index) => {
                return (
                <NavLink key={item.id} to={item.path} className={({isActive}) => isActive ? 'px-3 text-danger hold mx-2' : 'px-3 mx-2 hold' }>
                   {item.value}
                  </NavLink>
                )
              })}
            </div>
          </div>
       </div> 
    </div>
  </div>
  )
}

export default Navigation;