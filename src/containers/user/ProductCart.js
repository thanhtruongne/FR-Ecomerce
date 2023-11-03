import React ,{ memo, useCallback, useEffect, useState }from 'react';
import './Cart.scss';
import {BsFillTrashFill} from 'react-icons/bs';
import { removeCart } from '../../ServicesAPI';
import { toast } from 'react-toastify';
import { withbaseComponent } from '../../hocs';
import { getcurrentUser } from '../../stores/asyncActions';
import { useSelector } from 'react-redux';
import { updatecart } from '../../stores/userSlice';
import { NumericFormat } from 'react-number-format';
const ProductCart = ({data,dispatch,isYourCart}) => {
  const {current , currentCart} = useSelector(state => state.user);
    const [qualnity,setqualnity] = useState(1);


    useEffect(() => {
      setqualnity(data?.qualnity)
    },[current])


    const handleQualnity = useCallback(async(type) => {
         
        if(type === 'minus' && qualnity  > 1) {
            setqualnity(prev => prev - 1);
        }
        if(type === 'plus' && qualnity <= data?.product?.qualnity ) {
            setqualnity(prev => prev  + 1);
        }
    },[qualnity,data?.product?.qualnity ])
    
    console.log(data);

    useEffect(() => {
        const value = currentCart?.cart.map(item =>  {  
          if(item?.product?._id === data?.product?._id && item?.color === data.color)  return {...item,qualnity}
          else return item;
        })
        dispatch(updatecart({cart : value}))
    },[qualnity])
    
    const handleRemoveCart = async(id) => {
        const res = await removeCart(id);
        if(res.status === true) {
            dispatch(getcurrentUser())
        }
    }

  return (
        <div>
           {isYourCart ?           
           <div className='cart_row'>
           <div className='link_item_cart w-100 d-flex'>
                 <div className='image_cart w-60 d-flex'>
                    <div className='w-33 ps-3'>
                        <img className='w-100 h-100' src={data.thumb}/>
                    </div>
                    <div className='w-60 ps-3'>
                       <div className='d-flex h-100 flex-column justify-content-center'>
                           <div>{data.title}</div>
                           <div>Color : {data.color}</div>
                           <div onClick={() => handleRemoveCart(data?.product?._id)}>Remove</div>
                       </div>
                    </div>
                 </div>
                 <div className='cart_detail_pirce w-40 d-flex align-items-center justify-content-between'>
                       <div className='qualnity text-center d-flex justify-content-between mt-3 w-50'>
                           <button onClick={() => handleQualnity('minus')} className=' text-black minus'>
                               <span>-</span>
                           </button>
                           <div>{qualnity}</div>
                           <button onClick={() => handleQualnity('plus')}  className=' text-black plus'>
                               <span>+</span>
                           </button>
                       </div>
                       <div className='price_total w-60 text-end'>
                        {
                       <NumericFormat 
                        value={(data.price * qualnity).toFixed(2)}
                        thousandSeparator ={true}
                        suffix={'VND'}
                        displayType = {'text'}
                        class='currency'   
                       /> }
                       </div>
                 </div>
           </div>
            </div> : 
            <div className='item_cart position-relative text-white'>
            <div className='wrapper mb-4'>
              <div className='d-flex'>
                <div className='ps-3 sub_image_cart w-25'>
                  <img className='w-100 h-100' src={data?.thumb}  />
                </div>
                <div className='w-75 d-flex align-items-center ps-3'>
                  <div className='w-50'>  
                    <div className='mb-2'>
                      <div className=''><span>{data?.title}</span></div>
                      <div ><span>{data?.product?.internal}/{data?.color}</span></div>
                    </div>
                    <div className='qualnity text-center d-flex justify-content-between mt-3'>
                      <button onClick={() => handleQualnity('minus')} className=' text-white minus'>
                        <span>-</span>
                      </button>
                      <div>{qualnity}</div>
                      <button onClick={() => handleQualnity('plus')} className=' text-white plus'>
                      <span>+</span>
                      </button>
                    </div>
                  </div>
                    <span className='ms-auto'>{
                     <NumericFormat 
                        value={(data.price * qualnity).toFixed(2)}
                        thousandSeparator ={true}
                        suffix={' VND'}
                        displayType = {'text'}
                        class='currency'   
                       /> }
                       </span>
                    <div className='position-absolute end-0 bottom-0' onClick={() => handleRemoveCart(data?.product?._id)}>
                        <BsFillTrashFill  />
                    </div>
                  </div>
              </div>

            </div>
          </div>
            }
        </div>
  )
}

export default withbaseComponent(memo(ProductCart)) ;