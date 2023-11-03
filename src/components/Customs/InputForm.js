import React ,{memo}from 'react'

const InputForm = ({label,value,disabled,register,errors,validate,id,type = 'text',defaultValue,width,placeHolder}) => {
  return (
    <div className={width ? `form-outline ${width}` : 'form-outline'}>
        {label && <label className='form-label' for={id}>{label}</label>}
        <input
            type={type}
            id = {id}
            value={value}
            disabled={disabled}
            {...register(id,validate)}
            defaultValue={defaultValue}
            placeholder={placeHolder && placeHolder}
            className='form-control'
        />
        {errors[id] && <span className='text-danger'>{errors[id]?.message}</span>}
    </div>
  )
}

export default memo(InputForm)