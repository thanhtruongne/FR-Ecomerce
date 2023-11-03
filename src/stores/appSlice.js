import { createSlice } from "@reduxjs/toolkit";
import * as actions from "./asyncActions";
const appSlice = createSlice({
    name: 'app',
    
    initialState: {
      isLoading: false,
      errorMessage: '',
      categories: null,
      isOpenModal : false,
      modalChildren : null,
      isOpenCart : false
      },
  
    // Các action bình thường (sync action)
    reducers: {
      showModal : (state,action) => {
         state.isOpenModal = action.payload.isOpenModal;
         state.modalChildren = action.payload.modalChildren
      },
      showCart : (state,action) => {
        state.isOpenCart = action.payload.isOpenCart;
      }
    },
  
    // Code logic xử lý async action
    extraReducers: (builder) => {
      // Bắt đầu thực hiện action login (Promise pending)
      builder.addCase(actions.getcategories.pending, (state) => {
        // Bật trạng thái loading
        state.isLoading = true;
      });
  
      // Khi thực hiện action login thành công (Promise fulfilled)
      builder.addCase(actions.getcategories.fulfilled, (state, action) => {
        // Tắt trạng thái loading, lưu thông tin user vào store
        state.isLoading = false;
        state.categories = action.payload;
      });
  
      // Khi thực hiện action login thất bại (Promise rejected)
      builder.addCase(actions.getcategories.rejected, (state, action) => {
        // Tắt trạng thái loading, lưu thông báo lỗi vào store
        state.isLoading = false;
        state.errorMessage = action.payload.message;
      });
    },
  });

  export const { showModal , showCart } = appSlice.actions

  export default appSlice.reducer