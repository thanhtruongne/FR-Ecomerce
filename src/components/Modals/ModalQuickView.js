
import React,{memo} from 'react';
import {Modal, ModalBody } from 'reactstrap';
import QuickView from '../../containers/Public/QuickView';
const ModalQuickView  =({product,isOpen,setOpen}) => {

  const toggle = () => setOpen(!isOpen);
   return  (
    <div>
        <Modal size='xl' isOpen={isOpen} toggle={toggle}>
                <ModalBody>
                   <QuickView product={product} />
                </ModalBody>
        </Modal>
    </div>
   )
}

export default memo(ModalQuickView);