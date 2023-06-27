const Order = require("../Models/OrderModal");
const asyncHandler = require('express-async-handler')

// @des      Create New Order
// @route    POST/api/v1/orders
// @access   Private
// create a product order
const addOrderItems = asyncHandler(async (req, res) => {
    try {
        const {orderItems,shippingAddress ,paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
        if(orderItems && orderItems.length === 0){
            res.status(400)
            throw new Error("No order Item!")
        } else{
            const order = new Order ({
                orderItems,
                user: verifiedUser._id,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                taxPrice,
                shippingPrice,
                totalPrice
            })

            const createdOrder = await order.save()
            res.status(201).json(createdOrder);
        }

    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
})


// @des      GET Order by id
// @route    GET/api/v1/orders/:id
// @access   Private
// get  product orders details by id

const getOrderById = asyncHandler(async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email")

        if(order){
            res.json(order)
        }else{
            res.status(404)
            throw new Error("Order Not Found")
        }

    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
})



module.exports = {addOrderItems,getOrderById}