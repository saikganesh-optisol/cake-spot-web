import React, {useEffect, useState} from 'react'
import './App.css'

import Login from './screens/login/Login'
import Dashboard from './containers/dashboard/Dashboard'
import Navigation from './components/navigation/Navigation'

import UserContext from './contexts/userContext'

import {Redirect, Route,Switch} from 'react-router-dom'

import cookies from 'js-cookie'
import axios from 'axios'
import Signup from './screens/signup/Signup'

const App = () => {

    const [currentUser,setCurrentUser] = useState(null)

    const authenticateUser = async  () => {
        const userToken = cookies.get('react-ecommerce-user')
        if(currentUser || !userToken) return
        const config = {
            headers: { Authorization: `Bearer ${userToken}` }
        }

        try
        {
            const response = await axios.post('http://localhost:3001/auth/authenticate',null,config)
            const {data : {signedInUser,userToken}} = response
            cookies.set('react-ecommerce-user',userToken)
            setCurrentUser(signedInUser)
        }
        catch(error)
        {
            console.log(error)
        }
        
    }

    useEffect(() => {
        authenticateUser()
    },[currentUser])
    
    return(
        <>
            <UserContext.Provider value={{currentUser,setCurrentUser}}>
                <Navigation />
                <Switch>
                    <Route 
                        path='/'
                        exact
                        render = {(routeProps) => {
                            return !currentUser ?
                            <Login {...routeProps}/> 
                            :
                            <Redirect to='/dashboard/shop' />
                        }}
                    />
                    <Route 
                        path = '/dashboard'
                        render={(routeProps)=> {
                            return currentUser ? 
                            <Dashboard {...routeProps}/>
                            :
                            <Redirect to='/'/>
                        }} 
                    />
                    <Route 
                        path = '/signup'
                        exact
                        render = {(routeProps) => {
                            return !currentUser ?
                            <Signup {...routeProps}/> 
                            :
                            <Redirect to='/dashboard/shop' />
                        }}
                    />
                        
                </Switch>
            </UserContext.Provider>
        </>
    )
}

export default App