import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
import { useEffect } from 'react'
import { useState } from 'react'
const CartItems = () => {
    const { getTotal, cartItem, addToCart, removefromCart } = useContext(ShopContext);
    const [all_products, setall_products] = useState([]);

    const fun = async () => {
        let res = await fetch('http://localhost:3000/allproducts');
        let fres = await res.json();
        // console.log(fres);
        setall_products(fres);
    }

    useEffect(() => {
        fun();
    }, [])
    return (
        <div className='cartitems'>
            <div className="format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />

            {
                all_products.map((e, i) => {
                    if (cartItem[e.id] > 0) {
                        return <div key={i}>
                            <div className="format format-main">
                                <img src={e.image} alt="" className='product-icon' />
                                <p>{e.name}</p>
                                <p>${e.new_price}</p>
                                <button className='quan'>{cartItem[e.id]}</button>
                                <p>${e.new_price * cartItem[e.id]}</p>
                                <img className='rem' src={remove_icon} alt="" onClick={() => { removefromCart(e.id) }} />
                            </div>
                            <hr />
                        </div>
                    }
                    return null;
                })
            }
            <div className="down">
                <div className="total">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="total-item">
                            <p>Subtotal</p>
                            <p>${getTotal()}</p>
                        </div>
                        <hr />
                        <div className="total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="total-item">
                            <h3>Total</h3>
                            <h3>${getTotal()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="promo">
                    <p>If you have a promo code, Enter here</p>
                    <div className="promobox">
                        <input type="text" placeholder='Promo Code' />
                        <button>Submit</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CartItems