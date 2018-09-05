import React, {Component} from 'react';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import axios from '../../../AxiosOrders';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index' 


class BurgerBuilder extends Component {

    state = {
        purchaseModal: false,
    }

    componentDidMount() {
        if (this.props.purchasing){
            this.setState({purchaseModal: !this.state.purchaseModal})
        }
        const myIngs = this.props.purchased ? null : this.props.ings
        this.props.initIngredients(myIngs, this.props.price)
        this.props.resetPurchased()
    }

    checkIfPurchaseable = (ingredients) => {
        let sum = 0; 
        Object.keys(ingredients)
        .map(ing => sum = sum + ingredients[ing])

        return (sum>=1)
    }

    purchaseModalToggle = () => {
        this.props.togglePurchasing()
        this.setState({purchaseModal: !this.state.purchaseModal})
        if (!this.props.isAuth) this.props.history.push('/Auth')
    }

    purchaseContinueHandler = () => {
        this.props.togglePurchasing()
        this.props.history.push('/Checkout')
    }
  
    render() {
        const disabledInfo = {
            ...this.props.ings
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = <Spinner />;
        
        if(this.props.ings){
        burger =    
            <React.Fragment>
                <Burger ingredients = {this.props.ings}/>                
                <BuildControls 
                    price={this.props.price}
                    disabledInfo={disabledInfo}
                    more={this.props.addIngredient}
                    less={this.props.removeIngredient}
                    purchaseable={this.checkIfPurchaseable(this.props.ings)}
                    purchase={this.purchaseModalToggle}
                    isAuth={this.props.isAuth}
                />
            </React.Fragment>
        }

        if(this.props.err){
        burger = <p>Ingredients cant be loaded</p>
        }

        let orderSummary = <Spinner />

        if (!this.state.loading && this.state.purchaseModal){
            orderSummary = <OrderSummary 
                show={this.state.purchaseModal}
                continue={this.purchaseContinueHandler} 
                cancel={this.purchaseModalToggle} 
                ingredients={this.props.ings} 
                price={this.props.price}/>
        }

        return(
            <React.Fragment>
                {burger}
                <Modal close={this.purchaseModalToggle} show={this.state.purchaseModal}>
                    {orderSummary}
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        err: state.burgerBuilder.error,
        isAuth: state.auth.userID != null,
        purchasing: state.burgerBuilder.purchasing,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (ingName) => dispatch(actions.addIngredient(ingName)),
        removeIngredient: (ingName) => dispatch(actions.removeIngredient(ingName)),
        initIngredients: (ings, price) => dispatch(actions.initIngredients(ings, price)),
        resetPurchased: () => dispatch(actions.resetPurchased()),
        togglePurchasing: () => dispatch(actions.togglePurchasing()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));