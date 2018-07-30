import React from 'react';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientList = Object.keys(props.ingredients)
    .map(ing => props.ingredients[ing] > 0 ? <li key={ing}><span style={{textTransform: 'capitalize'}}>{ing}</span>: {props.ingredients[ing]}</li> : null)

    return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientList}</ul>
            <p>Costing: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.continue} btnType='Success'>Continue</Button>
            <Button btnType='Danger' clicked={props.cancel}>Cancel</Button>
        </React.Fragment>);
}

export default orderSummary;