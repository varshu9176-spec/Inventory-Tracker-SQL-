const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/dashboard.html');
});

// Get All Products
app.get('/products', (req, res) => {

    db.query(
        'SELECT * FROM products',
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.json(result);
            }

        }
    );

});

// Add Product
app.post('/addProduct', (req, res) => {

    const {
        product_name,
        category,
        quantity,
        price
    } = req.body;

    db.query(
        'INSERT INTO products(product_name, category, quantity, price) VALUES (?, ?, ?, ?)',
        [
            product_name,
            category,
            quantity,
            price
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Product Added Successfully');
            }

        }
    );

});

// Update Product
app.put('/updateProduct/:id', (req, res) => {

    const id = req.params.id;

    const {
        product_name,
        category,
        quantity,
        price
    } = req.body;

    db.query(
        'UPDATE products SET product_name=?, category=?, quantity=?, price=? WHERE id=?',
        [
            product_name,
            category,
            quantity,
            price,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Product Updated Successfully');
            }

        }
    );

});

// Delete Product
app.delete('/deleteProduct/:id', (req, res) => {

    const id = req.params.id;

    db.query(
        'DELETE FROM products WHERE id=?',
        [id],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Product Deleted Successfully');
            }

        }
    );

});

// Stock In
app.put('/stockIn/:id', (req, res) => {

    const id = req.params.id;

    const quantity = parseInt(req.body.quantity);

    db.query(
        'UPDATE products SET quantity = quantity + ? WHERE id=?',
        [
            quantity,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Stock Added Successfully');
            }

        }
    );

});

// Stock Out
app.put('/stockOut/:id', (req, res) => {

    const id = req.params.id;

    const quantity = parseInt(req.body.quantity);

    db.query(
        'UPDATE products SET quantity = quantity - ? WHERE id=?',
        [
            quantity,
            id
        ],
        (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.send('Stock Removed Successfully');
            }

        }
    );

});

app.listen(3000, () => {

    console.log('Server Running on Port 3000');

});