import { createSlice, current } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
import { act } from "react-dom/test-utils";

export const userSlice = createSlice({
    name: 'user',
    
    initialState: {
     isLoggedIn: null,
     token: null,
     current : null,
     isLoading : false,
     currentCart : [],
     wishList : [],
     message : ''
      },
  
    // Các action bình thường (sync action)
    reducers: {
        login : (state,action) => {
          state.isLoggedIn = true;
          state.token = action.payload.token;
          state.current = action.payload.current
        },
        logout : (state,action) => {
          state.isLoggedIn = false;
          state.token = null;
          state.current = null;
          state.message = '';
        },
        clearMessgage : (state,action) => {
          state.message = '';
        },
        updatecart : (state,action) => {
         state.currentCart = action.payload;
        },

    },

    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(actions.getcurrentUser.pending, (state) => {
          // Bật trạng thái loading
          state.isLoading = true;
        });
    
        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(actions.getcurrentUser.fulfilled, (state, action) => {
          // Tắt trạng thái loading, lưu thông tin user vào store
          console.log(action);
          state.isLoading = false;
          state.current = action.payload.user;
          state.currentCart = action.payload.cart;
          state.wishList = action.payload.wishlist;
        });
    
        // Khi thực hiện action lostate.wishList = action.payload.wishList;gin thất bại (Promise rejected)
        builder.addCase(actions.getcurrentUser.rejected, (state, action) => {
          // Tắt trạng thái loading, lưu thông báo lỗi vào store
          state.isLoading = false;
          state.isLoggedIn= null;
          state.token= null;
          state.current = null;
          state.message = 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại !!!';
        });
      },
  
  });

  export const { login , logout, clearMessgage , updatecart} = userSlice.actions; 


  export default userSlice.reducer