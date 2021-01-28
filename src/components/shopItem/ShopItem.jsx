import {useContext} from 'react'

import './ShopItem.scss'
import Button from '../button/Button'

import GlobalVariableContext from '../../contexts/globalVariablesContext'

import axios from 'axios'

import cookies from 'js-cookie'
import { getAxiosHeader } from '../../reactUtils'

const ShopItem = (props) => {

    const {itemId,name,description,price} = props.item

    const {serverDomain} = useContext(GlobalVariableContext)

    const handleAddToCart = async (event) => {

        try 
        {
            const userToken = cookies.get('react-ecommerce-user')
            if(!userToken) return

            await axios.post(`${serverDomain}/user/addToCart`,{
                itemId,
            },getAxiosHeader(userToken))
        } 
        catch (error) 
        {
            console.log(error)
        }
    }

    return(
        <div className="shopItem">
            <div className="itemHead">
                <img src={`${serverDomain}/user/itemImage/${itemId}`} alt="" className="itemImage"/>
            </div>
            <div className="itemBody">
                <h2 className="itemName">{name}</h2>
                <p className="itemDescription">{description}</p>
            </div>
            <div className="itemFooter">
                <span className="itemPrice">₹ {price}</span>
                <Button value='Add to cart' type='button' onClick={handleAddToCart}/>
            </div>
        </div>
    )
}

export default ShopItem