import React , {useEffect} from 'react'
//after learning redux
// eslint-disable-next-line
import {useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productActions'

import {Row, Col} from "react-bootstrap"
//before learnning redux
// import products from '../products'
import Product from '../Components/Product'

import Loader from '../Components/Loader'
import Message from '../Components/Message'

// let products = []

const HomeScreen = () => {
    const dispatch = useDispatch()

    //for calling product
    const productList = useSelector( (state) => state.productList)
    console.log(productList);

    
    const {loading, error, products} = productList;

    useEffect(()=>{
        dispatch(listProducts())
    }, [dispatch]);
    
  return (
    <>
        <h1>Latest Product</h1>
        {loading ?( <Loader/> ) : error ? ( <Message variant='danger'> {error} </Message> ) : ( <Row>
            {products.map((product)=>{
                return(
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product= {product}/>
                    </Col>
                )
            })}
        </Row> )}
    </>
  )
}

export default HomeScreen