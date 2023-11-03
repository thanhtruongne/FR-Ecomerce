import React ,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import './CreateVariantProduct.scss'
import { InputForm } from '../../components/Customs';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { CreateVariantsProduct } from '../../ServicesAPI';
import { toBase64 } from '../../utils/constant';

const CreateVariantProduct = ({OriginalsProduct}) => {
    const {register, handleSubmit,watch,reset,formState: { errors }} = useForm();
    const [isLoading,setLoading] = useState(false);
    const [invalid,setInvalid] = useState([])
  
    const [picture,setImage] = useState({
      images : [],thumb :null
    })
    
    const handleUpdateProduct = async(data) => {
      if(data?.color === OriginalsProduct?.color && OriginalsProduct?.variants?.some(item => item.color === data?.color?.trim().toUpperCase())) {
        toast.warn('Variants could not be the same color !!!');
        return
      }
      else {
        const formData = new FormData();
        for(let i of Object.entries(data)) formData.append(i[0],i[1]);
        if(data.thumb) formData.append('thumb',data.thumb[0]);
        if(data.images) {
          for(let i of data.images) formData.append('images',i);
        } 
        const response  = await CreateVariantsProduct(OriginalsProduct?._id,formData);
        if(response.errCode === 0) {
          toast.success(response.message);
          reset()
          setImage({images : [],thumb : ''})
        }
        else toast.error('Some thing went Wrong')
      }
       
    } 

    useEffect(() => {
      reset({
          title : OriginalsProduct?.title || '',
          price : OriginalsProduct?.price || '',
          color : OriginalsProduct?.color || '',
          qualnity :OriginalsProduct?.qualnity || '',
      })
    },[OriginalsProduct])
    
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
        if(watch('thumb') instanceof FileList && watch('thumb').length > 0)  handleGetThumb(watch('thumb')[0])
    },[watch('thumb')])

    useEffect(() => {
    if(watch('images') instanceof FileList && watch('images').length > 0)  handleGetImages(watch('images'))
    },[watch('images')])




  return (
    <div className='w-100'>
    <div className='p-4'>
     <form onSubmit={handleSubmit(handleUpdateProduct)}>
        <InputForm 
          label='Orginals Title'
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
          label='Originals Price'
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
            label='Originals Qualnity'
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
            label='Originals Color'
            id='color'
            register={register}
            errors={errors}
            validate={{
              required : 'Requerid this fill color'
            }}   
            width ='w-30'
        />
       </div>  

        <div class="input-group mb-3 mt-4 w-40 d-flex align-items-center">
          <label className='me-2'>Choose Thumb</label>
          <input 
            type="file"
            class="form-control"
            id='thumb'
            {...register('thumb',{required : 'Requried this thumb'})}
          />
       </div>
       {picture && picture?.thumb && 
        <div className='w-100 images_width'>
          <img src={picture?.thumb} className='h-100 ' />
        </div>
        }
          {errors['thumb'] && <div className='text-danger'>{errors['thumb']?.message}</div>}

       <div class="input-group mb-3 mt-4 w-40 d-flex align-items-center">
          <label className='me-2'>Choose Images</label>
          <input 
            type="file" 
            multiple 
            id='images'
            {...register('images',{required : 'Requried this images'})}
            class="form-control"
          />
       </div>
       <div className='d-flex gap-3'>
         {picture?.images.length > 1 && !_.isEmpty(picture?.images) && picture?.images?.map((item,index) => <div className='w-100 images_width object-fit-cover' key={index}><img src={item} className='h-100 w-100' /></div>)}
         {picture?.images.length  ===  1 && <div className='w-100 images_width object-fit-contain'><img src={picture?.images[0]} className='h-100' /></div>}

       </div>
          {errors['images'] && <div className='text-danger'>{errors['images']?.message}</div>}
      
      <input type='submit' className='btn btn-danger mt-4' value='Create variants of product'/>
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

export default CreateVariantProduct