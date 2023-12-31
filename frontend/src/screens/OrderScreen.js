import React, { useEffect} from 'react'
import { Link, useParams} from "react-router-dom"
import { Row, Col, ListGroup, Image, Card, ListGroupItem} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../Components/Message"
import Loader from "../Components/Loader"
import { getOrderDetails } from '../actions/orderAction'

const OrderScreen = () => {

    const dispatch = useDispatch();
    const params = useParams();

    const orderId = params.id

    const orderDetails = useSelector((state)=> state.orderDetails)

    const {order, loading , error} = orderDetails 
    if(!loading){
        const addDecimals = (num) =>{
            return (
                Math.round((num*100)/100).toFixed(2)
            )
        }

        order.itemPrice = addDecimals(
            order.orderItems.reduce((total, item)=> total + item.price*item.qty, 0)
        )
    }
    
    useEffect(()=>{
        dispatch(getOrderDetails(orderId))
    },[dispatch, orderId])



  return loading ? <Loader/> : error  ? <Message variant="danger">{error}</Message> : (
            <>
                <h1>Order : {order._id} </h1>
                <Row>
                    <Col md={8}>
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h2> Shipping </h2>
                                <p><strong>Name :</strong>{order.user.name}</p>
                                <p>
                                <strong>Email:</strong>
                                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                </p>
                                <p>
                                    <strong>Address : </strong> {order.shippingAddress.address} , {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                </p>

                                {order.isDelivered? (
                                    <Message variant="success">Delivered on {order.deliveredAt}</Message>
                                ):(
                                    <Message variant="danger">Not Delivered !</Message>
                                )}

                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method:</strong> {order.paymentMethod} 
                                </p>
                                {order.isPaid ? (
                                    <Message variant="success">Paid on {order.paidAt}</Message>
                                ):(
                                    <Message variant="danger">Not Paid !!</Message>
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                <h2>Order Items</h2>
                                {order.orderItems.length === 0 ? (
                                    <Message>Your Order is Empty !</Message>
                                ) : (
                                    <ListGroup variant='flus'>
                                        {order.orderItems.map((item, index)=>{
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
                                        <Col>${order.itemPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Shipping :</Col>
                                        <Col>${order.shippingPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Tax :</Col>
                                        <Col>${order.taxPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Total :</Col>
                                        <Col>${order.totalPrice}</Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            </>
        )
}

export default OrderScreen