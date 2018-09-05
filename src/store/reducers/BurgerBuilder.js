import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../utility'


const INGREDIENT_PRICES = {
    salad: 1.0,
    cheese: 1.5,
    meat: 4.0,
    bacon: 2.5
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    purchasing: false
};

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
        const updatedIngredient = {[action.ingredient]: state.ingredients[action.ingredient] + 1};
        const updatedIngredients = updateObject(state.ingredients, updatedIngredient)
        const updateState = {
            ingredients: updatedIngredients,
            totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
        }
        return (updateObject(state, updateState));
        
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredient]: state.ingredients[action.ingredient] - 1
                }
                ,totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
            };

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients,
                error: false,
                totalPrice: action.price
            };

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
                }
        case actionTypes.TOGGLE_PURCHASING:
            return {
                ...state,
                purchasing: !state.purchasing
            };
        default: return state;
    }
}

export default reducer;

