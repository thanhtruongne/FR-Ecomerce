import React,{useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { createSlug } from '../../utils/createSlug';
import { NavLink } from 'react-router-dom';
import './Sidebar.scss'
import {useDispatch, useSelector } from 'react-redux';
import { getcategories } from '../../stores/asyncActions';
const Sidebar  =() => {
  const {categories} = useSelector(state => state.app);
  
  return (
  <div className='shop_section_sidebar'>
    <div className='sidebar_collections'>
      <div className='sidebar_title'>
         <FontAwesomeIcon  icon={faBars} className='mx-2'/> 
         ALL COLLECTIONS
      </div>
      <div className='sidebar_collection-content'>
        <ul className='sdcollections-list'>
         {categories && categories.map(item => {
          return (
            <li className='allcol-element'>
              <div className='element-icon'>
                <img src={item.img}/>
              </div>
            <NavLink to={createSlug(item.title)} id={item._id}
            >
              {item.title}
            </NavLink>
            </li>
          )
         })}

        </ul>
      </div>
    </div>
  </div>
  )
}

export default Sidebar;