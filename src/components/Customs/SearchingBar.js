import React,{useState,useEffect,memo} from 'react';
import './SearchingBar.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faDollar } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../../utils/constant';
import { useLocation, useNavigate, useParams } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import { getproducts } from '../../ServicesAPI';
import useDebounce from '../../Hook/useDebounce';


const SearchingBar  = ({name,activeClick,ChangeActiveClick,type = 'checkbox'}) => {
  const [Selected,setSelected] = useState([]);
  const [priceMax,setPriceMax] = useState('');
  const [payloadPrice,setpayloadPrice] = useState({
    from : '',to : ''
  })
  const {category} = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const location = useLocation();
  
  const handleChange = (e) => {
   const alreadySelected = Selected.find(item => item === e.target.value);
   if(alreadySelected) {
    setSelected(prev => prev.filter(item => item !== e.target.value));
    ChangeActiveClick(null)
   }
   else {
    setSelected(prev => [...prev,e.target.value]);
    ChangeActiveClick(null)
   }
  }
  //Color
  useEffect(() => {
    if(Selected.length > 0) {
       const query = Object.fromEntries([...params]);
       query.color = Selected.join(',');
      navigate({
        pathname: location?.pathname,
        search: createSearchParams(query).toString()
      });
    }     
    else {
      navigate(`/${category}`)
    }
  },[Selected])
  
  //Price
  let debounceTo = useDebounce(payloadPrice.to,1000);
  let debounceFrom = useDebounce(payloadPrice.from,1000);
  useEffect(() => {
    const query = Object.fromEntries([...params]);
    if(Number(payloadPrice.from) > 0) query.from = payloadPrice.from;
    if(Number(payloadPrice.to) > 0) query.to = payloadPrice.to;
    navigate({
      pathname : location?.pathname,
      search : createSearchParams(query).toString()
    })
  },[debounceTo,debounceFrom])
  
  const fectDataPriceMax = async() => {
    const priceMax = await getproducts({category : `${category}`,sort : '-price',limit : 1});
    if(priceMax) {
      setPriceMax(priceMax.response[0]?.price);
    }
  }
   
  useEffect(() => {
    fectDataPriceMax();
  },[])


  return (
 <div className={activeClick === name ? 'facets_disclosure box_shadow' : 'facets_disclosure'}
 onClick={() => ChangeActiveClick(name)}
 >
    <div className='summary_display'>
        <div className='d-flex justify-content-center align-items-center time_rise_width'
        >
          <span>{name}</span>
          <span className='count_bounce ms-2 me-2'>2</span>
          <FontAwesomeIcon icon={faChevronDown}  />
        </div>
    </div>

    <div className={activeClick === name ? 'item_absolute' : 'item_absolute dis_play_none'}
    onClick={(e) => e.stopPropagation()}
    >
      {type === 'checkbox' && 
      <div>
          <div className='item_header'>
            <span>{`${Selected.length} Selected`}</span>
            <span className='set_reset'
            onClick={() => setSelected([])}
            >Reset</span>
          </div>
        <div className='facest_list'>
          {
            colors.map((item,index) => {
              return (
                <div className='list_menu_item' key={index}>
                  <input 
                    type='checkbox' 
                    name={item}
                    value={item}
                    className='me-2' 
                    checked ={Selected.some(id => id === item)}
                    onClick={handleChange}
                  />
                <span>{item}</span>
              </div>
              )
            })
          }

        </div>
     </div>
      }
      {type === 'input' && 
        <div>
        <div className='item_header'>
          <span>{`The highest price is ${priceMax} VND`}</span>
          <span className='set_reset'
          onClick={() => setpayloadPrice({from : '',to : ''})}
          >Reset</span>
        </div>
      <div className='facest_list d-flex p-3 justify-content-between'>
          <div className='fields position-relative align-items-center d-flex w-40'>
             <FontAwesomeIcon icon={faDollar} className='pe-2'/>
             <input
              className='num'
              type='number'
              placeholder='From'
              value={payloadPrice.from}
              onChange={e => setpayloadPrice(prev =>({...prev,from : e.target.value}))}
             />
          </div>
          <div className='fields position-relative align-items-center d-flex w-40 ms-3'>
           <FontAwesomeIcon icon={faDollar} className='pe-2'/>
           <input
              className='num'
              type='number'
              placeholder='To'
              value={payloadPrice.to}
              onChange={e => setpayloadPrice(prev =>({...prev,to : e.target.value}))}
             />
          </div>
      </div>
   </div>
      }
       
    </div>
 </div>
  )
}

export default memo(SearchingBar);