import React ,{useCallback, useEffect, useState}from 'react'
import { useForm } from "react-hook-form";
import { InputForm,SelectForm,EditorMarkdown} from '../../components/Customs';
import './CreateProduct.scss'
import { CreateProductsByAdmin } from '../../ServicesAPI';
import {IoIosCreate} from 'react-icons/io'
import { useSelector } from 'react-redux';
import { toBase64, validate } from '../../utils/constant';
import { toast } from 'react-toastify';
const CreateProduct = () => {
  const dataCate = useSelector(state => state.app);
  const {register, handleSubmit,watch,reset,formState: { errors }} = useForm();
  const [isLoading,setLoading] = useState(false);
  const [payload,setpayload] = useState({
    description : ''
  })
  const [invalid,setInvalid] = useState([])

  const [Image,setImage] = useState({
    images : [],thumb :null
  })

  const handleGetThumb  = async(file) => {
    const response = await toBase64(file);
    if(response) setImage( prev => ({...prev,thumb : response}))

  }
  const handleGetImages  = async(file) => {
    const image = [];
    for(let item of file) {
      if(item.type !== 'image/jpeg' && item.type !== 'image/png' && item.type !== 'image/jpg') {
        toast.error('Cannot use this type !!!');
        return
      }
      else {
        const base = await toBase64(item);
        image.push(base);
      }
    }
    setImage(prev => ({...prev,images : image}));
  }

  useEffect(() =>{
    handleGetThumb(watch('thumb')[0])
  },[watch('thumb')])

  useEffect(() => {
    handleGetImages(watch('images'))
  },[watch('images')])




  const handleCreateProduct = async(data) => {
     const invalids = validate(payload,setInvalid);
     if(invalids === 0) {   
        if(data.category) data.category = dataCate?.categories?.find(item => item._id === data.category)?.title;
        const pendingData = ({...data,...payload});
        const formData = new FormData();
        for(let i of Object.entries(pendingData))  formData.append(i[0],i[1]);
        if(pendingData.thumb) formData.append('thumb',pendingData.thumb[0]);
        if(pendingData.images) {
          for(let i of pendingData.images) {
            formData.append('images',i);
          }
        }
        setLoading(true)
        const template = await CreateProductsByAdmin(formData);
        if(template.errCode === 0) {
          setLoading(false)
          reset();
          setpayload({description : ''})
          setImage(null)
          toast.success(template.message);

        }
        else {
          setLoading(false)
          toast.error('Some thing went wrong');
        }
      }
     
    }

  const changeValueDesc = useCallback((e) => {
       setpayload(e)
  },[payload])

  return (
    <div className='w-100'>
      <h3 className='d-flex align-items-center title_frame_product'>
        <span className='ps-4'> <IoIosCreate className='me-2' />Create new product</span>
      </h3>

      <div className='p-4'>
       <form onSubmit={handleSubmit(handleCreateProduct)}>
          <InputForm 
            label='Name product'
            id='title'
            register={register}
            errors={errors}
            validate={{
              required : 'Requerid this fill title'
            }}
            width='w-100 mb-4 mt-4'
          />
         <div className='d-flex justify-content-between mb-4 mt-4'>
          <InputForm 
            label='Price'
            id='price'
            type='number'
            register={register}
            errors={errors}
            validate={{
            required : `Requerid this fill price`
            }}   
            width ='w-30'
          />
          <InputForm 
              label='Qualnity'
              id='qualnity'
              type='number'
              register={register}
              errors={errors}
              validate={{
                required : 'Requerid this fill qualnity'
              }}   
              width ='w-30'
          />
          <InputForm 
              label='Color'
              id='color'
              register={register}
              errors={errors}
              validate={{
                required : 'Requerid this fill color'
              }}   
              width ='w-30'
          />
         </div>
         
         <div className='d-flex justify-content-between align-items-center mb-4 mt-4'>
          <SelectForm
            label='Category'
            id='category'
            register={register}
            errors={errors}
            validate={{
              required : 'Requerid this fill category'
            }}
            defaultValue=''
            width='w-40'
            options={dataCate.categories?.map(item => ({id: item._id,value : item.title}))}
          />
          <SelectForm
            label='Brand'
            id='brand'
            register={register}
            errors={errors}
            validate={{
              required : 'Requerid this fill category'
            }}
            defaultValue=''
            width='w-50'
            options={dataCate?.categories?.find(item =>item._id === watch('category'))?.brand?.map(ele => ({id : ele,value : ele}))}
          />
         </div>
         <EditorMarkdown 
            label='Infomation'
            name='description'
            value={payload.description}
            setChangeValue={changeValueDesc}
            invalidFields={invalid}
            setInvalidFields={setInvalid}
          />

          <div class="input-group mb-3 mt-4 w-40 d-flex align-items-center">
            <label className='me-2'>Choose Thumb</label>
            <input 
              type="file"
              class="form-control"
              id='thumb'
              {...register('thumb',{required : 'Requerid this thumb'})}
            />
         </div>
         {Image && Image.thumb && 
          <div className='w-100 images_width'>
            <img src={Image.thumb} className='h-100 ' />
          </div>
          }
            {errors['thumb'] && <div className='text-danger'>{errors['thumb']?.message}</div>}

         <div class="input-group mb-3 mt-4 w-40 d-flex align-items-center">
            <label className='me-2'>Choose Images</label>
            <input 
              type="file" 
              multiple 
              id='images'
              {...register('images',{required : 'Requerid this thumb'})}
              class="form-control"
            />
         </div>
         <div className='d-flex gap-3'>
           {Image && Image.images.length > 1 && Image.images?.map((item,index) => <div className='w-100 images_width object-fit-cover' key={index}><img src={item} className='h-100 w-100' /></div>)}
           {Image && Image.images.length  ===  1 && <div className='w-100 images_width object-fit-contain'><img src={Image?.images[0]} className='h-100' /></div>}

         </div>
            {errors['images'] && <div className='text-danger'>{errors['images']?.message}</div>}
        
        <input type='submit' className='btn btn-danger mt-4' value='Create Product'/>
       </form>

      </div>
      
      {isLoading &&  
       <div class="overlay">
          <div class="overlay__inner">
              <div class="overlay__content"><span class="spinner"></span></div>
          </div>
        </div>
      }
    
    </div>
  )
}

export default CreateProduct