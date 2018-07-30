import React, {Component} from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            cheese: 0,
            salad: 0,
            meat: 0,
            bacon: 0
        },
        totalPrice: 4,
        purchaseable: false,
        purchaseModal: false
    }

    addIngredientHandler = (type) => {

        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] + 1;
        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients  ,totalPrice: newPrice})

        this.checkIfPurchaseable(updatedIngredients);
    }

    removeIngredientHandler = (type) => {

        if(this.state.ingredients[type] <= 0){
            return(null);
        }
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = this.state.ingredients[type] - 1;
        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({ingredients: updatedIngredients , totalPrice: newPrice})

        this.checkIfPurchaseable(updatedIngredients);
    }

    checkIfPurchaseable = (ingredients) => {
        let sum = 0; 
        Object.keys(ingredients)
        .map(ing => sum = sum + ingredients[ing])

        this.setState({purchaseable: sum>=1})
    }

    purchaseModalToggle = () => {
        this.setState({purchaseModal: !this.state.purchaseModal})
    }

    purchaseContinueHandler(){
        alert('YOU CONTINUED');
    }
  
    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return(
            <React.Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    price={this.state.totalPrice}
                    disabledInfo={disabledInfo}
                    more={this.addIngredientHandler}
                    less={this.removeIngredientHandler}
                    purchaseable={this.state.purchaseable}
                    purchase={this.purchaseModalToggle}
                />
                <Modal close={this.purchaseModalToggle} show={this.state.purchaseModal}>
                    <OrderSummary 
                        continue={this.purchaseContinueHandler} 
                        cancel={this.purchaseModalToggle} 
                        ingredients={this.state.ingredients} 
                        price={this.state.totalPrice}/>
                </Modal>
            </React.Fragment>
        )
    }

}

export default BurgerBuilder;