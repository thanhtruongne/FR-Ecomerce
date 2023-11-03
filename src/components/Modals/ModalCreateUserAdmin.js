
import React,{memo,useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {MdCreateNewFolder} from 'react-icons/md'
import { Inputfieds } from '../Customs';
import { validate } from '../../utils/constant';
const ModalCreateUserAdmin  =({CreateUser,isOpen,setOpen}) => {
  const [dataItem,setdataItem] = useState({
    firstName : '',
    lastName : '',
    email : '',
    mobile : '',
    password : ''
  })
  const [isInvalid,setInvalid] = useState([]);
   
  const handleSubmitCreate = async() => {
    const invalid = validate(dataItem,setInvalid);
    if(invalid === 0) CreateUser(dataItem);
  }


  const toggle = () => setOpen(!isOpen);
   return  (
    <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}><MdCreateNewFolder className='me-2'/> Create new user </ModalHeader>
                <ModalBody>
                    <div className='row col-lg-12 justify-content-between align-items-center'>
                        <div class="mb-3 7">
                           <Inputfieds col-lg-
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
                    <Inputfieds 
                        value={dataItem?.email}
                        setValue={setdataItem}
                        invalidFileds={isInvalid}
                        setInvalidled={setInvalid}
                        nameKey='email' /> 
                    </div>
                    <div class="mb-3 col-lg-12">
                    <Inputfieds 
                        value={dataItem?.password}
                        type='password'
                        setValue={setdataItem}
                        invalidFileds={isInvalid}
                        setInvalidled={setInvalid}
                        nameKey='password' /> 
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
                onClick={() => handleSubmitCreate()}
                >
                    Create
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    </div>
   )
}

export default memo(ModalCreateUserAdmin);