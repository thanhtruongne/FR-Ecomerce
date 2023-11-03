import React from 'react';
import { Outlet } from 'react-router';
const Admin  =() => {
  return (
    <React.Fragment>
      Admin
      <div>
          <Outlet />
      </div>
    </React.Fragment>
    )
}

export default Admin;