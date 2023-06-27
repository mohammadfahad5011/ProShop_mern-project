import axios from 'axios'
import {PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCSESS , PRODUCT_DETAILS_FAIL} from '../constant/ProductDetailsConstant' ;


export const SingleProductDetails = (productId) => async(dispatch) =>{
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST}) 

        const {data} = await axios.get(`/api/v1/${productId}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCSESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
} 
