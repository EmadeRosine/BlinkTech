import React, { useState } from "react";
import './Addproduct.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({ url }) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Laptop",
        quantity: 0  // Added quantity
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        formData.append("quantity", Number(data.quantity));  // Added quantity
        const response = await axios.post(`${url}/api/product/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: "Laptop",
                quantity: 0  // Reset quantity
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    return (
        <div className='add-product'>
            <form action="" className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload} alt="" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name:</p>
                    <input onChange={onChangeHandler} value={data.name} type="text" name="name" id="name" placeholder="Type here" />
                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows="6" placeholder="Write Content here..."></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select onChange={onChangeHandler} name="category" id="category">
                            <option value="Laptop">Laptop</option>
                            <option value="Phone">Phone</option>
                            <option value="Headset">Headset</option>
                            <option value="Speaker">Speaker</option>
                            <option value="Watch">Watch</option>
                            <option value="Tablet">Tablet</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="2000Fcfa" />
                    </div>
                    <div className="add-quantity flex-col">  {/* Added quantity input */}
                        <p>Product Quantity</p>
                        <input onChange={onChangeHandler} value={data.quantity} type="number" name="quantity" placeholder="Enter quantity" />
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
    );
};

export default AddProduct;
