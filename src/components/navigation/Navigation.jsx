import React,{useContext} from 'react'
import './Navigation.scss'
import UserContext from '../../contexts/userContext'

import {withRouter} from 'react-router-dom'

import {FaBirthdayCake} from 'react-icons/fa'
import cookies from 'js-cookie'

const Navigation = (props) => {

    const {history : {push}} = props

    const userContext = useContext(UserContext)
    const {currentUser,setCurrentUser} = userContext

    const logoutUser = () => {
        cookies.remove('react-ecommerce-user')
        setCurrentUser(null)
        push('/')
    }

    return(
        <div className="navigation">
            <div className="appHeader">
                <span className="spinner">
                    <FaBirthdayCake 
                        size='3rem'
                    />
                </span>
                <span className="appText" onClick={() => push('/')}>CAKE SPOT</span>
            </div>
            <div className="navOptions">
                {
                    currentUser ?
                        <>
                            <span className='navLinks' onClick={() => push('/dashboard/shop')}>SHOP</span>
                            <span className='navLinks' onClick={() => push('/dashboard/cart')}>CART</span>
                            <span className='navLinks' onClick={() => push('/dashboard/profile')}>PROFILE</span>
                        </>
                        :
                        null

                }
            </div>
            <div className="navButton">
                {
                    currentUser ? 
                    <button className="logoutButton" onClick = {logoutUser}>LOG OUT</button>
                    :
                    <button className="logoutButton" onClick = {() => push('/signup')}>SIGN UP</button>
                }
            </div>
        </div>
    )
}

export default withRouter(Navigation)