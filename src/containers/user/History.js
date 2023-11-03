import React,{useEffect, useState} from 'react'
import './History.scss';
import {AiOutlineHistory} from 'react-icons/ai';
import { Inputfieds } from '../../components/Customs';
import { HistoryCart } from '../../ServicesAPI';
import { useParams } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import moment from 'moment/moment';
const History = () => {
  const [searching,setSearching] = useState({search : ''});
  const [data,setdata] = useState([]);
  const [count,setcount] = useState(0);
  const [params] = useSearchParams();
  
  const fetchData = async(param) => {
       const response = await HistoryCart({...param,limit : process.env.REACT_APP_LIMIT});
       console.log(response)
       if(response.status === true) {
          setdata(response?.response);
          setcount(response?.count);
       }
  }

  useEffect(() => {
    fetchData();
  },[])
  

  return (
    <div className='history_main'>
        <div className='title d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center justify-content-between ps-4 h-100'>
              <AiOutlineHistory size={30} className='pe-2' />
              <h3>History</h3>
          </div>
          <div className='col-lg-5 me-4 pe-3'>
            <Inputfieds 
                placeholder='Status, Price....'
                setValue={setSearching}
                value={searching?.search}
                nameKey='search'
            />
          </div>
       
        </div>
        <div className='mt-4'>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th className='text-center' scope="col">Product</th>
              <th sscope="col">Price</th>
              <th cope="col">Status</th>
              <th scope="col">Create At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody class="table-group-divider">
           {data && data.map((item,index) => 
            <tr>
              <td>{index + 1}</td>
              <td className='text-center d-flex flex-column'>{item?.products?.map(value => 
                <span>{value.title} * {value.color} * {value.qualnity}</span>
                )}</td>
              <td>{
                <NumericFormat
                    value={item?.total} 
                    suffix={' VND'} 
                    thousandSeparator ={true} 
                    displayType = {'text'}
                    className='currency'
                />}</td>
                <td>{item.status}</td>
              <td>{moment(item.updatedAt).format('L')}</td>
              <td>
                <span className='btn-link'>Xóa</span>
              </td>
            </tr>
            
            )}
               
            
        
          </tbody>
        </table>
        </div>
      
    </div>
  )
}

export default History