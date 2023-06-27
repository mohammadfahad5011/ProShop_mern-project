import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Ratings from './Ratings';

const Product = ({product}) => {
     // eslint-disable-next-line
    const {_id, name, image , description , brand, category , price , countInStock, rating, numReviews} = product
  return (
    <>  
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${_id}`}>
                <Card.Img src={image} variant='top'/>
            </Link>

            <Card.Body>
                <Link to={`/product/${_id}`}>
                    <Card.Title as='div'>
                        <strong>{name}</strong>
                    </Card.Title>
                </Link> 

                <Card.Text as='div'>
                    <Ratings rating = {rating} text={numReviews}/>
                </Card.Text>

                <Card.Text as='h3'>
                    ${price}
                </Card.Text>
            </Card.Body>
        </Card>
    </>
  )
}

export default Product