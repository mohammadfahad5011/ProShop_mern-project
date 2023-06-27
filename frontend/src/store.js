import {createStore, combineReducers, applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer} from './Reducer/productReducer'
import {productDetailsReducer} from './Reducer/ProductDetailsReducer'
import { cartDetailsReducer } from './Reducer/CartReducer';
import { userLoginReducer , userRegisterReducer, userDetailsReducer, userUpdateProfileReducer} from './Reducer/userReducer';
import { orderCreateReducer , orderDetailsReducer} from './Reducer/OrderReducer';
import thunk from 'redux-thunk'



const reducer = combineReducers({
    productList : productListReducer,
    productDetails: productDetailsReducer,
    cart : cartDetailsReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails :orderDetailsReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userinfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

// we do Extra 
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ""

const initialState = {
    cart : {cartItems: cartItemsFromStorage, shippingAddress:shippingAddressFromStorage, paymentMethod:paymentMethodFromStorage},
    userLogin : {userInfo: userinfoFromStorage}
}
const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store ;
