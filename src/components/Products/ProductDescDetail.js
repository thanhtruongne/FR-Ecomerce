import React,{useEffect,useState} from 'react';
import './ProductDescDetail.scss'
import VoteBar from '../Customs/VoteBar';
import { Rating } from '@mui/material';
import { RatingsProduct } from '../../ServicesAPI';
import { ModalComment, } from '../Modals';
import { useDispatch, useSelector } from 'react-redux';
import { getcurrentUser } from '../../stores/asyncActions';
import { toast } from 'react-toastify';
import * as DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';
import { createSearchParams } from 'react-router-dom';
import { withbaseComponent } from '../../hocs';


const ProductDescDetail  =({ProductData,rerender,navigate,location}) => {
 const [activeTab, setActiveTab] = useState(1);  
 const [isOpenModal,setOpenModal] = useState(false);
 const dispatch = useDispatch();
 const {isLoggedIn ,current} = useSelector(state => state.user);  
 const [Rerendering ,setRerender] = useState(false);
 useEffect(() => {
   if(isLoggedIn)   dispatch(getcurrentUser());
 },[isLoggedIn,dispatch])


const productTABS = [
    {
        id :1,
        name : 'description',
       content : ProductData?.description.length > 1 ? ProductData?.description.map((item,index) => {
        return <li className='' key={index}>{item}</li>
       }) : <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(ProductData?.description[0])}}/>
    },
    {
        id :2,
        name : 'warranty',
        content :"WARRANTY INFORMATION LIMITED WARRANTIES Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products Frames Used In Upholstered and Leather Products  Limited Lifetime Warranty A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects."
    },
    {
        id :3,
        name : 'delivery',
        content :"PURCHASING & DELIVERY Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination Picking up at the storeShopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.DeliveryCustomers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above."
    },
    {
        id :4,
        name : 'payment',
        content :"PURCHASING & DELIVERY Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination Picking up at the storeShopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.DeliveryCustomers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above."
    },
  
]

const handleSubmitComment =async(data) => {
 if(!data || !ProductData?._id) {
    toast.error('Some thing went wrong !!!')
 }
 else {
    const value ={
        star : data.star,
        comment : data.text,
        uuid : ProductData?._id
    }
   const response =await RatingsProduct(value);
   if(response.status) {
      await rerender(true)
      toast.success('Success comment');
      setOpenModal(false);
   }
 }
}

const handleOpenModal = () => {
    if(!isLoggedIn) {
        Swal.fire({
          title : "You have LogIn first !!",
          showCancelButton: true,
          confirmButtonText: 'Go Log In',
          icon : 'info'
        }).then(async(result) => {
              if(result.isConfirmed) {
                navigate({
                   pathname :`${path.LOGIN}`,
                   search : createSearchParams({redirect : location.pathname}).toString()
                })
              }
        })      
    }
    else  setOpenModal(true)
}
  return (
    <div className='grid_link_desc_product w-100'>
        <div className='tab_choose_desc mb-5'>
            <ul className='title'>
                {productTABS.map((item,index) => 
                 <li className={activeTab === item.id ? 'me-2 active link_desc' : 'me-2 link_desc'} key={item.id}
                 onClick={() => setActiveTab(item.id)}
                 >{item.name}</li>
                )}
               <li className={activeTab === 5 ? 'me-2 active link_desc' : 'me-2 link_desc'} key={5}
                 onClick={() => setActiveTab(5)}
                 >Reviews overview</li>
            </ul>
            <div className={activeTab === 5 ? 'tab_panel box_review' : 'tab_panel'}>
             {productTABS.some(item => item.id === activeTab) && productTABS.find(item => item.id === activeTab)?.content}
             {activeTab === 5 &&
              <div className='w-100'>
                <h2 className='title_review mb-2'>
                    {`Đánh giá & nhận xét ${ProductData?.title}`}
                </h2>
  
                <div className='box-overview d-flex'>
                    <div className='left_overview_content d-flex flex-column justify-content-center align-items-center'>
                       <div className='title'>{ProductData?.totalRatings}/5</div>
                       <div className='ratings_overview'>
                       <Rating 
                            name="half-rating-read" 
                            value={ProductData?.totalRatings}
                            defaultValue={''} 
                            readOnly 
                        />
                       </div>
                       <div className='evaluate'>
                        <strong className='me-1'>{ProductData?.ratings.length}</strong> đánh giá
                       </div>
                    </div>
                    <div className='right_overview_content d-flex flex-column justify-content-center align-items-center'>

                        {Array.from(Array(5).keys()).reverse().map((item => 
                            <VoteBar 
                                key={item}
                                value={item + 1}
                                ratingTotal={ProductData?.totalRatings}
                                ratingsCount={ProductData?.ratings.filter(i => i.star === item + 1)?.length}
                            />
                        ))}

                    </div>
                </div>
                <div className='review_content text-center'>
                    <h2 className=''>Bạn đánh giá sao về sản phẩm này?</h2>
                    
                    <button className='btn btn-danger'
                    onClick={() => handleOpenModal()}
                    >
                        Đánh giá ngay
                    </button>

                    <ModalComment 
                    isOpen={isOpenModal}
                    setOpen={setOpenModal}
                    createComment={handleSubmitComment}
                    productName={ProductData?.title}
                    />
                </div>
                <div className='review'>
                    {ProductData && ProductData?.ratings.map(item => {
                        return (
                            <div className='content_rating_review' key={item._id}>
                        <div className='support_content'>
                            <header className='text-start'>
                                <div className='rate'>
                                    <Rating 
                                        name="half-rating-read" 
                                        value={item.star}
                                        defaultValue={''} 
                                        readOnly 
                                    />
                                </div>
                                <h3>{item.comment}</h3>
                                <span>{item.createAt}</span>
                                    
                            </header>
                            <div className='report_title text-end'>
                                <span className='text-danger'>Report as Inappropriate</span>
                            </div>
                        </div>
                    </div>
                        )
                    })}
                    
                </div>
              </div>
              
              }
            </div>
        </div>
        
    </div>
  )
}

export default withbaseComponent(ProductDescDetail);