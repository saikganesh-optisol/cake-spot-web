import {useState,useEffect,useContext} from 'react'
import './Cart.scss'

import {getUserToken,getAxiosHeader} from '../../reactUtils'

import GlobalVariableContext from '../../contexts/globalVariablesContext'

import axios from 'axios'
import CartItem from '../../components/cartItem/CartItem'
import Button from '../../components/button/Button'

const Cart = (props) => {

    const {history : {push}} = props

    const [cartItems,setCartItems] = useState([])
    const [loading,setLoading] = useState(true)

    const {serverDomain} = useContext(GlobalVariableContext)

    useEffect(() => {
        fetchCartItems()
    },[])

    const fetchCartItems = async () => {
        try
        {
            const userToken = getUserToken()
            if(!userToken)
            {
                return
            }
            const {data} = await axios.get(`${serverDomain}/user/cart`,getAxiosHeader(userToken))
            setCartItems(data)
            setLoading(false)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    const [totalItems,totalPrice] = cartItems.reduce((acc,item) => {
        const {quantity,price} = item
        acc[0] += quantity
        acc[1] += quantity * price
        return acc
    },[0,0])

    return(
        <div className="cart">
            <div className="cartHeader">
                <div className="cartHead">
                    YOUR CART <span className="cartItemsCount"> {totalItems}{totalItems > 1 ? ' ITEMS ' : ' ITEM '}, ₹ {totalPrice}</span>
                </div>
                {
                    totalPrice ? 
                    <div className="cartCheckout">
                        <Button value='Checkout' type='button' onClick = {() => push('/dashboard/cart/checkout',{totalPrice,totalItems})}/>
                    </div>
                    :
                    null
                }
            </div>
            <div className="cartItems">
            {
                cartItems.map((cartItem,index) => {
                    return <CartItem 
                        cartItem = {cartItem} 
                        key = {cartItem.id + index}
                        fetchCartItems = {fetchCartItems}
                    />
                })
            }
            </div>
        </div>
    )
}

export default Cart