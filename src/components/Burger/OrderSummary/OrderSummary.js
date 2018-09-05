import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {


    componentWillUpdate(){
        console.log('[OrderSummary] will update')
    }

    render(){
        
        const ingredientList = Object.keys(this.props.ingredients)
        .map(ing => this.props.ingredients[ing] > 0 ? <li key={ing}><span style={{textTransform: 'capitalize'}}>{ing}</span>: {this.props.ingredients[ing]}</li> : null)

        return(
        <React.Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>{ingredientList}</ul>
            <p>Costing: <strong>${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={this.props.continue} btnType='Success'>Continue</Button>
            <Button btnType='Danger' clicked={this.props.cancel}>Cancel</Button>
        </React.Fragment>)
    }

}

export default OrderSummary;