import React, { useEffect, useState } from 'react'
import { useNavigate} from "react-router-dom"
import {Form ,Button, Row, Col} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Loader from '../Components/Loader';
import Message from '../Components/Message';

import { getUserDetails, updateUserProfile } from '../actions/userAction';
import { USER_UPDATE_PROFILE_RESET } from '../constant/userConstant';






const ProfileScreen = () => {

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfimPassword] = useState('')
    const [message, setMessage] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector((state)=> state.userDetails)
    const {loading, error, user} = userDetails 

    const userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin

    const userUpdateProfile = useSelector((state)=> state.userUpdateProfile)
    const {success} = userUpdateProfile 



    

    // const location = useLocation();

    useEffect(()=>{
        if(!userInfo){
            navigate('/login')
        } else {
            if(!user.name || success){
                dispatch({
                    type: USER_UPDATE_PROFILE_RESET
                })
                dispatch(getUserDetails('profile'))
            } else {
                // Form ee users er details dekhar jonne 
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, navigate, userInfo, user, success]);

    const submitHandler = (e) =>{
        e.preventDefault()
        //DISPATCH REGISTER
        if(password !== confirmPassword){
            setMessage("Password do not match")
        } else{
            //DISPATCH UPDATE PROFILE
            dispatch(updateUserProfile({
                id: user._id, name, email, password
            }))
        }
    }

  return (
    <>
        <Row>
            <Col md={3}>
                <h1> User Profile </h1>
                {message && <Message varinat ="danger">{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {success && <Message variant='success'> "Update successfull" </Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>

                    {/* controlId='name' */}
                    <Form.Group controlId='name'>
                        <Form.Label> Name : </Form.Label>
                        <Form.Control
                            value={name}
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
                            value={email}
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
                        Update
                    </Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2> My Order</h2>
            </Col>
        </Row>
    </>
  )
}

export default ProfileScreen