
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { CreateOrder, getcurrentUser } from "../../ServicesAPI";
import { useNavigate } from "react-router";

// This value is from the props in the UI
const style = {"layout":"vertical"};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({currency, showSpinner , amount, payload,setSuccess,total }) => {
  const [{ isPending,options },dispatch] = usePayPalScriptReducer();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch({
        type : 'resetOptions',
        value : {
            ...options,currency : currency
        }
    })

  },[currency,showSpinner])

  const handleSaveCreateOrder = async() => {
    console.log(payload)
    const newCreate = await CreateOrder({...payload,status : 'Success'})
    if(newCreate.errCode === 0) {
      setSuccess(true);
      Swal.fire({
        title : "Success Order !!!",
        icon : 'success'
      }).then(result => {
          setTimeout(() => {
            dispatch(getcurrentUser());
            window.close();
            navigate('/');
          },1000)   
      })
    }  
   

  }

  return (
      <>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              style={style}
              disabled={false}
              forceReRender={[style,currency,amount]}
              fundingSource={undefined}
              createOrder={(data,actions) => 
                actions.order.create({
                    purchase_units : [{amount : {currency_code : currency,value : amount}}]
                   }).then(orderId => orderId)
                }
              onApprove={(data,actions) => actions.order.capture().then(async(response) => {
                    if(response.status === 'COMPLETED') {
                            handleSaveCreateOrder()
                    }
              })}
          />
      </>
  );
}

export default function Paypal({amount,payload,setSuccess}) {
  return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
          <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
              <ButtonWrapper setSuccess={setSuccess} payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
          </PayPalScriptProvider>
      </div>
  );
}