const productModal = require("../Models/ProductModal");

// @des      fetch all products
// @route    GET/api/products
// @access   Public
// get all products
const getProducts = async (req, res) => {
    try {
      const products = await productModal.find();
      res.status(201).send(products);
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
}

// @des      fetch single products
// @route    GET/api/products/:id
// @access   Public
// get single products

const getProductById =  async (req, res) => {
    try {
      const product = await productModal.findById(req.params.id);
      res.status(201).send(product);
    } catch (error) {
      res.status(404).json({ message: "product not found" });
      console.log(error.message);
    }
  }



module.exports = {getProducts, getProductById}