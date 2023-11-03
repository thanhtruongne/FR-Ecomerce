import React ,{useEffect,useState} from 'react'
import './Wishlist.scss';
import {FaThList} from 'react-icons/fa'
import { useSelector } from 'react-redux';
import { withbaseComponent } from '../../hocs';
import { getcurrentUser } from '../../stores/asyncActions';
import { UpdateCart } from '../../ServicesAPI';
import { toast } from 'react-toastify';
const Wishlist = ({dispatch}) => {
  const {wishList} = useSelector(state => state.user);
  const [data,setdata] = useState([]);
  
  useEffect(() => {
    dispatch(getcurrentUser());
  },[])

  useEffect(() => {
      setdata(wishList?.wishlist);
  },[wishList])
  console.log(data);
  

  const handleUpdateCart = async(value) => {
    const data = {
      product : value._id,
      title : value?.title,
      price : value?.price,
      thumb : value?.thumb,
      qualnity : 1,
      color : value?.color
    }

    const newData = await UpdateCart(data);
    if(newData.errCode === 0) {
      dispatch(getcurrentUser())
      toast.success(newData?.message);
    }
    else {
      toast.error('Some thing went wrong');
    }


  }

  
  return (
    <div className='wish_list'>
      <div className='title'>
          <div className='d-flex align-items-center h-100 ps-4'>
            <FaThList size={20} />
            <h3>WishList</h3>
          </div>
      </div>

      <div className='d-flex gap-3 mt-4 mx-4'>
        {data && data.map(item => 
          <div class="card w-33" >
            <img src={item?.product?.thumb}class="card-img-top" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">{item?.product?.title  }</h5>
              <p class="card-text">{item?.product?.color} - {item?.product?.internal} - {item?.product?.price} VND</p>
              <span onClick={() => handleUpdateCart(item?.product)} class="btn btn-danger">Add to Cart</span>
            </div>
          </div>
          )}
      
      </div>
    </div>
  )
}

export default withbaseComponent(Wishlist)