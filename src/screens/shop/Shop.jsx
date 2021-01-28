import {useState,useEffect,useContext} from 'react'
import './Shop.scss'

import axios from 'axios'
import ShopItem from '../../components/shopItem/ShopItem'

import GlobalVariableContext from '../../contexts/globalVariablesContext'
import { getAxiosHeader, getUserToken } from '../../reactUtils'

const Shop = () => {

    const [shopItems,setShopItems] = useState([])
    const [loading,setLoading] = useState(true)

    const {serverDomain} = useContext(GlobalVariableContext)

    const fetchShopItems = async () => {
        const userToken = getUserToken()
        if(!userToken) return
        const {data} = await axios.get(`${serverDomain}/user/shop`,getAxiosHeader(userToken))
        setShopItems(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchShopItems()
    },[])

    return(
        <div className="shop">
            <div className="shopHeader">
                <h1 className="shopTitle">Explore our wide variety of cakes</h1>
            </div>
            <div className="shopBody">
                {
                    shopItems.map((item,index) => {
                        return <ShopItem key={index} item={item}/>
                    })
                }
            </div>
        </div>
    )
}

export default Shop