import * as actionTypes from './actionTypes'
import axios from '../../AxiosOrders'

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: name
    }
}

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: name
    }
}

export const setIngredients = (ingredients, price) => {
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
        price: price
    }
}

export const fetchIngredientsFailed = () => {
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const togglePurchasing = () => {
    return{
        type: actionTypes.TOGGLE_PURCHASING,
    }
}

export const initIngredients = (ings, price) => {
    if (ings) {
        return dispatch => {
            return dispatch(setIngredients(ings, price))
        }
    }
    else {
        return dispatch => {
            axios.get('ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data, 4))
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
        }
    }
}