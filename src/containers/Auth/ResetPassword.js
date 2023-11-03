import React,{useState,useCallback} from 'react';
import './ResetPassword.scss'
import { Inputfieds,Button } from '../../components/Customs';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { resetPasswordToken } from '../../ServicesAPI/User';
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';
const ResetPassword  =() => {
  const {token} = useParams();
  const navigate =useNavigate();
  const [password,setPasswordChange] = useState('');

  const HandleSubmitLog =useCallback(async() => {
     if(password) {
       const reset = await resetPasswordToken(token,{password : password});
       if(reset) {
        Swal.fire(reset.errCode === 0 ? 'Success' : 'Fail',reset.message,reset.errCode === 0 ? 'success' : 'error')
        .then(() => {
          navigate(`${path.LOGIN }`)
        })
       }
     }
  },[password])

  return (
    <div className='ResetPass position-relative w-100 d-flex justify-content-center align-items-center'>

        <div className='position-absolute sub_item_log'>
            <div className='template'>
              <div className='text-Emphasis text-center mb-4'><h2>Reset-Password</h2></div>

              <div className='form-group col-lg-12 mb-4  position-relative'>
                    <input
                    type='text'
                    onChange={(e) => setPasswordChange(e.target.value)}
                    value={password}
                    className='form-control'
                    placeholder='Type new password here'
                    />
                </div>
                <Button 
                  name='Reset Password'
                  handleOnClick={HandleSubmitLog}
                  style='btn-primary btn w-100'
                />
            </div>
        </div>
    </div>
  )
}

export default ResetPassword;