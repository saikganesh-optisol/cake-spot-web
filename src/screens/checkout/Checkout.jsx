import axios from 'axios'
import {useEffect,useRef,useContext} from 'react'
import GlobalVariableContext from '../../contexts/globalVariablesContext'
import { getAxiosHeader, getUserToken } from '../../reactUtils'
import './Checkout.scss'


const Checkout = (props) => {

    const {location:{state},history:{push}} = props
    const {totalPrice,totalItems} = state

    const {serverDomain} = useContext(GlobalVariableContext)

    const paypalRef = useRef()

    useEffect(() => {

        window.paypal.Button.render({
            env : 'sandbox',
            style : {
                color : 'gold',
                shape : 'rect',
                size : 'large',
                label : 'paypal',
                layout : 'vertical',
            },
            funding: {
                allowed: [ window.paypal.FUNDING.CARD ],
                disallowed: [ window.paypal.FUNDING.CREDIT ]
            },
            payment : async function () 
            {
                const userToken = getUserToken()
                if(!userToken) return
                const response = await axios.post(`${serverDomain}/user/createPayment`,{
                    amount : totalPrice
                },getAxiosHeader(userToken))
                return response.data.id

            },
            onAuthorize : async function(data) 
            {
                const userToken = getUserToken()
                if(!userToken) return
                const {paymentID,payerID} = data
                const response = await axios.post(`${serverDomain}/user/executePayment`,{
                        paymentID,
                        payerID,
                        amount : totalPrice,
                        items : totalItems
                },getAxiosHeader(userToken))
                console.log(response.data)
                push('/dashboard/shop')
                return
            }
        },paypalRef.current)

        return () => {
            paypalRef.current = null
        }
    },[])

    return(
        <div className="checkout">
            <div className="checkoutHeader">
                <div className="checkoutTitle">Pay <span className="checkoutAmount">₹ {totalPrice}</span></div>
            </div>
            <div className="paypalCheckout" ref={paypalRef}></div>
        </div>
    )
}

export default Checkout