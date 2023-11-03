import React, { useState } from 'react';
import './Product.scss'
import { NumericFormat } from 'react-number-format'
import Rating from '@mui/material/Rating';
import { FaShoppingCart,FaHeart,FaEye ,FaCheck} from "react-icons/fa";
import { SelectOptionProd } from '../Customs';
import { withbaseComponent } from '../../hocs';
import { useSelector } from 'react-redux';
import { path } from '../../utils/constant';
import Swal from 'sweetalert2';
import ModalQuickView from '../Modals/ModalQuickView';
import { UpdateCart,AddWishList } from '../../ServicesAPI';
import { toast } from 'react-toastify';
import { getcurrentUser } from '../../stores/asyncActions';
const Product  =({productData,isNewArrival,navigate,dispatch}) => {
  const [openModalView,setModalView] = useState(false);
  const [hover,sethover] = useState(false);
  const {isLoggedIn , current,currentCart} = useSelector(state => state.user);

  const HandleOnmouseLeave =() => {
    sethover(false)
  }
  
  const HandleOnmouseEnter =() => {
    sethover(true)
  }
  const handleQuickView = async(e,type) => {
    e.stopPropagation();
    if(type === 'cart') {
      if(!isLoggedIn)  {
        Swal.fire({
          title : "You have LogIn first !!",
          showCancelButton: true,
          confirmButtonText: 'Go Log In',
          icon : 'info'
        }).then(async(result) => {
              if(result.isConfirmed) await navigate(`${path.LOGIN}`);
             
        })
      }
      else {
        const data = {
          product : productData?._id,
          title : productData?.title,
          price : productData?.price,
          thumb : productData?.thumb,
          qualnity : 1,
          color : productData?.color
        }
        const response = await UpdateCart(data);
        if(response.errCode === 0) {
          dispatch(getcurrentUser())
          toast.success(response?.message);
        }
        else  toast.error('Fail to log cart');
      }
    
    } 
    if(type === 'heart') {
      if(!isLoggedIn)  {
        Swal.fire({
          title : "You have LogIn first !!",
          showCancelButton: true,
          confirmButtonText: 'Go Log In',
          icon : 'info'
        }).then(async(result) => {
              if(result.isConfirmed) await navigate(`${path.LOGIN}`);
        })
      }
      else {
        const NewAdd = await AddWishList(productData?._id);
        if(NewAdd.errCode === 0) {
          dispatch(getcurrentUser());
        }
      }


    }
   if(type === 'eye') {
     setModalView(true);
  }
}
  
console.log(current);
  return (
  <div className='grid_item'>
    <div className='pl'>
      <div className='grid_view'
      onClick={() => navigate(`/${productData?.category}/${productData?._id}/${productData?.title}`)} 
      onMouseLeave={() => HandleOnmouseLeave()}
      onMouseEnter={() => HandleOnmouseEnter()} 
      >
        {/* Image */}
        <div className='grid_display'>
            <div className='grid-image'>           
                <img  src={productData.images[0]}/>
            </div>
            
           <div class={isNewArrival === true ? 'hidden action_btn' : 'action_btn'}>
             <span onClick={(e) =>handleQuickView(e,'cart')}>
              {currentCart &&  currentCart?.cart?.some(item => item?.product?._id === productData?._id && item.color === productData?.color) === true ? 
              <SelectOptionProd  disabled icon={<FaCheck/>} />  : <SelectOptionProd  icon={<FaShoppingCart/>} /> 
               }
              
              </span>
             <span onClick={(e) =>handleQuickView(e,'heart')}><SelectOptionProd icon={<FaHeart/>} /></span> 
             <span onClick={(e) =>handleQuickView(e,'eye')}><SelectOptionProd icon={<FaEye/>} /></span>
           </div>

        </div>
        
        {/* Title */}
        <div className='grid_title'>
            {productData.title}
        </div>

             {/* Ratings */}
        <div className='rating-star'>
          <span className='spr-badge'>
          <Rating 
            name="half-rating-read" 
            value={productData.totalRatings}
            defaultValue={''} 
            readOnly 
          />
          </span>
        </div>
         {/* Price */}
        <div className='product_price'>
         <span className='money'>
       <NumericFormat
          value={productData.price} 
          suffix={'VND'} 
          thousandSeparator ={true} 
          displayType = {'text'}
          className='currency'
        />
         </span>
        </div>


        {isNewArrival === true && <div className={hover === true ? 'over_play_new_arrivals' : 'over_play_new_arrivals hidden'}>
            <div className='info_display'>
                <div className='info_title d-flex justify-content-between align-items-center'>
                <div className='left-title'>
                        <span className=''>{productData.title}</span>
                </div>
                <div className='right-title d-flex flex-column'>
                    <span>
                    <NumericFormat
                        value={productData.price} 
                        thousandSeparator ={true} 
                        displayType = {'text'}
                        className='currency'
                    />
                    </span>
                    <span className='ms-auto'>VND</span>
                </div>
                </div>
                <div className='inner_desc'>
                    <div className='top_inerr'>
                        <ul className='inside_desc'>
                            {productData.description.map((item,index) => 
                            <li key={index}>{item}</li>
                            )}
                        </ul>
                    </div>

                    <div className='action'>
                    <span onClick={(e) =>handleQuickView(e,'cart')}><SelectOptionProd icon={<FaShoppingCart/>} /> </span>
                    <span onClick={(e) =>handleQuickView(e,'heart')}><SelectOptionProd icon={<FaHeart/>} /></span> 
                    <span onClick={(e) =>handleQuickView(e,'eye')}><SelectOptionProd icon={<FaEye/>} /></span>
                    </div>

                </div>
            </div>
         </div>}
        
         
         <ModalQuickView isOpen={openModalView} setOpen={setModalView} product={productData} />
      </div>
    </div>
    
   
  </div>
  )
}

export default withbaseComponent(Product);