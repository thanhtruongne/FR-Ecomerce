import React from 'react'
import { MemberSideBar } from '../components/Sidebars'
import { Outlet } from 'react-router-dom';
import './Members.scss'
const Members = () => {
  return (
    <div className='d-flex height_widt'>
        <div className='backgr h-100  w-25'>
           <MemberSideBar />
        </div>
        <div className='h-100 w-100'>
            <Outlet />
        </div>
    </div>
  )
}

export default Members