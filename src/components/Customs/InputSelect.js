import React,{memo, useEffect} from 'react';
import './InputSelect.scss'

const InputSelect  =({value,changeValue,options,css,name}) => {
  return (
  <select className={css ? 
    'form-select form-select-sm collection_select w-100'
    : 'collection_select w-100'}
     value={value} onChange={(e) => changeValue(e.target.value)}>
     <option value=''>Choose event</option>
     {options && options.map((item,index) => 
        <option key={item.id} value={item.content}
        >{item.value}</option>
      )}
  </select>

  )
}

export default memo(InputSelect);