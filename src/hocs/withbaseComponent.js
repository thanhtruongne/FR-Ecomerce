import React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
// bọc các file để hoc các import component 
const withbaseComponent = (Component) => (props) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return <Component {...props} location={location} dispatch={dispatch} navigate={navigate} />
}
  



export default withbaseComponent