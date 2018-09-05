import React from 'react';

import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = (props) => {
    let transformedIngredients =  Object.keys(props.ingredients) ///returns array containing keys in object (ingredients).
                                    .map(igKey => [...Array(props.ingredients[igKey])] ///for each key an array is created where size of array = value paired to key.
                                    .map((_,i) => <BurgerIngredient key={igKey + i} type={igKey} />)) //for each element in each array an element is created where its type is key and key is (key+iterator) ie cheese0 cheese1 burger0
                                    .reduce((arr, el) => arr.concat(el)); //Each ingredint array is concatinated together
    
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please Add Ingredients</p>}                                
    
    return(
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top" />
        {transformedIngredients}
        <BurgerIngredient type="bread-bottom" />
    </div>);
}

export default Burger;