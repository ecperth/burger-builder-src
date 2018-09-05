import * as actionTypes from './actionTypes'
import axios from '../../AxiosOrders'

//-------------------------------------------------------------------------------
//ORDERING

export const orderBurgerSuccess = (data, id) => {
    return {
        type: actionTypes.ORDER_BURGER_SUCCESS,
        order: data,
        id: id
    }
}

export const orderBurgerFail = (error) => {
    return {
        type: actionTypes.ORDER_BURGER_FAIL,
        error: error
    }
}

export const orderBurgerTry = () => {
    return {type: actionTypes.ORDER_BURGER_TRY}
}

export const orderBurgerStart = (orderData, token) => {
    return dispatch => {
        dispatch(orderBurgerTry())
        console.log(orderData)
        axios.post('orders.json?auth=' + token, orderData)
            .then(response => {
                dispatch(orderBurgerSuccess(orderData, response.data.name))
            })
            .catch(error => {
                dispatch(orderBurgerFail(error))
            })
    }
}

//--------------------------------------------------------------------------------
//RESETTING PURCHASED VARIABLE 

export const resetPurchased = () => {
    return{
        type: actionTypes.RESET_PURCHASE
    }
}

//---------------------------------------------------------------------------------
//RETRIEVING ORDERS FROM FIREBASE

export const fetchOrdersSuccess = (data) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: data
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrdersTry = () => {
    return {type: actionTypes.FETCH_ORDERS_TRY}
}

export const fetchOrdersStart = (token, userid) => {
    return dispatch => {
        dispatch(fetchOrdersTry())
        axios.get('orders.json?auth=' + token + '&orderBy="userID"&equalTo="'+userid+'"')
        .then(response => {
            const fetchedOrders = [];
            for (let key in response.data){
                fetchedOrders.push({
                    ...response.data[key],
                    id: key})
                }
            dispatch(fetchOrdersSuccess(fetchedOrders))
        })
        .catch(error => {
            dispatch(fetchOrdersFail(error))
        })
        
    }
}
