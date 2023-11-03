import React,{useState,useEffect} from 'react';
import './Daily.scss'
import { NavLink } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { Rating } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars ,faHeart} from '@fortawesome/free-solid-svg-icons';
import { getproducts } from '../../ServicesAPI/Products';
const Daily  =() => {
  const [Hours , setHour] = useState(0);
  const [Minute , setMinute] = useState(0);
  const [Second , setSecond] = useState(0);
  const [Expired,setExpired] = useState(false);
  const [Data,setData] = useState(null);
  let IntervalFade;
  const fetchProductRandom =async() => {
      const dataLoad = await getproducts({page :Math.round(Math.random()*10),totalRatings : 5 , limit :1})
      setHour(2);
      setMinute(59)
      setSecond(59)
      setData(dataLoad.response[0]);
  }
 
  
  useEffect(() => {
    IntervalFade && clearInterval(IntervalFade);
    fetchProductRandom();
  },[Expired])

  useEffect(() => {
    IntervalFade = setInterval(() => {
    
        if(Second > 0) {
          setSecond(prev => prev - 1);
        }
        else {
          if(Minute > 0) {
            setMinute(prev => prev - 1);
            setSecond(59);
          }
          else {
            if(Hours > 0) {
              setHour(prev => prev - 1);
              setMinute(59);
              setSecond(59);
            }
            else {
              setExpired(!Expired)
            }
          }
        }
    },1000)
   return () => {
      clearInterval(IntervalFade)
   }
  },[Hours,Minute,Second,Expired])
 
  return (
  <div className='shoptify_daily_section'>
    <div className='wrapper_daily'>
      <h2 className='section_header'>
        <FontAwesomeIcon icon={faHeart} className='color' /> 
        DAILY DEALS
      </h2>
      <div className='section_wrapper_daily'>
        {/* Image */}
        <div className='grid_display'>
            <div className='grid-image'>
               <NavLink>
                <img  src={Data && Data.images[0]}/>
               </NavLink>
            </div>

        </div>
        
        {/* Title */}
        <div className='grid_title'>
        {Data && Data.title}
        </div>

             {/* Ratings */}
        <div className='rating-star'>
          <span className='spr-badge'>
          <Rating 
            name="half-rating-read" 
            value={Data && Data.totalRatings}
            defaultValue={''} 
            readOnly 
          />
          </span>
        </div>
         {/* Price */}
        <div className='product_price'>
         <span className='money'>
       <NumericFormat
          value={Data && Data.price} 
          suffix={'VND'} 
          thousandSeparator ={true} 
          displayType = {'text'}
          className='currency'
        />
         </span>
        </div>
          
          <div className='production_countdown'>
            <div className='wrapper_count  d-flex'> 
            <span className='countdown_num'>
              <span className='count_prioed'>{Hours}</span>
              <span className='count_mount'>Hours</span>
            </span>
            <span className='countdown_num'>
              <span className='count_prioed'>{Minute}</span>
               <span className='count_mount'>Minutes</span>
            </span>
            <span className='countdown_num'>
              <span className='count_prioed'>{Second}</span>
               <span className='count_mount'>Second</span>
            </span>
            </div>
          </div>
           
          <div className='add_to_cart_option'>
            <button className=' button_check'>
               <FontAwesomeIcon  icon={faBars} className='px-2'/>
               Options
            </button>
          </div>

      </div>
    </div>
  </div>
  )
}

export default Daily;