const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const authenticateToken = require('../middlewares/authenticate');

// Route to display products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).send('Error fetching products');
  }
});

// Route to display a single product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    // Track visited products in session
    if (!req.session.visitedProducts) {
      req.session.visitedProducts = [];
    }
    if (!req.session.visitedProducts.includes(req.params.id)) {
      req.session.visitedProducts.push(req.params.id);
    }

    res.render('product', { product, user: req.user });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).send('Error fetching product');
  }
});

// Route to display visited products
router.get('/visited-products', authenticateToken, async (req, res) => {
  try {
    if (!req.session.visitedProducts || req.session.visitedProducts.length === 0) {
      return res.render('visited-products', { products: [], user: req.user });
    }

    const visitedProducts = await Product.find({ _id: { $in: req.session.visitedProducts } });
    res.render('visited-products', { products: visitedProducts, user: req.user });
  } catch (error) {
    console.error('Error fetching visited products:', error);
    res.status(500).send('Error fetching visited products');
  }
});

module.exports = router;

