import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders: [],
    error: false,
    loading: false,
    purchased: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ORDER_BURGER_TRY:
        return {
            ...state,
            loading: true
        };

        case actionTypes.ORDER_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                purchased: true
            };
        
        case actionTypes.ORDER_BURGER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        case actionTypes.RESET_PURCHASE:
            return {
                ...state,
                purchased: false
            };

        case actionTypes.FETCH_ORDERS_TRY:
            return {
                ...state,
                loading: true
            };
    
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            };
        
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };

        default: return state;
    }
}

export default reducer;

