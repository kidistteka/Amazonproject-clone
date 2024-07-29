import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Results from './Pages/Results/Results'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Cart from './Pages/Cart/Cart'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'

const stripePromise = loadStripe('pk_test_51PfSodDtaeQ9GVwuBoRxpUJDWP7jXQmKR244apOrD0MVReUDTsHO4Tan8vzDIaKnsc8aD3TGB6WCmXOIRGwyWx6500BP9gap5O');


function Routeing() {
  return ( 
    <Router>
        <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/payment' element={
              <ProtectedRoute 
              msg={"you must log in to pay"}
              redirect={"/payment"}>
              <Elements stripe={stripePromise}>
                <Payment/>
              </Elements> 
              </ProtectedRoute>}/>
             
            <Route path='/orders' element={
              <ProtectedRoute 
              msg={"you must log in to accesec your orders"}
              redirect={"/orders"}>
              
              <Orders/>
              </ProtectedRoute>
            }/>
            <Route path='/category/:categoryName' element={<Results/>}/>
            <Route path='/products/:productId' element={<ProductDetail/>}/>
            <Route path='/cart' element={<Cart/>}/>
            
        </Routes>
    </Router>
  )
}

export default Routeing
