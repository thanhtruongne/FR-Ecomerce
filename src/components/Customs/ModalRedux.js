import React from 'react'
import { useDispatch } from 'react-redux'
import { showModal } from '../../stores/appSlice'

const ModalRedux = ({children}) => {
    const dispatch = useDispatch();
  return (
    <div onClick={() => dispatch(showModal({isOpenModal : false,modalChildren : null}))} 
    className='position-absolute d-flex justify-content-center align-items-center top-0 start-0 end-0 bottom-0 bg-overplay'> 
        {children}
    </div>
  )
}

export default ModalRedux