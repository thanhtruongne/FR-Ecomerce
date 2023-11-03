import React,{useState,useEffect} from 'react';
import './FeaturedProduct.scss'
import { Rating } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { getproducts } from '../../ServicesAPI/Products';
import { capitalizeFirstLetter } from '../../utils/helps';
const FeaturedProduct  =() => {
 const [Laptop,setLap] = useState(null);
 const [Phone,setPhone] = useState(null);
 const [Access,setAcess] = useState(null);


 const featureProduct = async() => {
   const [dataLaptop,dataPhone,dataAccess] = await Promise.all([
    getproducts({ category : 'Laptop',limit : 3}),
    getproducts({category : 'Smartphone',limit : 3}),
    getproducts({category : 'Tablet',limit : 3})]) ;
    if(dataLaptop && dataLaptop.response) setLap(dataLaptop.response);
    if(dataPhone && dataPhone.response) setPhone(dataPhone.response);
    if(dataAccess && dataAccess.response) setAcess(dataAccess.response);
 }

 useEffect(() => {
    featureProduct()
 },[])


  return (
    <div className='grid_features'>
        <header className='header_features'>
             <h2>Featured Products</h2>
        </header>
        <div className='grid_item_features'>
            <div className='wrapper_features d-flex'>
                
                <div className='Phone_line'>
                    {Phone && Phone.map(item => {
                        return (
                    <div className='content_col'>
                    <div className='grid_views'>
                        <div className='grid_display'>
                            <div className='product_image'>
                                <img src={item.images[0]}/>
                            </div>
                        </div>
                        <div className='desc_features'>
                            <div className='title'>{capitalizeFirstLetter(item.title)}</div>
                            <div className='Rating_star'>
                            <Rating 
                            name="half-rating-read"
                            value={item && item.totalRatings} 
                            defaultValue={''} 
                            readOnly 
                        />
                            </div>
                            <div className='price_features'>
                            <NumericFormat
                                value={item.price} 
                                suffix={' VND'} 
                                thousandSeparator ={true} 
                                displayType = {'text'}
                                className='currency'
                            />
                            </div>
                        </div>

                    </div>
                    </div>

                        )
                    })}
                 
                </div>

                <div className='Laptop_line'>
                {Laptop && Laptop.map(item => {
                        return (
                    <div className='content_col'>
                    <div className='grid_views'>
                        <div className='grid_display'>
                            <div className='product_image'>
                                <img src={item.images[0]}/>
                            </div>
                        </div>
                        <div className='desc_features'>
                            <div className='title'>{capitalizeFirstLetter(item.title)}</div>
                            <div className='Rating_star'>
                            <Rating 
                            name="half-rating-read" 
                            value={item && item.totalRatings}
                            defaultValue={''} 
                            readOnly 
                        />
                            </div>
                            <div className='price_features'>
                            <NumericFormat
                                value={item.price} 
                                suffix={' VND'} 
                                thousandSeparator ={true} 
                                displayType = {'text'}
                                className='currency'
                            />
                            </div>
                        </div>

                    </div>
                    </div>

                        )
                    })}
                 
                </div>

                <div className='Accesorries_line'>
                {Access && Access.map(item => {
                        return (
                    <div className='content_col'>
                    <div className='grid_views'>
                        <div className='grid_display'>
                            <div className='product_image'>
                                <img src={item.images[0]}/>
                            </div>
                        </div>
                        <div className='desc_features'>
                            <div className='title'>{capitalizeFirstLetter(item.title)}</div>
                            <div className='Rating_star'>
                            <Rating 
                            value={item && item.totalRatings}
                            name="half-rating-read" 
                            defaultValue={''} 
                            readOnly 
                        />
                            </div>
                            <div className='price_features'>
                            <NumericFormat
                                value={item.price} 
                                suffix={' VND'} 
                                thousandSeparator ={true} 
                                displayType = {'text'}
                                className='currency'
                            />
                            </div>
                        </div>

                    </div>
                    </div>

                        )
                    })}
                </div>
            </div>
        </div>

    </div>
  )
}

export default FeaturedProduct;