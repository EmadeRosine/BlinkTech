import React, { useEffect, useState } from "react";
import './Listproduct.css'
import axios from 'axios'
import { toast } from "react-toastify";

const ListProduct = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/product/list`);
    if (response.data.success) {
      setList(response.data.data);
      // Check for products with low quantity and alert the admin
      response.data.data.forEach(item => {
        if (item.quantity < 5) {
          toast.warning(` ${item.name} is almost finished! Only ${item.quantity} left.`);
        }
      });
    } else {
      toast.error("Error fetching product list");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);

  const removeProduct = async (productId) => {
    const response = await axios.post(`${url}/api/product/remove`, { id: productId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing product");
    }
  }

  return (
    <div className="list add flex-col">
      <h2>App Products List</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Quantity</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt="" className="img" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}Fcfa</p>
            <p>{item.quantity}</p> {/* Display quantity */}
            <p onClick={() => { removeProduct(item._id) }} className="cursor">X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListProduct;
