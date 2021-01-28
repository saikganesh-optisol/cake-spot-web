import axios from 'axios'
import {useState,useContext,useRef, useEffect} from 'react'
import './CartItem.scss'

import GlobalVariableContext from '../../contexts/globalVariablesContext'
import { getAxiosHeader, getUserToken } from '../../reactUtils'

const CartItem = (props) => {

    const {cartItem : {id,quantity,name,description,price},fetchCartItems} = props

    const {serverDomain} = useContext(GlobalVariableContext)
    const updateHook = useRef(false)

    const [itemQuantity,setItemQuantity] = useState(quantity)

    useEffect(() => {
        if(updateHook.current)
        {
            changeQuantity()
        }
        else
        {
            updateHook.current = true
        }
    },[itemQuantity])

    const changeQuantity = async () => {
        const userToken = getUserToken()
        if(!userToken) return
        await axios.put(`${serverDomain}/user/changeQuantity`,{
            quantity : itemQuantity,
            itemId : id
        },getAxiosHeader(userToken))
        fetchCartItems()
    }


    const handleQuantityChange = (event) => {
        const value = event.target.value
        setItemQuantity(parseInt(value))
    }

    return (
        <div className="cartItem">
            <img src={`${serverDomain}/user/itemImage/${id}`} alt="itemImage" className="cartImage"/>
            <div className="itemDetail">
                <h2 className="itemName">{name}</h2>
                <p className="itemDescription">{description}</p>
            </div>
            <div className="itemRequirement">
                <select name="itemQuantity" className="itemQuantity" defaultValue={quantity.toString()} onChange={handleQuantityChange}>
                    <option value="1" className="itemQuantityOption">1</option>
                    <option value="2" className="itemQuantityOption">2</option>
                    <option value="3" className="itemQuantityOption">3</option>
                    <option value="4" className="itemQuantityOption">4</option>
                    <option value="5" className="itemQuantityOption">5</option>
                </select>
                <div className="itemPrice">₹ {quantity * price}</div>
            </div>
        </div>
    )
}

export default CartItem