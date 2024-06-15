import React, { useState } from 'react'
import { useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png'
import './ListProduct.css'

const ListProduct = () => {

  // await fetch('http://localhost:3000/allproducts').then((res)=>res.json()).then((data)=>{setall_p(data)});

  const [all_p, setall_p] = useState([]);

  const fetchData = async () => {
    let res = await fetch('http://localhost:3000/allproducts');
    let fres = await res.json();
    setall_p(fres);
  }

  const remove = async (id) => {
    await fetch('http://localhost:3000/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    })
    await fetchData();
  }


  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className='list-product'>
      <h1>All Product List</h1>
      <div className="format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        all_p.map((e, i) => {
          return (<div key={i} className="format-main lpf">
            <img src={e.image} alt="" className='picon' />
            <p>{e.name}</p>
            <p>${e.old_price}</p>
            <p>${e.new_price}</p>
            <p>{e.category}</p>
            <img src={cross_icon} onClick={() => { remove(e.id) }} className='rem' alt="" />
          </div>)
        })
      }
    </div>
  )
}

export default ListProduct