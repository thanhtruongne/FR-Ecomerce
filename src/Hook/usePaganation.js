import { useMemo } from "react";
import { range } from "../utils/constant";
import {BsThreeDots} from 'react-icons/bs'

const usePaganation  =(totalCount,currentPage,sibling = 1 ) => {
   const paganationRange = useMemo(() => {
    
    const totalPageLength = process.env.REACT_APP_LIMIT || 10;
    const totalPageCount = Math.ceil(totalCount / totalPageLength);

    const totaLPageNumbers = sibling + 5;
    
    // trường hợp 1
   if(totaLPageNumbers >= totalPageCount) return range(1,totalPageCount);
    
    const ShowleftDots = currentPage - sibling > 2;
    const ShowRightDots = currentPage + sibling < totalPageCount - 1;
    
  
    if(!ShowleftDots && ShowRightDots) {
        const leftRange = range(1,5);
        return [...leftRange,<BsThreeDots />,totalPageCount];
    }

    const firstPageIndex = 1 ;
    const lastPageIndex = totalPageCount;
    if(ShowleftDots && !ShowRightDots) {
        const rightItemCount =lastPageIndex - 4
        const rightRange =range(rightItemCount,lastPageIndex);
        return [firstPageIndex,<BsThreeDots />,...rightRange];
    }

    const leftSibling = Math.max(currentPage - sibling , 1);
    const rightSibling = Math.min(currentPage + sibling,lastPageIndex);

    if(ShowleftDots && ShowRightDots) {
        const middleRange = range(leftSibling, rightSibling);
        return [firstPageIndex,<BsThreeDots />,...middleRange,<BsThreeDots />,lastPageIndex];
    }
   },[totalCount,sibling,currentPage])

   return paganationRange
}

export default usePaganation;