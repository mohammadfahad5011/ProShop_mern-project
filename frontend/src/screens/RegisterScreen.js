import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from "react-router-dom"
import {Form ,Button, Row, Col} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Components/Loader';
import Message from '../Components/Message';

import FormContainer from '../Components/FormContainer'; 
import { register } from '../actions/userAction';


const RegisterScreen = () => {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfimPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userRegister = useSelector((state)=> state.userRegister)

    const {loading, error, userInfo} = userRegister 

    const location = useLocation();

    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
            console.log(redirect);
        }
    }, [redirect, userInfo, navigate]);

    const submitHandler = (e) =>{
        e.preventDefault()
        //DISPATCH REGISTER
        if(password !== confirmPassword){
            setMessage("Password do not match")
        } else{
            dispatch(register(name, email, password))
        }

    }

  return (
    <>
        <FormContainer> 
            <h1> Sign Up </h1>
            {message && <Message varinat ="danger">{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                {/* controlId='name' */}
                <Form.Group controlId='name'>
                    <Form.Label> Name : </Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter name'
                        onChange={(e)=>setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

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

                 {/* controlId='Confirmed password' */}
                 <Form.Group controlId='confirmedPassword'>
                    <Form.Label>Confirm Password : </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        onChange={(e)=>setConfimPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='dark' className='my-3'>
                    Register
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Have an Account ? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    </>
  )
}

export default RegisterScreen