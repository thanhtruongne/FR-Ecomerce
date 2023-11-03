import axios from '../axios';


const ApiRegister = (data) => {
    return axios.post('/api/user/resisgter',data);
}

const ApiLogin = (data) => {
    return axios.post('/api/user/login',data);
}

//Delete Accuracy_email_data_token Registe
const DeleteRegisteEmailToken = (token) => {
   return axios.delete(`/api/user/delete_accuracy_email_token/${token}`);
}

const forgotPasswordToken = (data) => {
    return axios.post(`/api/user/forgot-password`,data)
}

const resetPasswordToken =(token,data) => {
  return axios.put(`/api/user/reset-password/${token}`, data);
}

const getcurrentUser = () => {
    return axios.get('/api/user/current');
}

const getAllUser = (data) => {
    return axios.get('/api/user/',{params : data});
}

const createUser = (data) => {
    return axios.post('/api/user/create-user',{data : data});
}



const trashCourse = () => {
    return axios.get('/api/user/trash-user-course');
}

const deleteUser = (uuid) => {
    return axios.delete(`/api/user/${uuid}/delete`);
}

const DeleteForce =(uuid) => {
    return axios.delete(`/api/user/delete-force/${uuid}`);
}

const DeleteAllUserCheckBox = (uuid) => {
    return axios.delete(`/api/user/delete-all-checkbox`,{data : uuid});
}

const restoreUser = (uuid) => {
    return axios.post(`/api/user/restore/${uuid}`);
}

const getUserByIdAdmin = (uuid) => {
   return axios.get(`/api/user/get-user/${uuid}`,);
}

const UpdateUserByAdmin = (uuid,data) => {
   return axios.put(`/api/user/${uuid}`,data);
}

const UpdateUser = (data) => {
    return axios.put('/api/user/current',data);
}

const UpdateCart = (data) => {
    return axios.put('/api/user/cart',data);
}

const ChangeQualnityCart = (data) => {
    return axios.put('/api/user/change-cart',data);
} 

const removeCart = (id) => {
    return axios.put(`/api/user/remove-cart/${id}`);
}

const HistoryCart = () => {
    return axios.get('/api/order/all');
}

const AddWishList = (id) => {
    return axios.post(`/api/user/add-wishlist/${id}`);
}


export {
    ApiRegister,ApiLogin,
    DeleteRegisteEmailToken,
    forgotPasswordToken,
    resetPasswordToken,
    getcurrentUser,getAllUser,
    trashCourse,deleteUser,
    restoreUser,getUserByIdAdmin,
    UpdateUserByAdmin,DeleteForce,
    DeleteAllUserCheckBox,
    createUser,ChangeQualnityCart,
    UpdateUser,removeCart,
    UpdateCart,HistoryCart,
    AddWishList
}