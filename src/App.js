import React, { useEffect } from 'react';
import {Route,Routes} from 'react-router'
import { Scrollbars } from 'react-custom-scrollbars';
import {path} from './utils/constant';
import {Public,Members} from './routes';
import { CateProduct,DetailProduct,Homepage,MyCart,Checkout } from './containers/Public';
import Login from './containers/Auth/Login';
import { ProfileUser,Cart,Wishlist,History } from './containers/user';
import ResetPassword from './containers/Auth/ResetPassword';
import Vetify_Emali_Register from './containers/Auth/Vetify_Emali_Register';
import { ToastContainer } from 'react-toastify';
import { 
  AdminLayout,
  ManageOrder,
  ManageProudct,
  ManageUser,
  Dashboard,
  CreateProduct 
      } from './containers/Admin';
import { useDispatch, useSelector } from 'react-redux';
import { getcategories } from './stores/asyncActions';
import { withbaseComponent } from './hocs';
import { showCart } from './stores/appSlice';
function App() {
  const dispatch = useDispatch();
  const plugCart = useSelector(state => state.app);
  useEffect(() => {
    dispatch(getcategories()) ;
  },[]);
  
  return ( 
      <div className='main-container w-100 h-100 position-relative'>  
          {plugCart.isOpenCart === true &&
          <div
              onClick={() => dispatch(showCart({isOpenCart : false}))}
              className='position-absolute  bg-overplaybg-overplay z-99999 top-0 bottom-0 start-0 end-0 d-flex justify-content-end overflow-hidden overplay w-100'>
                <Cart isTransition={true} />
          </div>
      }

        <div className='content-container'>
          <Scrollbars style={{height : '100vh', width:'100%',color: 'black'}}>    
             <Routes>
                   <Route path={path.PUBLIC}  element={<Public />}>
                      <Route path={path.HOME} element={<Homepage />}/>
                      <Route path={path.PRODUCT} element={<CateProduct />} />
                      <Route path={path.DETAIL_PRODUCT__PID__TITLE} element={<DetailProduct/>}/>
                      <Route path={path.CART} element={<MyCart />}/>
                    </Route>
                    <Route path={path.ADMIN} element ={<AdminLayout />}>
                      <Route path={path.DASHBOARD_ADMIN} element={<Dashboard />}/>
                      <Route path={path.MANAGEMENT_ORDER} element={<ManageOrder />}/>
                      <Route path={path.MANAGEMENT_PRODUCT} element={<ManageProudct />}/>
                      <Route path={path.MANAGEMENT_USER} element={<ManageUser />}/>
                      <Route path={path.CREATE__PRODUCT} element={<CreateProduct />}/>
                    </Route>

                    <Route path={path.MEMBERS} element={<Members />}> 
                      <Route path={path.PERSONAL} element={<ProfileUser />}/>
                      <Route path={path.HISTORYBOUGHT} element={<History />}/>
                      <Route path={path.WISHLIST} element={<Wishlist />}/>
                    </Route>

                   <Route path={path.LOGIN} element={<Login />}/>
                   <Route path={path.CHECKOUT} element={<Checkout />}/>
                   <Route path={path.ACCURACY_VERTIFY_REGISTER} element={<Vetify_Emali_Register />}/>
                   <Route path={path.RESET_AND_CHANGE_PASSWORD__TOKEN} element={<ResetPassword />} />
             </Routes>
          </Scrollbars>
    
       </div>

       
       <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        

       </div>
  );
}

export default App;
