import React, { Component } from 'react'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Spinner from '../../UI/Spinner/Spinner'
import classes from './Auth.css'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    state = {
        controls: {
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
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    minLength: 6,
                    required: true,
                    valid: false,
                    touched: false
                }
            }

        },
        formIsValid: false,
        loading: false,
        loginMode: true
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

        return(isValid)
    }


    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.controls
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

        this.setState({controls: updatedOrderForm, formIsValid: formIsValid})
    }

    onAuth = (event) => {
    
        event.preventDefault()
        if (this.state.loginMode){
            this.props.login(this.state.controls.email.value, this.state.controls.password.value)
        }
        else{
            this.props.register(this.state.controls.email.value, this.state.controls.password.value)
        }

    }

    toggleAuthMode = () => {
        let newControls = {
            ...this.state.controls,
            email: {
                ...this.state.controls.email,
                value: '',
                validation: {
                    ...this.state.controls.email.validation,
                    valid: false,
                    touched: false
                }
            },
            password: {
                ...this.state.controls.password,
                value: '',
                validation: {
                    ...this.state.controls.password.validation,
                    valid: false,
                    touched: false
                }
            }
        }
        this.setState({controls: newControls, loginMode: !(this.state.loginMode)})
    }

    render() {

        const formElementsArray = [];
        for (var key in this.state.controls){
            formElementsArray.push(
                {
                    config: this.state.controls[key],
                    id: key
                }
            )
        }

        const text = this.state.loginMode ? {buttonText: 'Sign in', secondOption: 'create an account'} : {buttonText: 'create account', secondOption: 'log in to an existing account'}

        const errorMessage = this.props.error ? <p style={{color: 'red'}}>{this.props.error.message}</p> : null
        let form = <Redirect to='/'/>

        if(!this.props.login1) {
            
        form = (
            <React.Fragment>
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
                {errorMessage}
                <Button clicked={this.onAuth} disabled={!this.state.formIsValid} btnType='Success'>{text.buttonText}</Button>
            </form>
            <p>Or <Button clicked={this.toggleAuthMode} btnType='AuthToggle'>Click here</Button> to {text.secondOption}</p></React.Fragment>);
        }
            if (this.props.loading){
                form = <Spinner />
            }
        return(
            <div className={classes.AuthForm}>
                {form}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        login1: state.auth.token !== null,
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        register: (email, password) => dispatch(actions.authStart(email, password)),
        login: (email, password) => dispatch(actions.loginStart(email, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);