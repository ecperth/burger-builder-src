import * as actionTypes from '../actions/actionTypes'

const initialState = {
    error: false,
    loading: false,
    token: null,
    userID: null
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.AUTH_TRY:
        return {
            ...state,
            loading: true
        };
        
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
    
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
                userID: action.id
            };
            
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                token: null,
                userID: null
            };
        default: return state
        }
    }

export default reducer;