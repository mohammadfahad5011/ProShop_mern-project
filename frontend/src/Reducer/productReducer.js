import {PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCSESS, PRODUCT_LIST_FAIL} from '../constant/productConstant'

export const productListReducer = ( state = {products:[]}, action ) =>{
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true , products: []}

        case PRODUCT_LIST_SUCSESS:
            return { loading: false , products: action.payload}

        case PRODUCT_LIST_FAIL:
            return { loading: false , error: action.payload}
            
        default:
            return state;
    }
}