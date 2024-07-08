import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItem, setCartItems] = useState({});
    const url = "http://192.168.43.81:4000";
    const [token, setToken] = useState("");
    const [product_list, setProductList] = useState([]);
    const [showLogin, setShowLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);

    const addToCart = async (itemId) => {
        if (!token) {
            // Show login page if not logged in
            setShowLogin(true);
            return;
        }

        if (!cartItem[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
        } else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        }

        // Update product quantity in the backend
        const updatedProductList = product_list.map(product => {
            if (product._id === itemId) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setProductList(updatedProductList);

        await axios.post(`${url}/api/cart/add`, { itemId }, { headers: { token } });
    }

    const removeFromCart = async (itemId) => {
        if (!token) {
            // Show login page if not logged in
            setShowLogin(true);
            return;
        }

        if (cartItem[itemId] > 0) {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

            // Update product quantity in the backend
            const updatedProductList = product_list.map(product => {
                if (product._id === itemId) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
            setProductList(updatedProductList);

            await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = product_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItem[item];
                }
            }
        }
        return totalAmount;
    }

    const fetchProductList = async () => {
        const response = await axios.get(url + "/api/product/list");
        setProductList(response.data.data);
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
            setCartItems(response.data.cartData);
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    const fetchUserId = async () => {
        try {
            const response = await axios.get(`${url}/api/user/current`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const fetchedUserId = response.data.userId;
            setUserId(fetchedUserId);
            localStorage.setItem('userId', fetchedUserId);
        } catch (error) {
            console.error('Error fetching userId:', error);
        }
    };

    const fetchRecommendations = async (userId) => {
        try {
            const response = await axios.get(`${url}/api/recommendation/user/${userId}`);
            setRecommendedProducts(response.data.recommendations);
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchProductList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
            const storedUserId = localStorage.getItem("userId");
            if (storedUserId) {
                setUserId(storedUserId);
                fetchRecommendations(storedUserId);
            } else {
                await fetchUserId();
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchRecommendations(userId);
        }
    }, [userId]);

    const contextValue = {
        product_list, cartItem, setCartItems, addToCart, removeFromCart, getTotalCartAmount, url, setToken, token, showLogin, setShowLogin, userId, recommendedProducts
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
