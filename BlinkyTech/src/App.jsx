import React, { useState, useContext } from 'react';
import Navbar from './Component/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import PlaceOrder from './Component/PlaceOrder/PlaceOrder';
import Cart from './Component/Cart/Cart';
import Home from './Component/Home/Home';
import Footer from './Component/Footer/Footer';
import Login from './Component/Login/Login';
import Verify from './Component/Verify/Verify';
import MyOrders from './Component/MyOrders/Myorders';
import { StoreContext } from './Context/StoreContext';

const App = () => {
    const { showLogin, setShowLogin } = useContext(StoreContext);

    return (
        <>
            {showLogin && <Login setShowLogin={setShowLogin} />}
            <div className='app'>
                <Navbar setShowLogin={setShowLogin} />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/order' element={<PlaceOrder />} />
                    <Route path='/verify' element={<Verify />} />
                    <Route path='/myorders' element={<MyOrders />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
