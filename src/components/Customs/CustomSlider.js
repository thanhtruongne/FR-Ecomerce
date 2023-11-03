import React from 'react';
import Slider from 'react-slick';
import Product from '../Products/Product';
const settings ={
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots : false
}

const CustomSlider  =({product,isNewArr}) => {

  return (
    <Slider {...settings}>
      { product && product.map((item,index) => {
        return (
          <div>
            <Product  
           key={index}
           productData={item}
           isNewArrival={isNewArr}
           />    
          </div>
        )
      })}
    </Slider>

  )
}

export default CustomSlider;