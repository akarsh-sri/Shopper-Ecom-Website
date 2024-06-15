import React from 'react'
// import all_products from '../Components/assets/all_product'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import Breadcrum from '../Components/Breadcrum.jsx/Breadcrum'
import ProductDispaly from '../Components/ProductDisplay/ProductDispaly'
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
import { useEffect } from 'react'
import { useState } from 'react'

const Product = () => {
  const { productId } = useParams(ShopContext);
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
  // console.log(productId);
  const product = all_products.find((e) => e.id === Number.parseInt(productId));
  // console.log(product);
  return (
    <div>
      {product?<Breadcrum product={product}></Breadcrum>:<></>}
      {product?<ProductDispaly product={product}></ProductDispaly>:<></>}
      <DescriptionBox></DescriptionBox>
      <RelatedProducts></RelatedProducts>
    </div>
  )
}

export default Product