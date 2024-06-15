import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from "../assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {
    const [menu, setmenu] = useState("shop");
    const {getsum}=useContext(ShopContext);
    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo}></img>
                <p>SHOPPER</p>
            </div>
            <ul className='nav-menu'>
                <li onClick={() => { setmenu("shop") }} > <Link to='/'>Shop</Link>  {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("men") }} ><Link to='/mens'>Mens</Link> {menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("women") }} ><Link to='/womens'>Womens</Link> {menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => { setmenu("kids") }} ><Link to='/kids'>Kids</Link> {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token')?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>:<Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className='nav-cart-count'>{getsum()}</div>
            </div>
        </div>

    )
}

export default Navbar