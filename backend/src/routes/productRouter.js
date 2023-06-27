const express = require("express");

const {getProducts , getProductById} = require('../controllers/productController')

const router = express.Router();


// router.get("/products", getProducts);
router.route('/products').get(getProducts)

// router.get("/:id",getProductById);
router.route('/:id').get(getProductById)

module.exports = router;
