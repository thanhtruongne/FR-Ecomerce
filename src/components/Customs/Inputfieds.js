import React from 'react';

import './Inputfieds.scss'
const Inputfieds  =({value,nameKey,type,setValue,css,col,setInvalidled,invalidFileds}) => {
       let captiWord = nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1) 
  return (   
    <React.Fragment>
        <input
        type={type || 'text'}
        value={value}
        placeholder={captiWord}
        onChange={(e) => setValue(prev => ({...prev,[nameKey] : e.target.value}))}
        onBlur={() =>setInvalidled && setInvalidled([])}
        className={css ? `${col} form-control css ` : ` ${col} form-control `}
        required
        />
      {invalidFileds?.some(item => item.name === nameKey) && 
      <small className='text-danger'>
      {invalidFileds?.find(item => item.name === nameKey)?.message}
      </small>}
    </React.Fragment>
  )
}

export default Inputfieds;