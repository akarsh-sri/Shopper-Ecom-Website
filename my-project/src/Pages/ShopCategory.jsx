import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext'
import drop from '../Components/assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import { useState } from 'react'
import { useEffect } from 'react'
// import all_product from '../Components/assets/all_product'

const ShopCategory = (props) => {
  // console.log(props.category)
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
    <div className='shop-category'>
      <img className='banner' src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={drop} alt="" />
        </div>
      </div>
      <div className="products">
        {
          all_products.map((item, i) => {
            if (item.category == props.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}></Item>
            }else{
              return null;
            }
          })
        }
      </div>
      <div className="more">
        Explore More
      </div>
    </div>
  )
}

export default ShopCategory