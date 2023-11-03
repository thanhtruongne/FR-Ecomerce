import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UpdateCart, getSingleProduct } from '../../ServicesAPI';
import ReactImageMagnify from 'react-image-magnify';
import { ProductDescDetail } from '../../components/Products';
import { HandleQuanity } from '../../components/tools';
import {Breadcrumb,CustomSlider} from '../../components/Customs';
import { NumericFormat } from 'react-number-format';
import { Rating } from '@mui/material';
import './DetailProduct.scss';
import _ from 'lodash'
import { getproducts } from '../../ServicesAPI';
import Slider from 'react-slick';
import { NavLink, createSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { path } from '../../utils/constant';
import * as DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { withbaseComponent } from '../../hocs';
import { getcurrentUser } from '../../stores/asyncActions';

const settings ={
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 1,
  dots : false
}
const DetailProduct  =({isQuickViewProduct, data,navigate,location,dispatch}) => {
  const {category,pid,title} = useParams();
  const [pidModal,setpid] = useState(null);
  const {current,currentCart,isLoggedIn} = useSelector(state => state.user);
  const [product, setProduct] = useState(null);
  const [active,setActive] = useState(null);
  const [imageChoose,setImageChoose] = useState(null);
  const [quanity,setquanity] = useState(1);
  const [productSlider,setProductSlider] = useState([]);
  const [rerendering,setRender] = useState(false);
  const [variant,setVariabnt] = useState(null);
  const [activeVariants,setActiveVar] = useState(null);
  const [currentProduct,setCurrentProuduct] = useState({
    title : '',price : '',qualnity : '',thumb : '',images : [],color : ''
  });
  
  useEffect(() => {
    if(data && data._id) setpid(data._id);
    else if(pid) setpid(pid);
  },[data,pid])
  
  const fetchDataProduct = async() => {
    const response = await getSingleProduct(pid || pid);
    setProduct(response.Patch);
  }

  const fetchDataSider = async() => {
    const dataSlider = await getproducts({limit: 9,sort : '-sold'});
    if(dataSlider.status === true && dataSlider.response.length > 0) {
      setProductSlider(dataSlider.response);
    }
  }

  const handleRender =(boolean) => {
     if(boolean) setRender(!rerendering);
  }
  const handleUpdateCart = async(data) => {
      if(!isLoggedIn) {
        Swal.fire({
          title : "You have LogIn first !!",
          showCancelButton: true,
          confirmButtonText: 'Go Log In',
          icon : 'info'
        }).then(async(result) => {
              if(result.isConfirmed) {
                navigate({
                   pathname :`${path.LOGIN}`,
                   search : createSearchParams({redirect : location.pathname}).toString()
                })
              }
        })      
      }
      else {
        const update = await UpdateCart(data);
        if(update.errCode === 0) {
           toast.success(update.message);
           dispatch(getcurrentUser());
        } 
      }
  }

 useEffect(() => {
  fetchDataProduct();
 },[rerendering])


  useEffect(() =>{
    if(pid) {
      setCurrentProuduct(null);
      setImageChoose(null)
      fetchDataProduct();
      fetchDataSider();

  
    }
  },[pid]);


  useEffect(() => {
     setImageChoose(null)
     setCurrentProuduct({
      title : product?.variants.find(item => item.sku === variant)?.title,
      price : product?.variants.find(item => item.sku === variant)?.price,
      color : product?.variants.find(item => item.sku === variant)?.color,
      qualnity : product?.variants.find(item => item.sku === variant)?.qualnity,
      thumb : product?.variants.find(item => item.sku === variant)?.thumb,
      images : product?.variants.find(item => item.sku === variant)?.images,
     })
       
  },[variant])

  console.log(currentCart);

  

  const handleQuanityCount = useCallback((type) => {
    if(type === 'minus' && quanity > 1) {
      
        setquanity(prev => prev -1);
      
    }
    if(type === 'plus' && quanity < ( +currentProduct?.qualnity || +product?.qualnity)) {
        setquanity(prev => prev  + 1);
    }
  },[quanity,product?.qualnity,currentProduct?.qualnity]);

  useEffect(() => {
    
  })


  return (
    <div className='shoptify_section_template'>   
    {!isQuickViewProduct && 
      <header className='wrapper_template'>
        <div className='container'>
          <div className='breadcrumb_title mb-3'>{currentProduct?.title || title}</div>
            <div className='wrapper_breadcrumb'>
              <Breadcrumb title={currentProduct?.title || title} category={product?.category} />
            </div>
        </div>
      </header>
    }

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
                          {product?.variants?.length >= 1 ? product?.variants?.map(item => 
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

                    {currentCart?.cart?.some(item => item.product._id === product?._id && item.color === (currentProduct?.color || product?.color)) === true ?
                     <button 
                      disabled className='btn btn-danger w-100 text-center mb-4' >Added to cart</button> : 
                    
                    <button 
                    
                    onClick={() => handleUpdateCart({
                      product : product?._id,
                      title : currentProduct?.title || product?.title,
                      thumb : currentProduct?.thumb || product?.thumb,
                      price : currentProduct?.price || product?.price,
                      color :   currentProduct?.color || product?.color,
                      qualnity : quanity
                    })}
                    className='btn btn-danger w-100 text-center mb-4' >Add to cart</button>
                     }
                    {!isQuickViewProduct && 
                     <NavLink to={`${path.HOME}`}>
                      <FontAwesomeIcon icon={faChevronLeft} className='px-3' />
                      Back to home
                      </NavLink>
                    }   

                 </div>
              </div>

            </div>
            {!isQuickViewProduct && 
            <div className='grid info_mation'>
                    <ProductDescDetail ProductData={product} rerender={handleRender} />
            </div>
             }
          </div>
        </div>
      </div>

      {!isQuickViewProduct && 
       <div className='container'>
          <div className='slider_other_suggest_prod'>
            <h3 className='title'>OTHER CUSTOMERS ALSO BUY:</h3>
          </div>
          <div className='containy'>
            <CustomSlider product={productSlider} />
          </div>
       </div>
      }

    </div>
  )
}

export default withbaseComponent(DetailProduct) ;