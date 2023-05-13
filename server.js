const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel');
//app
const app = express();


//middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}));

//routes
app.get('/', (req, res) => {
    res.send('Hyy there!! This is Product CRUD APP, developed in Node.js, Express.js and Mongodb. Developed by Saad');
});

app.get('/blog', (req, res) => {
    res.send('Hello Blog!! My name is Saad');
});

// GET /products
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// GET /products/:id
app.get('/products/:id', async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

// POST /products
app.post('/products', async(req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

// PUT /products/:id
app.put('/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        if (!product) {
            res.status(404).json({message: 'Product not found'});
        }
        updatedProduct = await Product.findById(req.params.id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});        
    }
});

// DELETE /products/:id
app.delete('/products/:id', async(req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json({message: 'Product deleted successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});          
    }
});
//connect to mongodb

mongoose.
connect('mongodb+srv://admin:root@crudapi.tjltrih.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('[* ] - MongoDB Connected')
    //start server
    app.listen(3000, () => {
        console.log('[* ] - CRUD API is running on port 3000');
    });
}).catch((error) => {
    console.log(error);
});
