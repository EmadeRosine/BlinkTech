import React, { useState } from "react";
import './Login.css'
import { useContext } from "react";
import assets from '../../assets/assets'
import { StoreContext } from "../../Context/StoreContext";
import axios from 'axios'

const Login =({setShowLogin}) =>{

    const {url,setToken} = useContext(StoreContext)
    const [currState, setCurrSate] = useState("Login")
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = url;
        if(currState==="Login"){
            newUrl +="/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }
        const response = await axios.post(newUrl,data);
        if (response.data.success){
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setShowLogin(false)
        }
        else{
            alert(response.data.message)
        }
    }

    return(
        <div className="login">
            <form onSubmit={onLogin} className="login-container">
                <div className="login-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross} onClick={() =>setShowLogin(false)} />
                </div>
                <div className="login-inputs">
                    {currState==="Login"?<></>:
                    <div>
                    <label htmlFor="name">Name: </label>
                    <input type="text" name="name" onChange={onChangeHandler} value={data.name} placeholder="Enter Your Name"  required/>
                </div>
                    }
                    
                    <div>
                        <label htmlFor="email">Email: </label>
                        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email"  required/>
                    </div>
                    <div>
                        <label htmlFor="password">Password: </label>
                        <input name="password" onChange={onChangeHandler} value={data.password} type="text" placeholder="Your Password"  required/>
                    </div>
                </div>
                <button type="submit">{currState==="Sign Up"? "Create account":"Login"}</button>
                <div className="login-condition">
                    <input type="checkbox" required />
                    <p>By Continuing, i aggree to the terms of use and privacy.</p>
                </div>
                {currState==="Login"
                ?<p>Create a new Account?<span onClick={() => setCurrSate("Sign Up")}>Click here</span></p>
                :<p>Already have an account? <span onClick={() => setCurrSate("Login")}>Login here</span></p>
                }
            </form>
        </div>
    )
}

export default Login