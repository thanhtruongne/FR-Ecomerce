import React from 'react'
import './AdminLayout.scss';
import { Outlet } from 'react-router';
import { SidebarAdmin } from '../../components/Sidebars';
const AdminLayout = () => {
  return (
    <div className='container_admin_content w-100 h-100'>
      <div className='admin_lay_out w-100 h-100'>
        <div className='wrapper d-flex h-100'>
          <div className='sidebar_content_admin'>
            <SidebarAdmin />
          </div>
          <div className='oultet_type'>
             <Outlet />
          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminLayout