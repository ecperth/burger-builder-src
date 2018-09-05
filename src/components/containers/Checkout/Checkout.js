import React, {Component} from 'react';
import CheckoutSummary from '../../Order/CheckoutSummary/CheckoutSummary';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinueHandler = () => {
        this.props.history.replace('Checkout/contact-data')
    }

    render() {
        let summary = <Redirect to='/'/>
        if (this.props.ings && !this.props.purchased){
            summary =   <React.Fragment>
                            <CheckoutSummary continue={this.checkoutContinueHandler} cancelled={this.checkoutCancelHandler} ingredients={this.props.ings}/>
                            <Route  
                                path={this.props.match.path + '/contact-data'} 
                                component={ContactData}/>
                        </ React.Fragment>
        }
        return (
            <div style={{textAlign: 'center'}}>
                {summary}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);