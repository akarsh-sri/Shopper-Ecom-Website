import React from 'react'
import './Popular.css'
// import data_product from '../assets/data'
import Item from '../Item/Item'
import { useEffect } from 'react'
import { useState } from 'react'
const Popular = () => {
    const [women, setwomen] = useState([]);

    const fun = async () => {
        let res = await fetch('http://localhost:3000/women');
        let fres = await res.json();
        // console.log(fres);
        setwomen(fres);
    }

    useEffect(() => {
        fun();
    }, [])
    return (
        <div className='popular'>
            <h1>POPULAR IN WOMEN</h1>
            <hr />
            <div className="popular-item">
                {
                    women.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}></Item>
                    })
                }
            </div>
        </div>
    )
}

export default Popular