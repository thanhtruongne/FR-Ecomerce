import React, { useState,useEffect } from 'react';
import './NewArrivals.scss'
import { getproducts } from '../../ServicesAPI/Products';
import { capitalizeFirstLetter } from '../../utils/helps';
import { CustomSlider } from '../Customs';

const tabmenu =[
    {
        id: 1,
        value : "SMARTPHONE"
    },
    {
        id: 2,
        value : "LAPTOP"
    },
    {
        id: 3,
        value : "TABLET"
    },
]

const NewArrivals  =() => {
   const [Phone,setphone] = useState(null);
   const [Laptop,setlaptop] = useState(null);
   const [tablet,settablet] = useState(null);
   const [PresentData,setData] = useState(null);
   const [active,setactive]= useState(1);
   const fetchdata = async() => {
    const [dataphone,dataLap,dataTab] = await Promise.all(
        [
            getproducts({category : 'Smartphone',limit: 6}),
            getproducts({category : 'Laptop',limit: 6}),
            getproducts({category : 'Tablet',limit: 6}),
        ]);
    
       if(dataphone && dataphone.response) setphone(dataphone.response);
       if(dataLap && dataLap.response) setlaptop(dataLap.response);
       if(dataTab && dataTab.response) settablet(dataTab.response);
        setData(dataphone.response);
      
    }

    useEffect(() => {
        fetchdata()
    },[])

   

    const handlechangevalue =(id) => {
        setactive(id)
    }

    useEffect(() => {
       if(active === 1) setData(Phone)
       if(active === 2) setData(Laptop)
       if(active === 3) setData(tablet)
    },[active])
    
  return (
  <div className='page_new_arrivals position-relative'>
      <div className='section_header d-flex justify-content-between align-items-center'>
        <div className='title_header'>
            <span>NEW ARRIVALS</span>
        </div>
        
        <div className='tabmenu'>
            {tabmenu.map(item => {
                return (
                    <span className={active === item.id ? 'state text-danger' : 'state'} key={item.id}
                    onClick={() => handlechangevalue(item.id)}
                    >{capitalizeFirstLetter(item.value)}</span>  
                )
            })}
        </div>

      </div>

        <div className='tab_wrapper'>
            <div className='grid_new_arrivals'>
                <div className='home_tab_inner_new'>
                    <CustomSlider  product={PresentData} isNewArr={true}/>
                </div>
            </div>
        </div>

  </div>
  )
}

export default NewArrivals;