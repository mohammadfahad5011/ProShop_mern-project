import React, { useState } from 'react'
import { useNavigate} from "react-router-dom"
import {Form ,Button,Col} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"

import FormContainer from '../Components/FormContainer'; 
import CheckoutSteps from '../Components/CheckoutSteps';

import {savePaymentMethod} from "../actions/CartAction"



const PaymentScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cart = useSelector((state)=> state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress){
        navigate("/shipping")
    }


    const [paymentMethod , setPaymentMethod] = useState("PayPal")

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        navigate("/placeorder")
    }

  return (
    <>
        <FormContainer> 
            <CheckoutSteps step1 step2 step3/>
            <h1> Payment Method </h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Method
                    </Form.Label>

                    <Col>
                        <Form.Check
                            type='radio'
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        ></Form.Check>

                        <Form.Check
                            type='radio'
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            onChange={(e)=>{setPaymentMethod(e.target.value)}}
                        ></Form.Check>

                    </Col>

                </Form.Group>

                <Button type='submit' variant='dark' className='my-3'>
                    Continue
                </Button>
            </Form>
        </FormContainer>
    </>
  )
}

export default PaymentScreen ;