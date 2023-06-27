import React, { useEffect} from 'react'
import { useNavigate, Link} from "react-router-dom"
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../Components/Message"
import CheckoutSteps from '../Components/CheckoutSteps';
import { createOrder } from '../actions/orderAction'



const PlaceOrderScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state)=> state.cart)

    // Calculate prices  Part::

    // Convert all total into decimal calculations.
    const addDecimals = (num) =>{
        return (
            Math.round((num*100)/100).toFixed(2)
        )
    }

    // calculate items price 
    cart.itemPrice = addDecimals(
        cart.cartItems.reduce((total, item)=> total + item.price*item.qty, 0)
    )

    // calculate shipping price:
    cart.shippingPrice = addDecimals(
        cart.itemPrice > 500 ? 0 : 100
    )

    //calculate tax price :
    cart.taxPrice = addDecimals(
        Number((0.10*cart.itemPrice).toFixed(2))
    )

    //calculate totall price : 
    cart.totalPrice = (Number(cart.itemPrice)+ Number(cart.shippingPrice)+ Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector((state)=> state.orderCreate)
    const { success, error, order} = orderCreate;
    
    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    },[success, navigate])


    const placeOrderHandler =()=>{
        dispatch(createOrder({
            orderItems:cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod:cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            taxPrice: cart.taxPrice,
            shippingPrice:cart.shippingPrice,
            totalPrice:cart.totalPrice,
        }))
    }

  return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h2> Shipping </h2>
                        <p><strong>Address : </strong> {cart.shippingAddress.address} , {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}</p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Payment Method</h2>
                        <p><strong>Method:</strong> {cart.paymentMethod} </p>
                    </ListGroupItem>
                    <ListGroupItem>
                        <h2>Order Items</h2>
                        {cart.cartItems.length === 0 ? (
                            <Message>Your Cart is Empty !</Message>
                        ) : (
                            <ListGroup variant='flus'>
                                {cart.cartItems.map((item, index)=>{
                                    return(
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image 
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}> 
                                                    {item.qty} x ${item.price} = ${item.qty*item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    )
                                })}
                            </ListGroup>
                        )}
                    </ListGroupItem>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2> Order Summary :</h2>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col> Items :</Col>
                                <Col>${cart.itemPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Shipping :</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Tax :</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                <Col>Total :</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            {error && <Message variant="danger">{error}</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button 
                                type='button' 
                                className='btn btn-block w-100' 
                                disabled={cart.cartItems === 0}
                                onClick={placeOrderHandler}
                            > 
                                PLaceorder
                            </Button>
                        </ListGroupItem>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  )
}

export default PlaceOrderScreen