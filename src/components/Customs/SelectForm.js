import React from 'react'

const SelectForm = ({label,value,disabled,id,register,errors,validate,defaultValue,options,width}) => {
  return (
    <div className={width ? `${width}` : 'w-100'}>
      {label && <label className='form-label'>{label}</label>}
      <select 
       id={id}
       className='form-select'
       defaultValue={value}
       {...register(id,validate)}
       >
       <option value=''>Choose {id}</option>
       {options && options.map(item => 
       <option value={item.id}>{item.value}</option>
        )}
      </select>
      {errors[id] && <span className='text-danger'>{errors[id]?.message}</span>}
    </div>
  )
}

export default SelectForm