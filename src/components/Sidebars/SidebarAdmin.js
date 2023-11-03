import React, { memo, useState } from 'react'
import './SidebarAdmin.scss'
import { Sidebar__Admin, path } from '../../utils/constant'
import { Link } from 'react-router-dom';
import {BiSolidDownArrow,BiSolidRightArrow  } from 'react-icons/bi'

const SidebarAdmin = () => {
  const [active,setactive] = useState([]);
  const [activeTAB,setTab] = useState(2)

  const handeSetIdPatch = (id) => {
    const alreadyIdPatch = active?.some(item => item === id);
    if(alreadyIdPatch) setactive(prev => prev?.filter(item => item !== id));
    else{
      setactive(prev => [...prev,id]);
      setTab(id);
    } 
  }


  return (
    <div className='inside_class'>
      <div className='title_class_admin d-flex flex-column justify-content-between align-items-center m-4 '>
         <Link to={path.HOME}>
            <img src='https://digital-world-2.myshopify.com/cdn/shop/files/logo_digital_new_250x.png?v=1613166683' height="24" />
         </Link>
        <span className='text-white mt-1'>Admin Workspace</span>
      </div>

      <div className='element_admin_sidebar d-flex flex-column'>
      {Sidebar__Admin.map(item => {
        return (
          <div className='h-100 w-100 pb-2 pt-2'>
            {item.type === 'Single' && 
            <div className={activeTAB === item.id ? 'link_content_sidebar tab' : 'link_content_sidebar'} 
            onClick={() => setTab(item.id)}>
            <Link className='text-white h-100 w-100 d-block ps-3 pt-3 pb-3' key={item.id} to={item.path}>
                 <span className='pe-2'>{item.icon}</span>
                 {item.content}
            </Link>
            </div>
            }
            {item.type === 'Multiphe' && 
             <React.Fragment>
                <div className={activeTAB === item.id ? 'text-white h-100 w-100 d-block ps-3 pt-3 pb-3 item_link_admin tab' : 
                'text-white h-100 d-block ps-3 pt-3 pb-3 item_link_admin'}  key={item.id} to={item.path}
                onClick={() => handeSetIdPatch(item.id)}
                >    
                  <div className='d-flex'>
                      <div>
                      <span className='pe-2'>{item.icon}</span>
                      {item.content}
                      </div>
                      <span className='ms-auto me-3'>{active.some(sque => sque === item.id) ?  <BiSolidDownArrow /> : <BiSolidRightArrow /> }</span>
                  </div>
                </div>           
                  {(active.some(value => value === item.id)) && item?.submenu?.map((value,index) => 
                  <div className={activeTAB === value.id ? 'h-100 w-100 link_submit bar mt-2 mb-2 d-inline-block' : 'h-100 w-100 link_submit mt-2 mb-2 d-inline-block'}
                   onClick={() =>  handeSetIdPatch(value.id)}>
                  <Link className='text-white h-100 w-100 d-block ps-5 pt-3 pb-3' to={value.path} key={index}>
                    <span className='pe-2'>{value.icon}</span>
                    {value.text}
                  </Link>    
                   </div>
                  )}
             </React.Fragment>
            }
            
          </div>
        )
      }
    
      )}
      </div>
    </div>
  )
}

export default memo(SidebarAdmin)