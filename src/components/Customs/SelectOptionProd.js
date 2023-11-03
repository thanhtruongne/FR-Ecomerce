import React from 'react';
import './SelectOptionProd.scss'
import { withbaseComponent } from '../../hocs';
const SelectOptionProd  =({icon,disabled,type,navigate}) => {

  

  return (
    <button disabled={disabled  ? true : false} className='grid_icons'>
        {icon}
    </button>
  )
}

export default withbaseComponent(SelectOptionProd) ;