import React from 'react';
import { useState,useEffect } from 'react';

const useDebounce  =(value,ms) => {
    const [debounce,setDebounce] = useState('');
    
    useEffect(() => {
     const handler =  setTimeout(() => {setDebounce(value) },ms)
       return () => {
        clearTimeout(handler);
       }
    },[value,ms])

    return debounce;
  
}

export default useDebounce;