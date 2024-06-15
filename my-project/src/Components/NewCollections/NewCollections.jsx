import React from 'react'
import './NewCollections.css'
// import new_collections from '../assets/new_collections'
import Item from '../Item/Item'
import { useEffect } from 'react'
import { useState } from 'react'

const NewCollections = () => {
    const [nc, setnc] = useState([]);

    const fun = async () => {
        let res = await fetch('http://localhost:3000/newcollection');
        let fres = await res.json();
        // console.log(fres);
        setnc(fres);
    }

    useEffect(() => {
        fun();
    }, [])
    return (
        <div className='new-collections'>
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {
                    nc.map((item, i) => {
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}></Item>
                    })
                }
            </div>
        </div>
    )
}

export default NewCollections