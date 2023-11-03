import { useSearchParams } from "react-router-dom";
import { usePaganation } from "../../Hook";
import PageItem from "./PageItem";
import _ from "lodash";
const Paganation  =({totalCount}) => {
    const [params] = useSearchParams();
    let query = +params.get('page')
    const Paganation = usePaganation(totalCount,!_.isEmpty(params.get('page')) ? query  : 1);
    return (
        <div className="text-end d-flex justify-content-end mt-3 m-3"> 
           {Paganation?.map((item,index) => 
            <PageItem key={index}>
                {item}
            </PageItem>
            )}
        </div>
    )
}

export default Paganation;