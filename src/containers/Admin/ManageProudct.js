import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { InputForm,Paganation } from '../../components/Customs';
import './ManageProudct.scss'
import { MdOutlineManageSearch} from 'react-icons/md'
import { getproducts,DeleteProductByAdmin } from '../../ServicesAPI';
import UpdateProductyAdmin from './UpdateProductyAdmin';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import useDebounce from '../../Hook/useDebounce';
import _ from 'lodash';
import Swal from 'sweetalert2';
import {FaSortUp,FaSortDown} from 'react-icons/fa';
import {RiDeleteBin2Fill,RiImageEditFill} from 'react-icons/ri';
import {AiFillEdit} from 'react-icons/ai';
import { toast } from 'react-toastify';
import CreateVariantProduct from './CreateVariantProduct';
const ManageProudct = () => {
  const {register, handleSubmit,watch,reset,formState: { errors }} = useForm();
  const [DataResponse ,setData]= useState({data : [],counts : null});
  const [sort,setSort] = useState(null);
  const [isEditProduct,setEditProduct] = useState(false);
  const [EditData,setDataEdit] = useState(null);
  const [DataVariants,setDataVariants] = useState(null);
  const [UpdateVariants,setVariants] = useState(false);
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();


  const handleSearchingdata =(data) => {
  }

  
  const fetchDataProducts = async(params) => {
    const response = await getproducts({...params,limit : process.env.REACT_APP_LIMIT});
    if(response.status === true) {
      setData({data : response.response,counts : response.count})
    }
  }

  const handleSortPrice =(type) => {
    const query = Object.fromEntries([...params]);
    if(type === 'asc'){
       query.sort = 'price'
    }
    if(type === 'desc'){
      query.sort = '-price'
    }
    navigate({
      pathname : location?.pathname,
      search : createSearchParams(query).toString()
    })
  }

  useEffect(() => {
    fetchDataProducts();
  },[])

  useEffect(() => {
    fetchDataProducts()
  },[isEditProduct,UpdateVariants])
  
  
  let debounce = useDebounce(watch('search'),500)
  useEffect(() => {
    const query = Object.fromEntries([...params]);
   

    if(!_.isEmpty(watch('search')))  {
      query.search = watch('search');
      navigate({
        pathname:location?.pathname,
        search  :createSearchParams(query).toString()
      })
    }
    else {
      params.delete('search')
      navigate({
        pathname:location?.pathname,
        search  :createSearchParams(query).toString()
      })
    }
  },[debounce,watch('search')])


  
  useEffect(() => {
   const query = Object.fromEntries([...params]);
   
   const q = {...query};
   fetchDataProducts(q);

  },[params])

  const handleDeleteProduct = (id) => {
     Swal.fire({
      title : 'Xóa sản phẩm !!!',
      text : 'Bạn có muốn xóa sản phẩm này không ?',
      icon : 'warning',
      showCancelButton : true,
     }).then(async(value) => {
      if(value.isConfirmed) {
        const response = await DeleteProductByAdmin(id);
        if(response.errCode === 0){
          toast.success(response.message);
          fetchDataProducts()
        } 
        else toast.error('Fail to Delete product');
      }
     })
    
  }

  
  return (
    <div className='w-100 management_product'>
      <header className='pb-3 pt-3 d-flex justify-content-between align-items-center'>
        <h3 className='d-flex align-items-center ms-3'>
          {!isEditProduct &&  <MdOutlineManageSearch className='me-1 ' />}
          {isEditProduct ? 'Update Product' :UpdateVariants ? 'Create Variants' : 'Management Product'}</h3>
        {(isEditProduct || UpdateVariants) && <span className='btn-link me-4 pe-4' onClick={() => {setEditProduct(false); setVariants(false)}}>Back</span>}
      </header>

      {isEditProduct
       ? <UpdateProductyAdmin EditData={EditData} /> :
       UpdateVariants  ? <CreateVariantProduct OriginalsProduct={DataVariants} />
       :  
       <div>
       <div className='searching_product_name mt-4 d-flex justify-content-end'>
         <form onSubmit={handleSubmit(handleSearchingdata)} className='w-40 h-100 me-4'>
           <InputForm 
           id='search'
           register={register}
           errors={errors}
           width='w-100 me-4'
           placeHolder='Title ,price ,brand and category'
           />
         </form>
       </div>
       <div className='wrapper_products_table mt-4'>
       <table class="table">
   <thead>
     <tr className='table-secondary'>
       <th scope="col">Order</th>
       <th scope="col">Thumb</th>
       <th scope="col">Title</th>
       <th scope="col">Brand</th>
       <th className='position-relative' scope="col">Price <div className='position-absolute tech_product_sort ms-2 d-flex flex-column'>
         <FaSortUp size={20} onClick={() => handleSortPrice('asc')}/>
         <FaSortDown size={20} onClick={() => handleSortPrice('desc')}/>
         </div></th>
        <th scope="col">Variants</th>
       <th scope="col">Category</th>
       <th scope="col">Qualnity</th>
       <th scope="col">Sold</th>
       <th scope="col">Actions</th>
     </tr>
   </thead>
   <tbody>
     {DataResponse && DataResponse?.data && DataResponse?.data.map((item,index) => 
       <tr className='h-100' key={index}>
         <th scope="row">{index + 1}</th>
         <td>
           <div className='images_product'>
             <img src={item?.thumb} className='w-100 h-100' />
           </div>
           </td>
         <td>{item.title}</td>
         <td>{item.brand}</td>
         <td>{item.price}</td>
         <td className='text-primary'>{item?.variants && item.variants.length}</td>
         <td>{item.category}</td>
         <td>{item.qualnity}</td>
         <td>{item.sold}</td>
         <td>
          <button className='btn btn-link' onClick={() => handleDeleteProduct(item._id)}><RiDeleteBin2Fill size={20}/></button>
          <button className='btn btn-link' onClick={() => {setEditProduct(true);setDataEdit(item)}}><AiFillEdit size={20}/></button>
          <button className='btn btn-link' onClick={() => {setVariants(true); setDataVariants(item)}}><RiImageEditFill size={20}/></button>
         </td>

       </tr>
       )}
   
   </tbody>
       </table>
       </div>
           <Paganation totalCount={DataResponse?.counts} />
     </div>
      
      }
     
    </div>
  )
}

export default ManageProudct