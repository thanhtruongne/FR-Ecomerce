import React,{useState,useEffect} from 'react';
import './Seller.scss'
import { getproducts } from '../../ServicesAPI/Products';
import Product from '../Products/Product';
import CustomSlider from '../Customs/CustomSlider';

const tabmenu = [
  {
     id : 1 ,name : 'Best Seller'
  },
  {
    id : 2 ,name : 'New Arrivals'
  },
  {
    id : 3 ,name : 'Tablet'
  },
]
const Seller  =({settings}) => {
  const [Seller , setSeller] = useState(null);
  const [Tablet , setTablet] = useState(null);
  const [Actived,SetActive] = useState(1);
  const [product , setProduct] = useState(null);
  const fetchproduct = async() => {
    const [seller,tablet] = await Promise.all([getproducts({sort :'-sold',limit : 5}),getproducts({sort:'-sold',category : 'Tablet'})])
    if(seller.response) setSeller(seller.response);
    if(tablet.response) setTablet(tablet.response);
    setProduct(seller.response)
  }
  useEffect(() => {
    fetchproduct()
  },[])
  
  useEffect(() => {

    if(Actived === 1) setProduct(Seller);
    if(Actived === 2) setProduct(Tablet);
  },[Actived])
  


  function handleClickItem(id) {
    SetActive(id)
  }

  return (
    <div className='grid_Seller'>
      <div className='home-tabs-inner'>
        <div className='tabs-product-slider1'>
          <ul className='tab-right d-flex'>
            {tabmenu.map(item => {
              return (
                <li className={Actived === item.id ? 'stab2 text' : 'stab2'} key={item.id}
                onClick={() => handleClickItem(item.id)}
                >
                    {item.name}
                </li>
              )
            })}
          </ul>
        </div>
        <div className='product_slider'>
          <div className='wrapper'>
           <CustomSlider product={product} />
          </div>  
        </div>
      </div>

      <div className='banner_area'>
        <div className='wrapper_banner'>
          <div className='image-bar-box'>
            <div className='grid_flutter_image'>

              <div className='grid_image_item w-50'>
                <div className='grid_image_link'>
                  <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-home2_2000x_crop_center.png?v=1613166657'/>
                </div>
              </div>

              <div className='grid_image_item w-50'>
                <div className='grid_image_link'>
                  <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'/>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Seller;