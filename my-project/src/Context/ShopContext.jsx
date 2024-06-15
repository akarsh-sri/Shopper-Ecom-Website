import React from "react";
import { createContext } from "react";
// import all_products from '../Components/assets/all_product'
export const ShopContext = createContext(null);
import { useState } from "react";
import { useEffect } from "react";

const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [cartItem, setcartItem] = useState(getDefaultCart());
    const [all_products, setall_products] = useState([]);

    const fun = async () => {
        let res = await fetch('http://localhost:3000/allproducts');
        let fres = await res.json();
        // console.log(fres);
        setall_products(fres);
    }

    useEffect(() => {
        fun();
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3000/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:"",
            }).then((res) => res.json()).then((data) => setcartItem(data));
        }
    }, [])



    const addToCart = (itemId) => {
        setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3000/addtocart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((res) => res.json()).then((data) => console.log(data));
        }
    }
    const removefromCart = (itemId) => {
        setcartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:3000/remove', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "itemId": itemId }),
            }).then((res) => res.json()).then((data) => console.log(data));
        }
    }

    const getTotal = () => {
        let sum = 0;
        for (const i in cartItem) {
            if (cartItem[i] > 0) {
                let info = all_products.find((product) => product.id === Number.parseInt(i));
                if (info) {
                    sum += info.new_price * cartItem[i];
                }
            }
        }

        return sum;
    }

    const getsum = () => {
        let ans = 0;
        for (const i in cartItem) {
            if (cartItem[i] > 0) {
                ans += Number.parseInt(cartItem[i]);
            }
        }
        return ans;
    }

    const contextValue = { getsum, getTotal, all_products, cartItem, addToCart, removefromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;