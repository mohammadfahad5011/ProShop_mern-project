import React,  {  useState, useEffect} from 'react' ;
import {Row, Col , Image, Card , ListGroup, Button , Form} from 'react-bootstrap'
import { useDispatch , useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom' ;
// import { AddToCart } from '../actions/CartAction';
import { SingleProductDetails } from '../actions/productDetailsAction';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Ratings from '../Components/Ratings';







// import products from '../products';
// const products = {}

const ProductScreen = () => {

    const [qty , setQty] = useState(1);

    const params = useParams();

    // comes from app.js component id ("/product/:id")==>
    // const productId = params.id;
    const dispatch = useDispatch();

    const productDetails = useSelector( (state) => state.productDetails)
    const {loading, error , product } = productDetails

    useEffect(()=>{
        dispatch(SingleProductDetails(params.id))
    }, [dispatch, params])

    // const product = products.find((product) => product._id === productId )

    // const product = {}

    const navigate = useNavigate();
    const addToCartHandler = () => {
        navigate(`/cart/${params.id}?qty=${qty}`);
    }


  return (
    <>
        <section className="singleProduct">
            <Link className='btn btn-dark my-3' to='/'>
                Go back 
            </Link>
            {loading ?( <Loader/> ) : error ? ( <Message variant='danger'> {error} </Message> ) : (<Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md ={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item variant="info">
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Ratings rating = {product.rating} text={product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description:{product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price:
                                    </Col>
                                    <Col>
                                        <strong>
                                            ${product.price}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        <strong>
                                            {product.countInStock > 0 ? 'in Stock' : 'Out of Stock'}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>


                            {
                                product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row >
                                            <Col className='d-flex align-items-center'>
                                                Quantity :
                                            </Col>

                                            <Col>
                                                <Form.Select as="select" value={qty} onChange={(e)=>{setQty(e.target.value)}}>
                                                    {
                                                        [...Array(product.countInStock)].map((_, i)=>{
                                                            return( <option key={i+1} value={i+1}>{i+1}</option> )
                                                        })
                                                    }
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            }

                            <ListGroup.Item>
                                <Button 
                                    onClick={addToCartHandler}
                                    className='btn-block w-100'
                                    type='button'
                                    disabled={product.countInStock === 0}
                                >
                                    Add To Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>)}
            

        </section>
    </>
  )
}

export default ProductScreen