import React ,{useState}from 'react'
import './MyCart.scss'
import { Breadcrumb } from '../../components/Customs';
import { useSelector } from 'react-redux';
import { path } from '../../utils/constant';
import { withbaseComponent } from '../../hocs';
import {AiOutlineArrowRight} from 'react-icons/ai'
import ProductCart from '../user/ProductCart';
import { NumericFormat } from 'react-number-format';
const MyCart = ({dispatch,navigate}) => {
  const {currentCart} = useSelector(state => state.user);

  return (
    <div className='my_cart'>
        <header>
            <div className='container'>
                <h3>My Cart</h3>
                <div className='breadcrumb'>
                    <Breadcrumb category='My Cart' />
                </div>
            </div>
        </header>
        <div className='container'>
            <div className='wrapper'>
                <div className='label-cart'>
                   <div className='full_label_cart w-100'>
                       <div className='label_item d-flex w-100 justify-content-end'>
                            <div className='label_wrapper d-flex w-40 justify-content-between'>
                                <div className='qualnity'>Quanity</div>
                                <div className='total pe-4'>total</div>
                            </div>
                       </div>
                   </div>
                </div>
                {currentCart?.cart?.length > 0 ? currentCart?.cart?.map(item => 
                    <ProductCart data={item} isYourCart />
                ) : <div className='text-black mt-3'> Your cart is Empty</div>}
            </div>
            <div className='text-end w-100'>

            {currentCart && currentCart.cart?.reduce((item,value) => value.price + item,0) === 0 ? 
        '' :   <div className='sub_detail text-end'>
                  <div className='text-secondary d-flex justify-content-end align-items-center'>
                      <p className='title me-4'>SUBTOTAL : </p>
                      <div className='price'>{
                       <NumericFormat 
                       value={ currentCart && currentCart?.cart?.reduce((item,value) => (value.price * +value.qualnity) + item,0).toFixed(2)}
                       thousandSeparator ={true}
                       suffix={'VND'}
                       displayType = {'text'}
                       class='currency'   
                      /> }
                       </div>
                  </div>
                  <p className='mt-2 desc text-end'>Shipping, taxes, and discounts calculated at checkout.</p>
                  <button 
                   onClick={() =>{navigate(`${path.CHECKOUT}`)}}
                  className='btn btn-danger mt-3 me-4'>Check out <AiOutlineArrowRight className='me-2' /> </button>
                  <button
                  onClick={() =>{navigate(`${path.HOME}`)}}
                  className='btn btn-danger mt-3'>Update Cart <AiOutlineArrowRight className='me-2'/> </button>
                </div>
        }  
            </div>
        </div>

    </div>
  )
}

export default withbaseComponent(MyCart) 