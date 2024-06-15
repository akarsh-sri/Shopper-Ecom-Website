const port = 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const { type } = require('os');

app.use(express.json());
app.use(cors());

//mongodb+srv://srivastavaakarsh973:pass@1234@cluster0.yf8ydl9.mongodb.net/
mongoose.connect("mongodb+srv://srivastavaakarsh973:pass%401234@cluster0.yf8ydl9.mongodb.net/ecom");

app.get('/', (req, res) => {
    res.send("Hello World!");
})

// image storage

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
})

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'))

// upload endpoint
app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:3000/images/${req.file.filename}`
    })
})

// schema

const Product = mongoose.model('Product', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// API for adding product

app.post('/addproduct', async (req, res) => {
    let p = await Product.find({});
    let id;
    if (p.length > 0) {
        let last_array = p.slice(-1);
        let lp = last_array[0];
        id = lp.id + 1;
    } else id = 1;
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("save");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// API for getting all product

app.get('/allproducts', async (req, res) => {
    let p = await Product.find({});
    console.log("fetched");
    res.send(p);
})

// API for removing product

app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Schema for user
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

// API for user creation
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            error: "Email already exists",
        })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })
    await user.save();
    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true,
        token
    })
})

// User login

app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({
                success: false,
                error: "Incorrect Password"
            })
        }
    } else {
        res.json({
            success: false,
            error: "Wrong Email ID"
        })
    }
})


// API for newly added product

app.get('/newcollection', async (req, res) => {
    let p = await Product.find({});
    let nc = p.slice(1).slice(-8);
    res.send(nc);
})

// api for popular in women
app.get('/women', async (req, res) => {
    let p = await Product.find({ category: "women" });
    let nc = p.slice(1).slice(-4);
    res.send(nc);
})


// middleware to fetch user

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Invalid Token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({ errors: "Invalid Token" });
        }
    }
}

// API for adding data to cart

app.post('/addtocart', fetchUser, async (req, res) => {
    // console.log(req.body.itemId,req.user);
    let ud = await Users.findOne({ _id: req.user.id });
    // console.log(ud.cartData);
    ud.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id},{ cartData: ud.cartData });
    res.send("Added");
})

app.post('/remove', fetchUser, async (req, res) => {
    // console.log(req.body.itemId,req.user);
    let ud = await Users.findOne({ _id: req.user.id });
    // console.log(ud.cartData);
    ud.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id},{ cartData: ud.cartData });
    res.send("Removed");
})


app.post('/getcart', fetchUser, async (req, res) => {
    // console.log(req.body.itemId,req.user);
    let ud = await Users.findOne({ _id: req.user.id });
    // console.log(ud.cartData);
    res.json(ud.cartData);
})




app.listen(port, (error) => {
    if (!error) {
        console.log("Running on port " + port);
    } else {
        console.log(error);
    }
})