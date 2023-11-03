import React from 'react';
import Sidebar from '../../components/Sidebars/Sidebar';
import Banner from '../../components/Themes/Banner';
import Daily from '../../components/Themes/Daily';
import Seller from '../../components/Themes/Seller';
import FeaturedProduct from '../../components/Products/FeaturedProduct';
import NewArrivals from '../../components/Products/NewArrivals';
import category from '../../DATA/cate';
import './Homepage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const settings ={
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots : false
}


const Homepage  =() => {
  return (
    <div className='container'>
      <div className='px-4 mb-5 d-flex'>
        <div className='Side w-25'>
          <Sidebar />
        </div>
        <div className='Slider w-75'>
          <Banner />
        </div>
      </div>
      <div className='px-4 mb-5 d-flex'>
      <div className='Side w-25'>
          {/* <Daily /> */}
        </div>
        <div className='Slider w-75'>
           <Seller />
        </div>
      </div>
      <div className='index_section'>

       <div className='Feature_Product container'>
           <FeaturedProduct />
       </div>

       <div className='Banner_footer'>
          <div className='container'>
            <div className='galley_advan'>
              <div className='gallery_wrapper d-flex'>
                 <div className='left_item_gallery w-50'>
                  <div className='wrapper_image_gallery'>
                    <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-bottom-home2_b96bc752-67d4-45a5-ac32-49dc691b1958_600x.jpg?v=1613166661' />
                  </div>
                 </div>

                 <div className='middle_item w-25'>
                  <div className='twice_image'>
                    <div className='wrapper_image_middle'>
                      <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner2-bottom-home2_400x.jpg?v=1613166661' />
                    </div>
                    <div className='wrapper_image_middle'>
                      <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner3-bottom-home2_400x.jpg?v=1613166661' />
                    </div>
                  </div>
                 </div>

                 <div className='right_item w-25'>
                 <div className='wrapper_image_right'>
                    <img src='https://digital-world-2.myshopify.com/cdn/shop/files/banner4-bottom-home2_92e12df0-500c-4897-882a-7d061bb417fd_400x.jpg?v=1613166661' />
                  </div>
                 </div>
              </div>
            </div>
          </div>
       </div>

       <div className='new_arrivals position-relative'>
          <div className='container'>
            <NewArrivals />
          </div>
       </div>

       <div className='hot_collections'>
        <div className='container'>
          <div className='position-relative pb-4'>
             <div className='section_header_collect'>
               <span>Hot Collections</span>
             </div>

             <div className='collect_group'>
              {category.map((item,index) => 
                   <div className="collection_item float-start"key={index} >
                       <div className='collect_inner d-flex'>
                           <div className='w-50 image_collect'>
                               <img src={item.image}/>
                           </div>
                           <div className='item_hot w-50'>
                                 <div className='title'>{item.cate}</div>
                                 <div className='links'>
                                  <ul>
                                {item.brand.map((item,index) =>
                                <li key={index}>
                                  <FontAwesomeIcon icon={faChevronRight} className='px-1'/>
                                  {item}
                                </li>
                                )}
                                  </ul>
                                 </div>
                           </div>
                       </div>
                   </div>
              
              )}
             </div>
          </div>
        </div>
       </div>

      </div>
    </div>
  )
}

export default Homepage;