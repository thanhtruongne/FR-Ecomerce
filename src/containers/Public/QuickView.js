import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router'; 
import ReactImageMagnify from 'react-image-magnify';
import { HandleQuanity } from '../../components/tools';
import { NumericFormat } from 'react-number-format';
import { Rating } from '@mui/material';
import './DetailProduct.scss';
import _ from 'lodash'
import { getproducts } from '../../ServicesAPI';
import Slider from 'react-slick';
import * as DOMPurify from 'dompurify';


const settings ={
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots : false
  }
const QuickView = ({product}) => {
  
    const {category,pid,title} = useParams();
  const [pidModal,setpid] = useState(null);
  const [active,setActive] = useState(null);
  const [imageChoose,setImageChoose] = useState(null);
  const [quanity,setquanity] = useState(1);
  const [productSlider,setProductSlider] = useState([]);
  const [variant,setVariabnt] = useState(null);
  const [activeVariants,setActiveVar] = useState(null);
  const [currentProduct,setCurrentProuduct] = useState({
    title : '',price : '',qualnity : '',thumb : '',images : []
  });

  const fetchDataSider = async() => {
    const dataSlider = await getproducts({limit: 9,sort : '-sold'});
    if(dataSlider.status === true && dataSlider.response.length > 0) {
      setProductSlider(dataSlider.response);
    }
  }


  useEffect(() =>{
    if(product?._id) {
      setCurrentProuduct(null);
      setImageChoose(null)
      fetchDataSider();
    }
  },[product?._id]);


  useEffect(() => {
     setImageChoose(null)
     setCurrentProuduct({
      title : product?.variants.find(item => item.sku === variant)?.title,
      price : product?.variants.find(item => item.sku === variant)?.price,
      qualnity : product?.variants.find(item => item.sku === variant)?.qualnity,
      thumb : product?.variants.find(item => item.sku === variant)?.thumb,
      images : product?.variants.find(item => item.sku === variant)?.images,
     })
       
  },[variant])



  

  const handleQuanityCount = useCallback((type) => {
    if(type === 'minus' && quanity > 1) {
      
        setquanity(prev => prev -1);
      
    }
    if(type === 'plus' && quanity < (currentProduct?.qualnity ? currentProduct.qualnity : product?.qualnity)) {
        setquanity(prev => prev  + 1);
    }
  },[quanity,product?.qualnity,currentProduct?.qualnity])
  return (
    <div className='shoptify_section_template'>   
      <div className='ProductionData'>
        <div className='container'>
          <div className='itemProps'>
            <div className='grid_product-single d-flex'>
              <div className="w-40 item-mage text-center">
                  <div className='photo-gap'>
                    <ReactImageMagnify {...{
                        smallImage: {                       
                            isFluidWidth: true,
                            src:!_.isEmpty(imageChoose) ? imageChoose : currentProduct?.images ? currentProduct?.images[0] : product?.images[0]
                            // !_.isEmpty(imageChoose) ? imageChoose : product?.images[0]
                             
                        },
                        largeImage: {
                            src: !_.isEmpty(imageChoose) ? imageChoose : currentProduct?.images ? currentProduct?.images[0] : product?.images[0],
                            width: 1200,
                            height: 1800
                        }
                      }}
                    />
                  
                  </div>
                  <ul className='thumbnails_product w-100%'>
                      <Slider {...settings}>

                        {currentProduct?.images ? currentProduct?.images.map((item,index) => {
                          return (
                            <div
                            className='link_item' 
                            key={index}
                            onClick={() => {setActive(index); setImageChoose(item);}}
                            >
                            <div>
                              <img className={active === index ? 'image bor-black' :'image'} src={item} />
                            </div>
                          </div>
                          )
                        }) :
                        product?.images.map((item,index) => {
                          return (
                            <div
                            className='link_item' 
                            key={index}
                            onClick={() => {setActive(index); setImageChoose(item);}}
                            >
                            <div>
                              <img className={active === index ? 'image bor-black' :'image'} src={item} />
                            </div>
                          </div>
                          )
                        })}
                      </Slider>
                  </ul>
              </div>

              <div className="w-40 desc_template_prod">
                <div className='wrapper_desc'>
                   <div className='price'>
                    <span>
                    <NumericFormat
                      value={currentProduct?.price ? currentProduct?.price  :  product?.price} 
                      suffix={'VND'} 
                      thousandSeparator ={true} 
                      displayType = {'text'}
                      className='currency'
                    />
                    </span>
                   </div>
                    <div className='rating_star'>
                      <Rating name="text-feedback" value={+product?.totalRatings} readOnly/>
                      <span className='text-danger'>{`(Sold : ${product?.sold} item)`}</span>
                    </div>
                    <div className='single_title mt-4'>
                      <ul>
                        {product && product?.description.length > 1 && product?.description.map((item,index) => {
                           return <li key={index}>{item}</li>
                        })}
                        {product && product?.description.length === 1 &&  <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0])}}/>}
                      </ul>

                    </div>
                    {product?.internal && 
                      <div className='internal d-flex mb-3'>
                        <label>Internal</label>
                        <span className='bor'>{product?.internal}</span>
                      </div>
                    }
                   
                    
                      <div className='internal d-flex mb-3'>
                        <label>Color</label>

                        <div className='d-flex'>
                          {product?.variants.length >= 1 ? product?.variants.map(item => 
                          <div onClick={() => {setVariabnt(item?.sku);setActiveVar(item?.sku)}}
                          key={item?._id} className={activeVariants === item?.sku 
                            ?'d-flex align-items-center variants border-danger' 
                            :'d-flex align-items-center variants' }>
                            <div className='image_variants'>
                              <img className='w-100 h-100 object-fit-cover' src={item?.thumb} />
                            </div>
                            <div className='ms-2'>
                              <div>{item?.color}</div>
                              <div>
                              <NumericFormat
                                value={item?.price} 
                                suffix={' VND'} 
                                thousandSeparator ={true} 
                                displayType = {'text'}
                                className='currency'
                              />
                              </div>
                            </div>

                          </div>
                          ) : 
                          <div className='internal'>
                            <span className='bor'>{product?.color}</span>
                          </div>
                          } 
                        </div>
                      </div>
                    

                    <div className='quanity_product internal d-flex mb-3'>
                      <label>Quanity</label>
                      <HandleQuanity quanity={quanity} handleQuanityCount={handleQuanityCount} />
                    </div>

                    <button className='btn btn-danger w-100 text-center mb-4' >Add to cart</button>
                    
                   

                 </div>
              </div>

            </div>
          
          </div>
        </div>
      </div>


    </div>
  )   
}

export default QuickView