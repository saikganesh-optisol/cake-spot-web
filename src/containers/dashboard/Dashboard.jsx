import React from 'react'

import {Switch,Route} from 'react-router-dom'

import Slider from '../../components/slider/Slider'
import Cart from '../../screens/cart/Cart'
import Checkout from '../../screens/checkout/Checkout'
import Shop from '../../screens/shop/Shop'

const Dashboard = () => {

    return (
        <div className="dashboard">
            <Switch>
                <Route path='/dashboard/shop' exact>
                {
                    (routeProps) => (
                        <>
                            <Slider />
                            <Shop {...routeProps}/>
                        </>
                    )
                }
                </Route>
                <Route path='/dashboard/cart' exact component={Cart}/>
                <Route path='/dashboard/cart/checkout' exact render={
                    (routeProps) => (
                        <Checkout {...routeProps}/>
                    )
                }/>
            </Switch>
        </div>
    )
}

export default Dashboard;