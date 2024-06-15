import React, { useContext } from 'react'
import star_icon from '../assets/star_icon.png'
import star_dull_icon from '../assets/star_dull_icon.png'
import './ProductDisplay.css'
import { ShopContext } from '../../Context/ShopContext'
const ProductDispaly = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    return (
        <div className='productdisplay'>
            <div className="left">
                <div className="img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="display-img">
                    <img className='product-display-main-img' src={product.image} alt="" />
                </div>
            </div>
            <div className="right">
                <h1>{product.name}</h1>
                <div className="display-right">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="right-prices">
                    <div className='old'>
                        ${product.old_price}
                    </div>
                    <div className='new'>
                        ${product.new_price}
                    </div>
                </div>
                <div className="desc">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam totam nemo odit, dolor tenetur eveniet alias amet. Aliquid, vel animi!
                </div>
                <div className="right-size">
                    <h1>Select Size</h1>
                    <div className="display-right-size">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className='right-category'> <span>Category :</span>Women, T-Shirt, Crop Top </p>
                <p className='right-category'> <span>Tags :</span>Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDispaly