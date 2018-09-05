import React, {Component} from 'react'
import classes from './ContactData.css'
import Button from '../../../UI/Button/Button'
import Spinner from '../../../UI/Spinner/Spinner'
import Input from '../../../UI/Input/Input'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/order'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import axios from '../../../../AxiosOrders'

class ContactData extends Component{

    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false,
                    isEmail: true
                }
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Address'
                },
                value: '',
                validation: {
                    required: true,
                    valid: false,
                    touched: false
                }
            },
            postal: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Post Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                    valid: false,
                    touched: false,
                    isNumeric: true
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'fastest',
                validation: {
                    valid: true
                }
            },
        },
        formIsValid: false,
        loading: false
    }

    OrderHandler = (event) => {
        event.preventDefault();
        const formData = {}
        for (let formElement in this.state.orderForm){
            formData[formElement] = this.state.orderForm[formElement].value
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userID: this.props.userId
        }

        this.props.onSubmitOrder(order, this.props.token)
    }


    checkValidity(value, rules) {
        let isValid = true;
        var emailFilter = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/

        if (rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength){
            isValid = value.trim().length >= rules.minLength && isValid;
        }

        if (rules.maxLength){
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        if (rules.isEmail){
            isValid = emailFilter.test(value.trim()) && isValid;
        }
        if (rules.isNumeric){
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }


       return(isValid)
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        let updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.validation.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.validation.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].validation.valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render(){
        const formElementsArray = [];
        for (var key in this.state.orderForm){
            formElementsArray.push(
                {
                    config: this.state.orderForm[key],
                    id: key
                }
            )
        }

        let form = (
        <form>
            {formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    field={formElement.id}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!(formElement.config.validation.valid)}
                    touched={formElement.config.validation.touched}
                    inputtype={formElement.config.elementType}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)}
                />
            ))}
            <Button clicked={this.OrderHandler} disabled={!this.state.formIsValid} btnType='Success'>ORDER</Button>
        </form>);
        if (this.props.loading){
            form = <Spinner />
        }
        return(
            <div className={classes.ContactData}>
                <h3>Enter your details below</h3>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        userId: state.auth.userID,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onSubmitOrder: (order, token) => dispatch(actions.orderBurgerStart(order, token)),
        onSubmitOrder: (order, token) => dispatch(actions.orderBurgerStart(order, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))