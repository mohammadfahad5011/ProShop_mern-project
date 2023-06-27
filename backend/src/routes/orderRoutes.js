const express = require("express");
const { addOrderItems , getOrderById} = require("../controllers/orderController");

const {protect} = require('../Middlewares/authMiddleware')


const router = express.Router();

// Creaet Order router
router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)

module.exports = router;