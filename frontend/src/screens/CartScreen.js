import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../Components/Message";
import { AddToCart, RemoveFromCart } from "../actions/CartAction";

const CartScreen = () => {
  const params = useParams();
  const productId = params.id;

  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(AddToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(RemoveFromCart(id));
  };

  const navigate = useNavigate();

  const checkOutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              {" "}
              Your Cart is Empty{" "}
              <Link to="/" className="btn btn-light ms-2">
                {" "}
                Go Back
              </Link>{" "}
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item.product}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>$ {item.price}</Col>
                      <Col md={2}>
                        <Form.Select
                          as="select"
                          value={item.qty}
                          onChange={(e) => {
                            dispatch(
                              AddToCart(item.product, Number(e.target.value))
                            );
                          }}
                        >
                          {[...Array(item.countInStock)].map((_, i) => {
                            return (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Col>

                      <Col md={2}>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fa fa-trash"></i>
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  {" "}
                  Subtotal ({" "}
                  {cartItems.reduce((total, item) => total + item.qty, 0)} )
                  items{" "}
                </h2>
                Total : ${" "}
                {cartItems
                  .reduce((total, item) => total + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block w-100"
                  disabled={cartItems.length === 0}
                  onClick={checkOutHandler}
                >
                  Procced to Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
