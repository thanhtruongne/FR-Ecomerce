import React,{memo,useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Rating,Box } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    1: 'Quá tệ',
    2: 'Tệ',
    3: 'Ổn',
    4: 'Tốt',
    5: 'Rất tót',
  };

const ModalComment  =({createComment,productName,isOpen,setOpen}) => {
  const [Payload,setPayload] = useState({
    text : '',star : 3
  })
  const [hover,setHover]  = useState(0.5)
  const handleCreateNewComment = () => {
      createComment(Payload)
  }

  const toggle = () => setOpen(!isOpen);
   return  (
    <div>
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Đánh giá {productName}</ModalHeader>
                <ModalBody>
                    <div>
                      <textarea 
                        type='text'
                        className='form-control mb-3'
                        value={Payload.text}
                        onChange={(e) => setPayload(prev => ({...prev,text : e.target.value}))}
                      />
                    </div>
                    <div className='rating_star'>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                        >
                        <Rating
                            name="hover-feedback"
                            value={Payload?.star}
                            precision={1}
                            onChange={(event, newValue) => {
                            setPayload(prev => ({...prev,star : newValue}));
                            }}
                            onChangeActive={(event, newHover) => {
                            setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {Payload.star !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : Payload?.star]}</Box>
                        )}
                    </Box>
                    </div>

                </ModalBody>
            <ModalFooter>
                <Button 
                onClick={() => handleCreateNewComment()}
                color="danger">
                    Create Comment
                </Button>{' '}
                <Button color="secondary" onClick={toggle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    </div>
   )
}

export default memo(ModalComment);