import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../ServicesAPI/Categories";
import * as apiUser from '../ServicesAPI/User'

export const getcategories = createAsyncThunk('app/categories',async(data,{rejectWithValue}) => {
   const response =await api.Categories();
   // Nếu bị lỗi thì reject
   if (response.status < 200 || response.status >= 300) {
    return rejectWithValue(response);
    }

    // Còn không thì trả về dữ liệu
    return response.Allcategories;
})

export const getcurrentUser = createAsyncThunk('user/current',async(data,{rejectWithValue}) => {
    const response =await apiUser.getcurrentUser();
    // Nếu bị lỗi thì reject
    if (response.status < 200 || response.status >= 300) {
     return rejectWithValue(response);
     }
 
     // Còn không thì trả về dữ liệu
     return response
 })