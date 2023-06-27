import axios from 'axios'
import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCSESS, PRODUCT_LIST_FAIL} from '../constant/productConstant'


export const listProducts = () => async(dispatch) =>{
    try {
        dispatch({type: PRODUCT_LIST_REQUEST}) 

        const {data} = await axios.get('/api/v1/products')

        dispatch({
            type: PRODUCT_LIST_SUCSESS,
            payload: data
        })
        

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.message
        })
    }
} 
