import axios from 'axios'
// eslint-disable-next-line
import { CART_ADD_ITEM, CART_REMOVE_ITEM , CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD} from '../constant/CartConstant'


// getState() ==> react redux function 
export const AddToCart = (id , qty) => async(dispatch , getState) =>{
   try {
    const {data} = await axios.get(`/api/v1/${id}`)

    dispatch({
        type: CART_ADD_ITEM ,
        payload : {
            product : data._id,
            name : data.name,
            image: data.image,
            price: data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))

   } catch (error) {
        console.log(error);
   }
} 


// Remover cart functionality :

export const RemoveFromCart = (id) => async(dispatch , getState) =>{
    try {
 
     dispatch({
         type: CART_REMOVE_ITEM ,
         payload : id,
     })
 
    localStorage.setItem('cartItems' , JSON.stringify(getState().cart.cartItems))
 
    } catch (error) {
         console.log(error);
    }
 } 


// SHIPPING ACTION Functionality:

export const saveShippingAddress = (data) => async (dispatch, getState)=>{
    try {
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload : data
        })

        localStorage.setItem("shippingAddress", JSON.stringify(getState().cart.shippingAddress))

    } catch (error) {
        console.log(error.mesaage);
    }
} 


// PAYMENT METHOD ACTION Functionality:

export const savePaymentMethod = (data) => async (dispatch)=>{
    try {
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload : data
        })

        localStorage.setItem("paymentMethod", JSON.stringify(data))

    } catch (error) {
        console.log(error.mesaage);
    }
} 
