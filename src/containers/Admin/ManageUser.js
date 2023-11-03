import React ,{useCallback, useEffect, useState}from 'react';
import './ManageUser.scss';
import { FaUsers } from "react-icons/fa";
import {FcReadingEbook} from 'react-icons/fc'
import { BsFillTrashFill,BsFillArrowLeftSquareFill} from "react-icons/bs";
import moment from 'moment';
import {Paganation} from '../../components/Customs';
import { 
  getAllUser,
  trashCourse,
  deleteUser,
  restoreUser,
  getUserByIdAdmin ,
  UpdateUserByAdmin,
  DeleteForce,
  DeleteAllUserCheckBox,
  createUser
} from '../../ServicesAPI';
import {Inputfieds} from '../../components/Customs';
import useDebounce from '../../Hook/useDebounce';
import _ from 'lodash';
import { ModalDeleteAdminUser,ModalEditUserAdmin,ModalCreateUserAdmin } from '../../components/Modals';
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const ManageUser = () => {
    //Delete soft
    const [isOpenModalDelete,setOpenDeleteModal] = useState(false);
    const [IdDelete,setIdDelete] = useState(null);
    //Edit 
    const [isOpenModalEdit,setOpenEditModal] = useState(false);
    const [detailCurrentUser,setDetailCurrent] = useState(null);
    //Delete Force
    const [isOpenDeleteForce,setOpenDeleteForce] = useState(false);
    const [IdDeleteFORCE,setIdDeleteForce] = useState(null); 
    //Create User
    const [isOpenCreateModalUser,setOpenModalCreate] = useState(false);
    //----------
    const [checkBox , setCheckBox] = useState([]);
    const [checked,setchecked] = useState(false);
    const [countData,setCountData] = useState(null);
    const [response ,setresponse] = useState([]);
    const [isOpenTrash,setOpenTrash] = useState(false);
    const [RestoreEffect,setEffectRestore] = useState(false);
    const [isDeleteForce,setDeleteForce] = useState(false);
    const [trash,setTrash] = useState([]);
    const [theme,settheme] = useState({
      search : ''
    });

    const [params] = useSearchParams();
    
    const fetchDataGetUser = async(params) => {
      const data = await getAllUser({...params,limit : process.env.REACT_APP_LIMIT});
      if(data) {
        setresponse(data.response?.slice(0).reverse());
        setCountData(data.count);
      } 
    }

    const fetchDataTrash = async() => {
      const responseTrash = await trashCourse();
      if(responseTrash)  setTrash(responseTrash.data?.slice(0).reverse());
    }


   useEffect(() => {
      let query = Object.fromEntries([...params]);
      const q = {...query};
      fetchDataGetUser(q);
   },[params,isOpenModalDelete])

    useEffect(() => {
      fetchDataTrash();
    },[response,RestoreEffect])

    const debounce = useDebounce(theme.search,500)
    useEffect(() => {
      let query = Object.fromEntries([...params]);
      if(debounce) query.search = theme.search;
      fetchDataGetUser(query);
    },[debounce])

    const handleCheckbox = (e) => {
       const alreadyBox = checkBox?.find(item => item === e);
       if(alreadyBox) setCheckBox(prev => prev.filter(item => item !== e));
       else setCheckBox(prev => [...prev,e]);
    }

    const handleOpenModalDelete0rRestore = async(id) => {
      if(isOpenTrash) {
          const request = await restoreUser(id);
          if(request.errCode === 0) {
            toast.success(request.message);
            setEffectRestore(!RestoreEffect);
            fetchDataGetUser();
          }   
      }
      else {
        setIdDelete(id);
        setOpenDeleteModal(!isOpenModalDelete);
      }
    }

    const HandleSoftDelete = useCallback(async(id) => {
      if(isOpenModalDelete) {
        const dataDelete =await deleteUser(id);
        if(dataDelete.errCode === 0) {
           toast.success(dataDelete.message);
           setOpenDeleteModal(false);
        }
      }
      if(isOpenDeleteForce) {
         const Force = await DeleteForce(id);
         if(Force.errCode === 0) {
          toast.success(Force.message);
          setOpenDeleteForce(false);
          fetchDataTrash();
         }
      }
    },[IdDelete,IdDeleteFORCE,isOpenModalDelete,isOpenDeleteForce]);


    const handleOpenModalEditOrForceDelete = async(id) => {
        if(isOpenTrash) {
          setOpenDeleteForce(true);
          setIdDeleteForce(id);
        }
        else {    
          let info = await getUserByIdAdmin(id);
          if(info.errCode === 0) {
            setDetailCurrent(info.data);
            setOpenEditModal(true);
          }
 
        }
    }
    
    const handleSubmitEdit =useCallback(async(data) => {
      const { _id , ...value} = data;

      const update = await UpdateUserByAdmin(_id,value);
      if(update.errCode === 0) {
        toast.success(update.message);
        setOpenEditModal(false);
        fetchDataGetUser();
      }
    },[isOpenModalEdit])

    const handleDeleteAllCheckBox = async() => {
      if(checkBox.length > 0) {
       const response = await DeleteAllUserCheckBox(checkBox);
       if(response.errCode === 0) {
        toast.success(response.message);
        fetchDataGetUser();
       }
      }
    }

    const handleCreateUser = useCallback(async(data) => {
      const response =  await createUser(data);
      if(response.errCode === 0) {
        toast.success(response.message);
        setOpenModalCreate(false);
        fetchDataGetUser();
      }
      else {
        toast.error('Some thing went wrong')
      }

    },[isOpenCreateModalUser])

    const handleCheckAllBox = async(e) => {
  
    }


    return (
    <div className='management_user_admin w-100 h-100'>
      <div className='wrapper_management'>
             <div className='workspace-admin '>
                <header className='d-flex justify-content-between align-items-center pb-2 px-4 pt-4'>
                  <div className='left-manage'>
                        <span className='pe-2'><FaUsers/></span>
                        Management User 
                  </div>
                  <div className='right-manage'>
                    <button className='mx-2 btn btn-primary'
                     onClick={() => setOpenModalCreate(true)}
                     >Create New User
                    </button>          
                    <button className='btn btn-danger mx-2' onClick={() =>  handleDeleteAllCheckBox()}>Delete All</button>
                    <button className='btn btn-success'>Infomation</button>
                    <button className=' mx-2 btn btn-warning'>Export PDF</button>

                  </div>
                </header>
                <div className='content_downling_admin'>
                  <div className='d-flex mt-3 mb-3 px-2 justify-content-between align-items-center'>
                    {trash?.filter(item => item.deleted === true).length >= 1 ?  <div className='checkbox_all' onClick={() => setOpenTrash(!isOpenTrash)}>
                          {isOpenTrash ? <BsFillArrowLeftSquareFill /> : <BsFillTrashFill />} 
                          <label className='form-check-label ps-1 text-underline'>{isOpenTrash ? 'Back to Magagement' :'Trash Force'}</label>
                        {!isOpenTrash && <span className='ms-2 text-primary'>({trash?.filter(item => item.deleted === true).length})</span> }
                      </div> : <FcReadingEbook className='icon'/>} 
                    
                      <div className='Acion_admin me-3 w-25'>
                           <Inputfieds 
                              value={theme.search} 
                              setValue={settheme} 
                              nameKey='search' 
                            />
                      </div>
                  </div>
                  <table class="table">
                    <thead className='table-dark'>
                      <tr>
                        <th scope="col"> 
                        <input
                          type='checkbox'
                          onChange={(e) =>handleCheckAllBox(e)}
                          className='form-check-input me-2'
                          name='checkboxAll'
                          disabled
                          /></th>
                        <th scope="col">Email </th>
                        <th scope="col">FullName</th>
                        <th scope="col">Status</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">CreatedAt</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isOpenTrash ? 
                      !_.isEmpty(trash?.filter(item => item.deleted === true)) ? trash?.slice(0).reverse()?.map((item,index) =>
                        item.deleted === true &&  <tr key={item._id}>
                        <th scope="row">
                            <input 
                            type='checkbox' 
                            value={item._id} 
                            onChange={(e) => handleCheckbox(e)} 
                            />
                        </th>
                        <td>{item.email}</td>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>Active</td>
                        <td>{item.mobile}</td>
                         <td>{ moment(item.createdAt).format('l')}</td>
                        <td>
                          <td className='btn btn-success mx-2'
                          onClick={() => handleOpenModalDelete0rRestore(item._id)}
                          >
                            Restore
                          </td>
                          <td className='btn btn-danger'
                          onClick={() => handleOpenModalEditOrForceDelete(item._id)}>
                            Delete Force
                          </td>
                        </td>
                      </tr> 
                       
                          ) : 
                        <span className='text-secondary mt-2 ms-2 link-opacity-100 link-underline-primary'>Thùng rác trống 
                            <span className='ms-2 link-underline-primary text-primary'
                            onClick={() => setOpenTrash(false)}
                            >Quay lại</span>
                        </span> 
                      :   
                      response?.map((item,index) => 
                       item.role === 'user' &&   
                      <tr key={item._id}>
                          <th scope="row">
                              <input 
                              type='checkbox' 
                              value={item._id} 
                              onClick={() => handleCheckbox(item._id)} 
                              />
                          </th>
                          <td>{item.email}</td>
                          <td>{item.firstName} {item.lastName}</td>
                          <td className={item?.isBlocked === true ? 'text-danger fw-medium' :'text-success fw-medium'}>
                            {item?.isBlocked === true ? 'Block' : 'Active'}</td>
                          <td>{item.mobile}</td>
                          <td>{ moment(item.createdAt).format('l')}</td>
                          <td>
                            <td className='btn btn-link mx-2'
                             onClick={() => handleOpenModalDelete0rRestore(item._id)}
                            >
                             Xóa
                            </td>
                            <td className='btn btn-link'
                            onClick={() => handleOpenModalEditOrForceDelete(item._id)}>
                             Sửa đổi  
                            </td>
                          </td>
                      </tr> 
                       
                        )
                      }
                    </tbody>
                  </table>
                   <Paganation totalCount={countData}/>
                </div>
             </div>
      </div>  

      <ModalDeleteAdminUser
        isOpen={isOpenModalDelete} 
        setOpen={setOpenDeleteModal}
        id={IdDelete}
        DeleteUser={HandleSoftDelete}
      />

      <ModalEditUserAdmin 
        isOpen={isOpenModalEdit}
        setOpen={setOpenEditModal}
        currentUser={detailCurrentUser}
        updateUser={handleSubmitEdit}
      />

      <ModalDeleteAdminUser
        isOpen={isOpenDeleteForce} 
        setOpen={setOpenDeleteForce}
        id={IdDeleteFORCE}
        isDeleteForce
        DeleteUser={HandleSoftDelete}
      />

      <ModalCreateUserAdmin 
        isOpen={isOpenCreateModalUser}
        setOpen={setOpenModalCreate}
        CreateUser={handleCreateUser}
      />
    </div>
  )
}

export default ManageUser