import {
  MdOutlineDashboardCustomize,
  MdManageAccounts,MdOutlineProductionQuantityLimits,MdProductionQuantityLimits
 } from 'react-icons/md'
 import {LiaJediOrder} from 'react-icons/lia';
 import {IoIosCreate} from 'react-icons/io';
 import {TfiBackLeft} from 'react-icons/tfi'
 import { GoChecklist } from "react-icons/go";
 import _ from 'lodash'
export const path ={
  PUBLIC : '',
  HOME : '/',
  LOGIN : '/login',
  PRODUCT : ':category',
  BLOG : 'blogs',
  OURSERVICES  : 'services',
  FAQ : 'faq',
  CONTACTUS : 'contactus',
  ADMIN:'/System',
  DASHBOARD_ADMIN : 'Dashboard',
  MANAGEMENT_USER : 'Manage-user',
  MANAGEMENT_ORDER : 'Manage-order',
  MANAGEMENT_PRODUCT : 'Manage-product',
  CREATE__PRODUCT : 'Create-product',
  PROFILE_DETAIL__USER : '/profile',
  DETAIL_PRODUCT__PID__TITLE : '/:category/:pid/:title',
  ACCURACY_VERTIFY_REGISTER : '/access_token_register/:token/:status',
  RESET_AND_CHANGE_PASSWORD__TOKEN : 'vertiy_token_change_password/:token',
  CHECKOUT : '/check-out',
  MEMBERS : '/members',
  PERSONAL :'personal',
  CART : '/cart',
  HISTORYBOUGHT : 'history',
  WISHLIST : "wishlist"
}


export const navigation = [
     {
      id : 1,
      value : 'Product',
      path :' '
     },
     {
      id : 2,
      value : 'Blog',
      path : `/${path.BLOG}`
     },
     {
      id : 3,
      value : 'Our Services',
      path : `/${path.OURSERVICES}`
     },
     {
      id : 4,
      value : 'FAQ',
      path : `/${path.FAQ}`
     },
     {
      id : 5,
      value : 'Contact to us',
      path : `/${path.CONTACTUS}`
     },

]

export const validate = (payload,setInvalid) => {
   let invalidCount = 0;
   const formattePayload = Object.entries(payload);
    for(let item of formattePayload ) {
      if(item[1] === ' ') {
        invalidCount++;
        setInvalid(prev => [...prev,{name : item[0],message : 'Required this fields can not be empty'}]);
      }
    }
    
    for(let item of formattePayload) {
        switch(item[0]) {
          case 'email' : 
           if(!item[1].match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)) {
            invalidCount++;
            setInvalid(prev => [...prev,{name : item[0],message : 'Email invalid'}])
           }
          break;

          case 'password' :
            if(item[1].length < 5) {
              invalidCount++;
              setInvalid(prev => [...prev,{name : item[0],message : 'Password must contain at least 5 characters'}])
            }
          break;

          case 'firstName' :
            if(item[1].length < 8) {
              invalidCount++;
              setInvalid(prev => [...prev,{name : item[0],message : 'Name must contain 8 character'}])
            }
          break;

          case  'lastName' :
            if(item[1].length < 5) {
              invalidCount++;
              setInvalid(prev => [...prev,{name : item[0],message : 'Name must contain 5 character'}])
            }
          break;
          case 'mobile' :
            if(!item[1].match(/^([+]\d{2})?\d{10}$/)) {
              invalidCount++;
              setInvalid(prev => [...prev,{name : item[0],message : 'Invalid phone number'}])
            }
          break;

          default :

          break;
        }
    }



   return invalidCount;
}

export const colors = ['Black','Brown','Yellow','Red','Green','Blue','White','Orange','Gray'];

export const InputSelectFilter =[ 
  {
    id : 1,
    value : 'Best selling',
    content : '-sold'
  },
  {
    id : 2,
    value : 'Price, low to high',
    content : 'price'
  },
  {
    id : 3,
    value : 'Price, high to low',
    content : '-price'
  },
  {
    id : 4,
    value : 'Date, old to new ',
    content : 'createdAt'
  },
  {
    id : 5,
    value : 'Date, new to old',
    content : '-createdAt'
  },

]

export const selectAdminStatusUser = [
  {
    id : 1,
    content : 'Active',
    value :'Active'
  },
  {
    code : 2,
    content : 'Block',
    value :'Block'
  }
]

export const range = (start,end) => {
  let length = end + 1 - start;
  return Array.from({length},(_,index) => index + start)
}

export const Sidebar__Admin =[
  {
    id : 1,
    type : 'Multiphe',
    content : 'Management Products',
    icon : <MdOutlineProductionQuantityLimits />,
    submenu : [
      {
        id : 6,
        text : 'Create Product',
        path : `${path.ADMIN}/${path.CREATE__PRODUCT}`,
        icon : <MdProductionQuantityLimits />
      },
      {
        id : 7,
        text : 'Product',
        path : `${path.ADMIN}/${path.MANAGEMENT_PRODUCT}`,
        icon : <GoChecklist />
      },
      
    ]
  },
  {
    id : 2,
    path : `${path.ADMIN}/${path.MANAGEMENT_USER}`,
    type : 'Single',
    content : 'Management Users',
    icon : <MdManageAccounts />
  },
  {
    id : 3,
    path : `${path.ADMIN}/${path.MANAGEMENT_ORDER}`,
    type : 'Single',
    content : 'Management Orders',
    icon : <LiaJediOrder />
  },
  {
    id : 4,
    path : `${path.ADMIN}/${path.CREATE__PRODUCT}`,
     type : 'Single',
    content : 'Create Production',
    icon : <IoIosCreate />
  },
  {
    id : 5,
    path : `${path.ADMIN}/${path.DASHBOARD_ADMIN}`,
    type : 'Single',
    content : 'Dash Board',
    icon : <MdOutlineDashboardCustomize />
  },
]

export const SideBar__Members = [
  {
    id : 1,
    path : `${path.MEMBERS}/${path.PERSONAL}`,
    type : 'Single',
    content : 'Personal',
    icon : <MdManageAccounts />
  },
  {
    id : 2,
    path : `${path.MEMBERS}/${path.HISTORYBOUGHT}`,
    type : 'Single',
    content : 'History',
    icon : <LiaJediOrder />
  },
  {
    id : 3,
    path : `${path.MEMBERS}/${path.WISHLIST}`,
     type : 'Single',
    content : 'Wish List',
    icon : <IoIosCreate />
  },
  {
    id : 4,
    path : `${path.HOME}`,
     type : 'Single',
    content : 'Back to home',
    icon : <TfiBackLeft />
  },
]

export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  if(file) reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  // reader.readAsDataURL(file);
  reader.onerror = reject;
});





