import React , {useEffect, useState} from 'react'
import './ProfileUser.scss'
import {IoIosCreate} from 'react-icons/io'
import { useForm } from "react-hook-form";
import { InputForm,SelectForm } from '../../components/Customs';
import { useDispatch, useSelector } from 'react-redux';
import { toBase64 } from '../../utils/constant';
import { UpdateUser } from '../../ServicesAPI';
import { toast } from 'react-toastify';
import { getcurrentUser } from '../../stores/asyncActions';

const ProfileUser = () => {
  const {register, handleSubmit,watch,reset,formState: { errors, isDirty }} = useForm();
  const {isLoggedIn , current} = useSelector(state => state.user);
  const [Image,setImage] = useState(null);
  const dispatch = useDispatch();


  const handleUpdatePersonal = async(data) => {
    const formData = new FormData();
    if(data.avatar.length > 0) {
      formData.append('avatar',data.avatar[0]);
    }
    delete data.avatar;
    for(let i of Object.entries(data)) formData.append(i[0],i[1]);
    const Sub = await UpdateUser(formData);
    if(Sub.errCode === 0) {
      toast.success(Sub.message);
      dispatch(getcurrentUser());
    }
    else {
      toast.error('Some thing went wrong !!!');
    }

  }
  
  const handlePreviewAvatar = async(avatar) => {
     const base64 = await toBase64(avatar);
     if(base64) setImage(base64);
  }

  useEffect(() => {
   if(watch('avatar')) handlePreviewAvatar(watch('avatar')[0])
  },[watch('avatar')])
  

  useEffect(() => {
     reset({
      firstName : current?.firstName,
      lastName : current?.lastName,
      email : current?.email,
      mobile : current?.mobile,

     })
     setImage(current?.avatar);
  },[current,isLoggedIn])

  return (
    <div className='personal w-100 h-100'>
      <h3 className='d-flex align-items-center '>
        <span className='ps-4'> <IoIosCreate className='me-2' />Personal</span>
      </h3>

      
      <div className='p-4 mx-4'>
       <form onSubmit={handleSubmit(handleUpdatePersonal)}>
          <InputForm 
            label='First Name'
            id='firstName'
            register={register}
            errors={errors}
            validate={{
              required : 'Requerid this fill name'
            }}
            width='w-100 mb-4 mt-4'
          />
          <InputForm 
            label='Last Name'
            id='lastName'
            register={register}
            errors={errors}
            validate={{
            required : `Requerid this fill name`
            }}   
            width ='w-100  mb-4 mt-4'
          />
          <InputForm 
              label='Email'
              id='email'
              register={register}
              errors={errors}
              validate={{
                required : 'Requerid this fill email',
                 pattern : {
                     value : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                     message :'Email invalid'
                 }
              }}   
              width ='w-100  mb-4 mt-4'
          />
              <InputForm 
              label='Moblie'
              id='mobile'
              register={register}
              errors={errors}
              validate={{
                required : 'Requerid this fill mobile',
                pattern : {
                  value : /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                  message :'Value must be a number phone'
                }
              }}   
              width ='w-100  mb-4 mt-4'
          />
         
            <div className='temp_img'>
              <label className='form-label'>Choose Avatar</label>
              <label htmlFor='file'> 
              {}
              <img className='w-100 h-100 object-fit-cover' src={Image} />
              </label>
              <input 
              type="file" 
              id='file'
              {...register('avatar')}
              hidden
              className='w-100 h-100'
              />  
            </div>
            {isDirty &&
              <div className='mt-4 me-4 pe-4 text-end'>
                <input type='submit' className='btn btn-danger' value='Update Personal'/>
              </div> 
            }
           
            
       
       </form>

      </div>
    
    </div>
  )
}

export default ProfileUser