import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import womanImage from '../../assets/images/woman-shopping-online.gif'
import { NumericFormat } from 'react-number-format'
import { Paypal } from '../../components/Customs'
import {Confeti} from '../../components/Customs'

const Checkout = () => {
  const { current,currentCart } = useSelector(state => state.user);
  const [isSuccess,setSuccess] = useState(false);

  
  return (
    <div className='w-100 h-100'>
      {isSuccess && <Confeti />}
      <div className='d-flex px-3'>
        <div className='w-40'>
              <img src={womanImage} className='w-100 h-100' />
        </div>
        <div className='ps-3 w-60'>
        
            <div className='title' > 
                <h2 className='text-secondary mt-3'>Check Out</h2>
                <table class="table mt-3">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">Qualnity</th>
                        <th scope="col">Price</th>
                      </tr>
                    </thead>
                    <tbody class="table-group-divider">
                      {currentCart && currentCart?.cart?.map((item,index) => 
                        <tr>
                          <td>{item?.title}</td>
                          <td>{item?.qualnity}</td>
                          <td>{<NumericFormat
                                  value={item?.price} 
                                  suffix={' VND'} 
                                  thousandSeparator ={true} 
                                  displayType = {'text'}
                                  className='currency'
                                />}</td>
                      </tr>
                        )}
                          <tr>
                          <td> </td>
                          <td>Total : </td>
                          <td>{<NumericFormat
                                  value={currentCart?.cart?.reduce((item,value) => value.price * value.qualnity + item , 0)} 
                                  suffix={' VND'} 
                                  thousandSeparator ={true} 
                                  displayType = {'text'}
                                  className='currency'
                      />}</td>
                      </tr>
                    
            
                    </tbody>
                  </table>

            </div>
     
          <div className='Check-paypal w-100 mt-3'>                 
              <Paypal 
                 amount={Math.round(+currentCart?.cart?.reduce((item,value) => value.price * value.qualnity + item , 0) / 23500).toFixed(2)}
                 payload={{
                  products : current?.cart,
                  total : Math.round(+currentCart?.cart?.reduce((item,value) => value.price * value.qualnity + item , 0)),
                 }}
                 setSuccess={setSuccess}
                     
              />
          </div>

        </div>
      </div>
    </div>
  )
}

export default memo(Checkout)