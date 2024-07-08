import React from "react";
import './ExploreList.css'
import { explore_list } from "../../assets/assets";

const ExploreList = ({category,setCategory}) =>{

    return(
        <div className="explore-menu" id="explore-menu">
            <h1>Explore Our Products</h1>
            <p className="explore-menu-text">
                Choose from a diverse list of Electronics
            </p>
            <div className="explore-menu-list">
                {explore_list.map((item,index) =>{
                    return(
                        <div onClick={() => setCategory(prev=>prev===item.product_name? "All":item.product_name)} key={index} className="explore-menu-list-item">
                            <img className={category===item.product_name? "active": ""} src={item.product_image} alt="" />
                            <p>{item.product_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr />
        </div>
    )
}

export default ExploreList