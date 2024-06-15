import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'


const AddProduct = () => {

    const [image, setimage] = useState(false);
    const [details, setdetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })

    const imageHandler = (e) => {
        setimage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value });
    }

    const Add_Product = async () => {
        // console.log(details);
        let responseData;
        let product = details;
        let formData = new FormData();
        formData.append('product', image);
        await fetch('http://localhost:3000/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((res) => res.json()).then((data) => { responseData = data });

        if (responseData.success) {
            product.image = responseData.image_url;
            // console.log(product);

            await fetch('http://localhost:3000/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((res) => res.json()).then((data) => {
                data.success ? alert("Product Added") : alert("Failed");
            })
        }


        


    }

    return (
        <div className='add-product'>
            <div className="itemfield">
                <p>Product Title</p>
                <input value={details.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
            </div>
            <div className="price">
                <div className="itemfield">
                    <p>Price</p>
                    <input value={details.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' />
                </div>
                <div className="itemfield">
                    <p>Offer Price</p>
                    <input value={details.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' />
                </div>
            </div>
            <div className="itemfield">
                <p>Product Category</p>
                <select value={details.category} onChange={changeHandler} name="category" className='selector'>
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kids">Kids</option>
                </select>
            </div>
            <div className="itemfield">
                <label htmlFor="file-input">
                    <img src={image ? URL.createObjectURL(image) : upload_area} className='thumbnail' alt="" />
                </label>
                <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
            </div>
            <button onClick={Add_Product} className='addproduct'>ADD</button>
        </div>
    )
}

export default AddProduct