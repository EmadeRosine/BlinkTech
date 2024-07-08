import React from 'react'
import './App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import AddProduct from './Components/AddProduct/Addproduct'
import ListProduct from './Components/ListProduct/Listproduct'
import Order from './Components/OrderProduct/Order'

function App() {

  const url ="http://192.168.43.81:4000";

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<AddProduct url={url}/>} />
          <Route path="/list" element={<ListProduct url={url}/>} />
          <Route path="/order" element={<Order url={url}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
