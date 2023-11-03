import axios from '../axios'

 const getproducts = (data) => {
   return axios.get(`/api/products/`,{params : data})
 }

 const getSingleProduct = (uuid) => {
  return axios.get(`/api/products/${uuid}`);
 }

 const RatingsProduct = (data) => {
  return axios.put('/api/products/ratings',data)
 }
 
 const CreateProductsByAdmin = (data) => {
  return axios.post('/api/products/',data);
 }

 const UpdateProductByAdmin = (data,uuid) => {
  return axios.put(`/api/products/updates/${uuid}`,data);
 }

 const DeleteProductByAdmin = (uuid) => {
  return axios.delete(`/api/products/${uuid}`);
 }

 const CreateVariantsProduct = (uuid,data) => {
  return axios.post(`/api/products/variants/${uuid}`,data)
 }
 
 const CreateOrder = (data) => {
  return axios.post('/api/order/',data);
 }
 export {
    getproducts,
    getSingleProduct,
    RatingsProduct,
    CreateProductsByAdmin,
    UpdateProductByAdmin,
    DeleteProductByAdmin,
    CreateVariantsProduct,
    CreateOrder
 }