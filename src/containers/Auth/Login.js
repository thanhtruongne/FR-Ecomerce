import React,{useState,useCallback} from 'react';
import './Login.scss';
import { Inputfieds,Button } from '../../components/Customs';
import { ApiRegister,ApiLogin,forgotPasswordToken } from '../../ServicesAPI/User';
import Swal from 'sweetalert2';
import { path,validate } from '../../utils/constant';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../stores/userSlice';
const Login  =() => {
  const dispatch = useDispatch();
  const [isLoading,setLoading] = useState(false);
  const [isResisgter,setResisgter] = useState(false);
  const [isforgotpassword,setforgotpassword] = useState(false);
  const [payload,setpayload] = useState({
    email : '',
    firstName :'' ,
    lastName :'' ,
    mobile  : '',
    password : ''
  })
  const [params] = useSearchParams();
  const [invalid,setInvalid] = useState([]);
  const navigate = useNavigate();
  
  const resetValue =() => {
    setpayload({
      email : '',
      firstName :'' ,
      lastName :'' ,
      mobile  : '',
      password : ''
     })
  }
  
  const HandleSubmitLog = useCallback(async() => {
    const {firstName,lastName,mobile, ...data} = payload;
    const invalidFileds = isResisgter ? validate(payload,setInvalid) : isforgotpassword ? validate(data.email,setInvalid) : validate(data,setInvalid);
    if(invalidFileds === 0) {
      if(isResisgter) {
        setLoading(true)
        // Đăng ký
        const response  = await ApiRegister(payload);
        setLoading(false)
       Swal.fire(response?.errCode === 0 ? 'Register Success':'Some thing wrong',response?.message,response?.errCode === 0 ? 'success':'error')
       .then(() => {
         setResisgter(false);
         resetValue();
       })
      }
      if(isforgotpassword) {
        let resetpass = await forgotPasswordToken({email : data.email});
        setLoading(false)
        Swal.fire(resetpass.errCode === 0 ? 'Success' : 'Fail', resetpass.message ,resetpass.errCode === 0 ? 'success' : 'error')
        .then(() => {
          if(resetpass.errCode === 0) {
            resetValue();   
          }
            
        })
      }
      else {
        setLoading(true);
         const DataLog = await ApiLogin(data);
         setLoading(false);
        Swal.fire(DataLog?.errCode === 0 ? 'Login Success':'Some thing went wrong',DataLog?.message,DataLog?.errCode ===0 ?'success':'error')
        .then(() => {
          if(DataLog.errCode === 0) {
              dispatch(login({
              isLoggedIn : true,
              token : DataLog?.accessToken,
              current : DataLog?.userData,
              cart : DataLog?.cartDetail
            }))
             resetValue();
             navigate(params?.get('redirect') ? `${params.get('redirect')}` : `${path.HOME}`);
            //  window.location.reload();
           }  
        })
      }
    }
  },[payload,isResisgter,isforgotpassword])

  


  return (
    <div className='Login position-relative w-100 d-flex justify-content-center align-items-center'>
  
        <div className='position-absolute sub_item_log'>
            <div className='template'>
              <div className='text-Emphasis'><h2>{ isResisgter ? 'Resisgter' : isforgotpassword ? 'Send mail reset password' : 'Login'}</h2></div>

              <div className='input_form'>
                {isResisgter && 
                <div className='col-lg-12 mb-2 d-flex justify-content-between align-items-center1'>
                     <div className='form-group col-sm-5 mb-4 '>
                        <Inputfieds 
                          value={payload.firstName}
                          setValue={setpayload}
                          nameKey='firstName'
                          css
                          setInvalidled={setInvalid}
                          invalidFileds={invalid}
                        />
                     </div>      
                      <div className='form-group col-sm-6 mb-4'>  
                        <Inputfieds 
                          value={payload.lastName}
                          setValue={setpayload}
                          nameKey='lastName'
                          css    
                          setInvalidled={setInvalid}
                          invalidFileds={invalid}          
                        />
                      </div>
                </div>
                }
                <div className='form-group col-lg-12 mb-4  position-relative'>
                    <Inputfieds 
                    value={payload.email}
                    nameKey='email'
                    setValue={setpayload}
                    css 
                    setInvalidled={setInvalid}
                    invalidFileds={invalid}
                    />
                </div>
                  
                {isResisgter &&
                <div className='form-group col-lg-12 mb-4  position-relative'>
                    <Inputfieds 
                    value={payload.mobile}
                    nameKey='mobile'
                    setValue={setpayload}
                    css 
                    setInvalidled={setInvalid}
                    invalidFileds={invalid}
                    />
                </div>
                  }
              
                {isforgotpassword === true  ? '' : 
                <div className='form-group col-lg-12 mb-4  position-relative'>
                    <Inputfieds
                     value={payload.password}
                     setValue={setpayload}
                     nameKey='password'
                     type='password'
                     css 
                      setInvalidled={setInvalid}
                          invalidFileds={invalid}
                    />
                </div>
                }
              </div>

             <Button 
               name={isResisgter ? 'Resisgter' :isforgotpassword ? 'Reset password' : 'Login'}
               handleOnClick={HandleSubmitLog}
             />

             <div className='d-flex justify-content-between mt-3 '>
              {isResisgter || isforgotpassword ? 
              <span className='btn  bg-danger text-light mt-2 w-25'
              onClick={() => {setResisgter(false);setforgotpassword(false)}}
              >Back</span>
               : <span className='fs-6'
               onClick={() => setforgotpassword(true)}
               >{isforgotpassword ? '' : 'Forgot Password'}</span>}
             
              <span className='fs-6'
               onClick={()=> setResisgter(true)}
              >{isResisgter ? '' : isforgotpassword ? '' :'Create Account'}</span>
             </div>
            </div>
        </div>

        {isLoading  &&
        <div class="overlay">
          <div class="overlay__inner">
              <div class="overlay__content"><span class="spinner"></span></div>
          </div>
        </div>
        }
       
    </div>
  )

}

export default Login;