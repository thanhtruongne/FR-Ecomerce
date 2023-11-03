import { createSearchParams, useNavigate, useSearchParams,useParams, useLocation } from 'react-router-dom';
import './PageItem.scss'

const PageItem  =({children}) => {
  const [params] = useSearchParams();
  const {category} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const currentpage = params.get('page') || 1;

  const handleChangePage = () => {
      const query = Object.fromEntries([...params]);
      if(Number(children)) query.page = children;
      navigate({
          pathname :location?.pathname,
          search : createSearchParams(query).toString()
      })
  }


  return (
    <div className={Number(children) && +children === +currentpage ?"mx-3 item_choose_page" : Number(children)  ? 'mx-3 normalize' : "mx-3"}
    onClick={handleChangePage}
    >
        {children}
    </div>
  )

}


export default PageItem;