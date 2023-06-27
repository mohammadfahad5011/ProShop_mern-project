import axios from 'axios'
// eslint-disable-next-line
import {ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS} from '../constant/orderConstant'


// create order action

export const createOrder = (order) => async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_CREATE_REQUEST });

    const {userLogin:{userInfo}} = getState();
    // const {userInfo}= getState().userLogin
  
    const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization : `Bearer ${userInfo.token}`
        },
      };
  
      const { data } = await axios.post("/api/v1/orders", order , config );
  
      dispatch({
        type:ORDER_CREATE_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error.message,
      });
    }
  };
  

// GET order Details

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {userLogin:{userInfo}} = getState();
    //const {userInfo}= getState().userLogin

  const config = {
      headers: {
        Authorization : `Bearer ${userInfo.token}`
      },
    };

    const { data } = await axios.get(`/api/v1/orders/${id}` , config );

    dispatch({
      type:ORDER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error.message,
    });
  }
};