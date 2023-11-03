import React,{memo} from 'react';

const HandleQuanity  =({quanity,handleQuanityCount}) => {



  return (
    <div className='math_count d-flex align-items-center justify-content-between'>
        <button className='minus btn btn-danger'
        onClick={() => handleQuanityCount('minus')}
        >-</button>
        <div className='value_quanity'>{quanity}</div>
        <button className='plus btn btn-danger'
        onClick={() => handleQuanityCount('plus')}
        >+</button>
    </div>
  )
}

export default memo(HandleQuanity);