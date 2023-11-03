import React from 'react';

const Button  =({name,handleOnClick,style,iconBefore,iconAfter}) => {

  return (
   <button 
   type='button' 
   onClick={() => handleOnClick && handleOnClick()}
   className={style ? style :'btn w-100 bg-danger text-light mt-2'}
   >
      {iconBefore}
      <span>{name}</span>
      {iconAfter}
   </button>
  )
}

export default Button;