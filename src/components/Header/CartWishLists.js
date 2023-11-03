import React,{useState,useEffect,useRef} from 'react';
import './CartWishLists.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart,faCartShopping,faUser } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router';
import {path} from '../../utils/constant'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { withbaseComponent } from '../../hocs';
import { showCart } from '../../stores/appSlice';
const CartWishLists  = ({dispatch}) => {
  const navigate = useNavigate();
  const {isLoggedIn , current, currentCart} = useSelector(state => state.user);
  const [toggle,setoggle] = useState(false);
  const profile = useRef();
  const handeProfileVision = () => {
    if(current?.role === 'admin' && isLoggedIn) {
      navigate(`${path.ADMIN}`);  
    }
    else if(isLoggedIn && current?.role === 'user') {
      navigate(`${path.PROFILE_DETAIL__USER}`);
    }
    else {
      navigate(`${path.LOGIN}`);
    }
  }
  //cách khi click outside bắt sự kiện;
  useEffect(() => {
     const handleToggleClickOutSide = (e) => {
     if(!profile.current?.contains(e.target)) setoggle(false)
     }

     document.addEventListener('click',handleToggleClickOutSide);

     return () => {
      document.removeEventListener('click',handleToggleClickOutSide);
     }
     
  },[])




  return (
   <div className='d-flex'>
    <div className='heart_WishList'>
        <FontAwesomeIcon icon={faHeart} />
    </div>

    <div className='Cart' onClick={() => dispatch(showCart({isOpenCart : true}))}>
        <FontAwesomeIcon icon={faCartShopping} className='' />
       <span className='px-2'>Item{currentCart?.cart?.length > 0 ? `(${currentCart?.cart?.length })` : ''}</span>
    </div>
{/*  onClick={() => handeProfileVision()} */}
    <div className='Cart'>
      <div className='position-relative thumb' >
        <FontAwesomeIcon icon={faUser} className='' 
        />
       <span ref={profile} className='px-2' onClick={(e) => {e.preventDefault(); setoggle(!toggle);}}>Profile</span>
    {toggle &&   <ul class="position-absolute list text-start">
          <li className=''><Link className='d-block p-2 link' to={ isLoggedIn ?`${path.MEMBERS}/${path.PERSONAL}` : `${path.LOGIN}`}>Your profile</Link></li>
        {current?.role === 'admin' && <li ><Link className='d-block p-2 link' to={`${path.ADMIN}/${path.DASHBOARD_ADMIN}`}>Admin Worspace</Link></li>}  
     {isLoggedIn &&  <li className='p-2'>LogOut</li>}     
        </ul>
      } 
      </div>

    </div>
   </div>
  )
}

export default withbaseComponent(CartWishLists);