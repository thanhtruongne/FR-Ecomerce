import React, { useCallback, useEffect, useState } from 'react';
import { Product } from '../../components/Products';
import { Breadcrumb,SearchingBar,InputSelect,Paganation } from '../../components/Customs';
import './CateProduct.scss';
import { InputSelectFilter } from '../../utils/constant';
import { getproducts } from '../../ServicesAPI';
import { useNavigate, useParams } from 'react-router';
import { createSearchParams, useSearchParams } from 'react-router-dom';
import _ from 'lodash'

const CateProduct  =() => {
  const {category} = useParams();
  const [activeClick,setActiveClick] = useState(null);
  const [product,setProduct] = useState([]);
  const [countData , setCount] = useState(null)
  const [params] = useSearchParams();
  const [sort,setSort] = useState(null);
  const queries = {category : `${category}`}
  const navigate = useNavigate();
  

  const ChangeActiveClick = useCallback((name) => {
      if(activeClick === name) setActiveClick(null);
      else {
        setActiveClick(name);
      }
  },[activeClick])
  
  const fetchDataProduct = async(value) => {
    const data = await getproducts(value);
    setCount(data.count);
    setProduct(data.response);
  }

  useEffect(() => {
    fetchDataProduct(queries);
  },[])


  useEffect(() => {
     let param = [];
     for(let i of params.entries()) param.push(i);
     let queryPrice = {};
     for(let i of param) queries[i[0]] = i[1];
     if(queries.from) queries.price = {gte : +queries.from} 
     if(queries.to) queries.price = {lte : +queries.to};
     if(!_.isEmpty(queries.to) && !_.isEmpty(queries.from)) {
        queryPrice = {
            $and : [
                {price : {gte : queries.from}},
                {price : {lte : queries.to}},
            ]
        }
        delete queries.price;
    }
        delete queries.to
        delete queries.from

    const q =  {...queries,...queryPrice};
    fetchDataProduct(q);
  },[params])

  const changeValue =useCallback((data) => {
        setSort(data);
  },[sort])

  useEffect(() => {  
    if(sort != null) {
        let param = [];
        for(let i of params.entries()) param.push(i);
        for(let i of param) queries[i[0]] = i[1];
        queries.sort =sort
        delete queries.category;
        navigate({
            pathname : `/${category}`,
            search : createSearchParams(queries).toString()
        })
    }
  },[sort])

  return (
  <div id='shoptify-collection_product'>
    <header className='w-100'>
        <div className='container'>
            <span className='title_collect'>{category}</span>
            <div className='breadcrumb_collect'><Breadcrumb category={category} /></div>
        </div>
    </header>

    <div className='collection_content'>
        <div className='container'>
            <div className='main_content_grid'>
                <div className='wrapper_content_collection'>
                    <div className='collection_toolbar'>
                        <div className='filter_content_collect'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <div className='left-content_side'>
                                    <div className='title_filter_content'>Filter by</div>
                                    <div className='d-flex'>
                                        <SearchingBar 
                                            name='Price' 
                                            activeClick={activeClick}
                                            ChangeActiveClick={ChangeActiveClick}
                                            type='input'
                                        />

                                        <SearchingBar 
                                            name='Color'
                                            activeClick={activeClick}
                                            ChangeActiveClick={ChangeActiveClick}
                                            type='checkbox'
                                         />

                                    </div>
                                </div>
                                <div className='right_searching_content'>
                                    <div className='title_filter_content'>Sort by</div>
                                    <div className='sorting_fil w-100'>
                                         <InputSelect value={sort} changeValue={changeValue} options={InputSelectFilter} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='product_grid_template'>
                        <div className='grid_element_item d-flex flex-wrap'>
                            {product && product.map((item,index) => {
                            return (
                            <div className='grid_item_collect w-25' key={index}>
                                    <Product 
                                    productData={item}
                                    />
                            </div>
                            )
                            })}

                        </div>
                    </div>
                     <Paganation totalCount={countData} />
                </div>
            </div>
        </div>
    </div>
  </div>
  )
}

export default CateProduct;