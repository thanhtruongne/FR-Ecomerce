import React, { useEffect,memo } from 'react';
import './Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBill,faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faFacebook,faInstagram,faTwitter,faGoogle,faChrome } from '@fortawesome/free-brands-svg-icons'
import { path } from '../../utils/constant';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getcurrentUser } from '../../stores/asyncActions';
import { AiOutlineLogout } from 'react-icons/ai';
import { logout , clearMessgage } from '../../stores/userSlice';
import Swal from 'sweetalert2';
import _ from 'lodash'

const TopHeader  = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {isLoggedIn ,current , message} = useSelector(state => state.user);   
    useEffect(() => {
      const  timeOut = setTimeout(() => {
        if(isLoggedIn) dispatch(getcurrentUser());
      },300);
      
      return () => {
        clearTimeout(timeOut);
      }
    },[dispatch,isLoggedIn])
    
    useEffect(() => {
        if(message) {
          Swal.fire('Error',message,'error')
          .then(() => {
            dispatch(clearMessgage());
            navigate(`${path.LOGIN}`)
          })
        }
    },[message])

    const handleLogout =() => {
      dispatch(logout());
      window.location.reload();
    }
  return (
    <div className='top-Header'>
    <div className='container'>
    
       <div  className='wrapper d-flex justify-content-between'>
         {/* left */}
         <div className='left-section-header d-flex'>
             <div className="site-nav-phone-order">
               <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
             </div>
             <div className='site-nav-currency'>
               <FontAwesomeIcon icon={faMoneyBill} />
               <span className='px-2'>VND <FontAwesomeIcon icon={faChevronDown} /></span>
             </div>
         </div>
          {/* right */}
           <div className='right-section-header d-flex'>
              {isLoggedIn  ? 
                <div className='site-nav-login px-2 text-white fs-6 '>
                 {!_.isEmpty(current) && `Hello ,${current?.firstName} ${current?.lastName}`}
                </div>  : 
                <Link to={`${path.LOGIN}`} className="site-nav-login px-2 text-white">
                  Sign in
                </Link>
                } 
               {current && <div className='log-out d-flex justify-content-center align-items-center position-relative'onClick={() => handleLogout()}><AiOutlineLogout /></div>}
               <div className='socialty'>
                 <span className='px-2'><FontAwesomeIcon icon={faFacebook}/></span>
                 <span className='px-2'><FontAwesomeIcon icon={faInstagram} /></span>
                 <span className='px-2'><FontAwesomeIcon icon={faTwitter} /></span>
                 <span className='px-2'><FontAwesomeIcon icon={faGoogle} /></span>
                 <span className='px-2'><FontAwesomeIcon icon={faChrome} /></span> 
               </div>
           </div>
       </div>
    
    </div>
 </div>
  )
}

export default memo(TopHeader);