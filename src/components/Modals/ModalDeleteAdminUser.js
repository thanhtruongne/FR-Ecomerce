import React,{memo,useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const ModalDeleteAdminUser  =({isDeleteForce,DeleteForce,DeleteUser,id,isOpen,setOpen}) => {
   
    const handleDeleteUsers = () => {
        DeleteUser(id)
    }

  const toggle = () => setOpen(!isOpen);
   return  (
    <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{isDeleteForce ? 'Xóa vĩnh viễn (Delete Force)' : 'Xóa (Delete Soft)'}</ModalHeader>
                <ModalBody>
               {isDeleteForce ? 'Xóa vĩnh viễn sẽ không thể khôi phục ?' : ' Bạn có chắc muốn xóa user này không ?'}

                </ModalBody>
            <ModalFooter>
                <Button 
                onClick={() => handleDeleteUsers()}
                color="danger">
                    {isDeleteForce ? 'Xóa vĩnh viễn' : 'Xóa'}
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Hủy
                </Button>
            </ModalFooter>
        </Modal>
    </div>
   )
}

export default memo(ModalDeleteAdminUser);