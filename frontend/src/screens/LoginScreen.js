import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import {Form ,Button, Row, Col} from "react-bootstrap"
import { useDispatch, useSelector} from "react-redux"
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import {login } from "../actions/userAction"

import FormContainer from '../Components/FormContainer'; 


const LoginScreen = () => {

    const [email , setEmail] = useState("")
    const [password, setPassword] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogin = useSelector((state)=> state.userLogin)
    const {loading, error, userInfo} = userLogin 

    const location = useLocation();

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
            console.log(`from login page ${redirect}`);
        }
    }, [redirect, userInfo, navigate]);

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(login(email, password))
    }

  return (
    <>
        <FormContainer> 
            <h1> Sign in </h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                {/* controlId='email' */}
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label> Email Address : </Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        onChange={(e)=>setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                {/* controlId='password' */}
                <Form.Group controlId='password'>
                    <Form.Label> Password : </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        onChange={(e)=>setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='dark' className='my-3' >
                    Sign in 
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    New Customer ? <Link to={ redirect ? `/register?redirect=${redirect}` : "/register"}>
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    </>
  )
}

export default LoginScreen