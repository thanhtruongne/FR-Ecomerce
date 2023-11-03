import React, { memo, useCallback, useEffect, useState } from 'react'
import './Cart.scss';
import {AiOutlineClose , AiOutlineArrowRight} from 'react-icons/ai'
import { withbaseComponent } from '../../hocs';
import { useSelector } from 'react-redux';
import ProductCart from './ProductCart';
import { path } from '../../utils/constant';
import { showCart } from '../../stores/appSlice';
import { NumericFormat } from 'react-number-format';
const Cart = ({isTransition,dispatch,navigate}) => {
    const {currentCart} = useSelector(state => state.user);
    
  return (
 
    <div   
        onClick={e => e.stopPropagation()} 
        className={`position-absolute  ${isTransition ? `end-0` : ``} cart_detail h-100`}>
        <div className='title_cart w-100 text-white d-flex justify-content-between align-items-center pt-3 pb-3'> 
          <span>YOUR CART</span>
          <div className='icon_exit' onClick={() => dispatch(showCart({isOpenCart : false}))}>
                <AiOutlineClose />
          </div>
        </div>
        <div className='content_cart_detail overflow-y-auto'>
          {currentCart?.cart?.length >= 1 ? currentCart?.cart.map(item => 
             <ProductCart data={item} />
          ) : <span className='text-white mt-3'>Your cart is empty</span>}
       
        </div>

        {currentCart &&  currentCart?.cart?.reduce((item,value) => value.price + item,0) === 0 ? 
        '' :   <div className='sub_detail overflow-hidden'>
                  <div className='text-white d-flex justify-content-between align-items-center'>
                      <p className='title'>SUBTOTAL</p>
                      <div className='price text-white'>{currentCart && 
                      <NumericFormat 
                      value={ currentCart?.cart?.reduce((item,value) => (value.price * +value.qualnity) + item,0).toFixed(2)}
                      thousandSeparator ={true}
                      suffix={'VND'}
                      displayType = {'text'}
                      class='currency'   
                      />
                      }</div>
                  </div>
                  <p className='mt-2 desc text-center'>Shipping, taxes, and discounts calculated at checkout.</p>
                  <button className='btn btn-danger mt-2 w-100'>Check out <AiOutlineArrowRight className='me-2' /> </button>
                  <button
                  onClick={() =>{navigate(`${path.CART}`); dispatch(showCart({isOpenCart : false}))}}
                  className='btn btn-danger mt-3  w-100'>Shopping Cart <AiOutlineArrowRight className='me-2'/> </button>
                </div>
        }        
      

      
    </div>
  )
}

export default withbaseComponent(memo(Cart)) ;