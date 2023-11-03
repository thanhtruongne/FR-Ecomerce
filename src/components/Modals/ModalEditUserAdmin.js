import { current } from '@reduxjs/toolkit';
import React,{memo,useEffect,useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {AiFillEdit} from 'react-icons/ai';
import _  from 'lodash';
import { Inputfieds,InputSelect } from '../Customs';
import { validate,selectAdminStatusUser } from '../../utils/constant';
const ModalEditUserAdmin  =({updateUser,currentUser,isOpen,setOpen}) => {
  const [dataItem,setdataItem] = useState({
    _id : '',
    firstName : '',
    lastName : '',
    email : '',
    mobile : '',
    password : '',
  })
  const [isBlocked , setBlocked] = useState({isBlocked : false});
  const [isInvalid,setInvalid] = useState([]);
  
  useEffect(() => {
    if(!_.isEmpty(currentUser)) {
        setdataItem({
          _id  : currentUser?._id,
          firstName : currentUser?.firstName,
          lastName : currentUser?.lastName,
          email : currentUser?.email,
          mobile : currentUser?.mobile,
          password : currentUser?.password,
        })
        setBlocked({isBlocked : currentUser?.isBlocked})
    }
  },[currentUser])

  const handleSubmitEdit = async() => {
    const CountInValid = validate(dataItem,setInvalid);
    if(CountInValid === 0) {
        const q = {...dataItem,...isBlocked};
       await updateUser(q);
    }
  }

  const handleChangeActive =(e) => {
    if(e === 'Active') setBlocked(prev => ({...prev,isBlocked : false}));
    if(e === 'Block') setBlocked(prev => ({...prev,isBlocked : true}));
  }


  const toggle = () => setOpen(!isOpen);
   return  (
    <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}><AiFillEdit className='me-2'/> : {dataItem?.email} </ModalHeader>
                <ModalBody>
                    <div className='row col-lg-12 justify-content-between align-items-center'>
                        <div class="mb-3 col-lg-7">
                           <Inputfieds 
                            value={dataItem?.firstName}
                            setValue={setdataItem}
                            invalidFileds={isInvalid}
                            setInvalidled={setInvalid}
                            nameKey='firstName' />
                        </div>
                        <div class="mb-3 col-lg-5">
                        <Inputfieds 
                            value={dataItem?.lastName}
                            setValue={setdataItem}
                            invalidFileds={isInvalid}
                            setInvalidled={setInvalid}
                            nameKey='lastName' /> 
                        </div>
                    </div>       
                    <div class="mb-3 col-lg-12">
                        <input type="email" class="form-control"  value={dataItem?.email} disabled/>
                    </div>
                    <div class="mb-3 col-lg-12">
                        <input type="password" class="form-control" value={dataItem?.password} disabled />
                        
                    </div>
                    <div class="mb-3 col-lg-12">
                    <InputSelect 
                        value={isBlocked?.isBlocked === false ? 'Active' : 'Block'}
                        changeValue={handleChangeActive}
                        options={selectAdminStatusUser}
                        css
                      /> 
                    </div>
                    <div class="mb-3 col-lg-12">
                    <Inputfieds 
                        value={dataItem?.mobile}
                        setValue={setdataItem}
                        invalidFileds={isInvalid}
                        setInvalidled={setInvalid}
                        nameKey='mobile' /> 
                    </div>
    
                </ModalBody>
            <ModalFooter>
                <Button
                color="info"
                onClick={() => handleSubmitEdit()}
                >
                    Update
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    </div>
   )
}

export default memo(ModalEditUserAdmin);