import React, { useState } from 'react'
import { useNavigate} from "react-router-dom"
import {Form ,Button,} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import FormContainer from '../Components/FormContainer'; 
import { saveShippingAddress } from '../actions/CartAction';
import CheckoutSteps from '../Components/CheckoutSteps';



const ShippingScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state)=> state.cart)
    const {shippingAddress} = cart

    const [address , setAddress] = useState(shippingAddress.address)
    const [city , setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        navigate("/payment")
    }

  return (
    <>
        <FormContainer> 
            <CheckoutSteps step1 step2/>
            <h1> Shipping </h1>
            <Form onSubmit={submitHandler}>

                {/* controlId='adress' */}
                <Form.Group controlId='address'>
                    <Form.Label> Address : </Form.Label>
                    <Form.Control
                        type='text'
                        value ={address}
                        required 
                        placeholder='Enter address'
                        onChange={(e)=>setAddress(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* controlId='city' */}
                <Form.Group className='my-2' controlId='city'>
                    <Form.Label> City : </Form.Label>
                    <Form.Control
                        type='text'
                        value={city}
                        placeholder='Enter your city'
                        required
                        onChange={(e)=>setCity(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                 {/* controlId='postal code' */}
                 <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code: </Form.Label>
                    <Form.Control
                        type='text'
                        value={postalCode}
                        required
                        placeholder='Enter postal code'
                        onChange={(e)=>setPostalCode(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                 {/* controlId='country' */}
                 <Form.Group controlId='country'>
                    <Form.Label>Country: </Form.Label>
                    <Form.Control
                        type='text'
                        required
                        value={country}
                        placeholder='Enter country'
                        onChange={(e)=>setCountry(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='dark' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default ShippingScreen