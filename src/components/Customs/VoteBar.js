import React ,{useEffect, useRef,memo} from 'react';
import './VoteBar.scss'
import { AiFillStar } from "react-icons/ai"
const VoteBar  =({value,ratingsCount,ratingTotal}) => {
     const bar = useRef();
     useEffect(() => {
        if(ratingsCount >  0  && ratingsCount != 1) {
            bar.current.style.cssText = `width :${100 - Math.round(ratingsCount * 100 / value)}% `
        }
        else  if(ratingsCount  === 1) {
          bar.current.style.cssText = `width :${ Math.round( 100  * ratingsCount)}% `
        }
        else {
          bar.current.style.cssText = `width :0% `
        }
  },[ratingsCount])
  return (
    <div className='rating_level_content d-flex justify-content-evenly align-items-center'>
        <div className='star_count d-flex align-items-center' >
              {value}
              <AiFillStar color='orange' />
        </div>
        <div className='position-relative bar_eval w-75 me-2'>
              <div ref={bar} className='position-absolute last_time_color'></div>
        </div>

        <div className='overview'>
            {`${ratingsCount || 0} reviews`}
        </div>
    </div>
  )
}

export default memo(VoteBar);