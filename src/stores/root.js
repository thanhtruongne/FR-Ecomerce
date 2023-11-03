import { configureStore } from '@reduxjs/toolkit';
import appSlice from './appSlice';
import storage from 'redux-persist/lib/storage' 
import { 
    persistStore,
    persistReducer ,
} from 'redux-persist'
import userSlice from './userSlice';

const commoinfig = {
    key : 'user',
    storage,
    version: 1,
}
const userCongig ={
    ...commoinfig,
    whitelist : ['isLoggedIn', 'token'],
}

 export const store = configureStore({
    reducer :{
        app : appSlice,
        user : persistReducer(userCongig,userSlice),
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persiststore =  persistStore(store);
