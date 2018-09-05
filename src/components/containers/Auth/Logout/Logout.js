import React, { Component } from 'react'
import Button from '../../../UI/Button/Button'
import Spinner from '../../../UI/Spinner/Spinner'
import classes from '../Auth.css'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions/index'
import {Redirect} from 'react-router-dom';

class Auth extends Component {

    onAuth = (event) => {
    
        event.preventDefault()
        if (this.state.loginMode){
            this.props.login(this.state.controls.email.value, this.state.controls.password.value)
        }
        else{
            this.props.register(this.state.controls.email.value, this.state.controls.password.value)
        }

    }

    render() {
        let options = <Redirect to='/'/>

        if (this.props.login){
            options = (
                <div>
                    <p>Are you sure you want to sign out?</p>
                    <Button btnType='Success' clicked={this.props.logout}>Yes</Button>
                </div>
            )

        }

        if (this.props.loading){
            options = <Spinner />
        }
        return(
            <div className={classes.AuthForm}>
                {options}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return{
        login: state.auth.token !== null,
        loading: state.auth.loading,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        logout: () => dispatch(actions.logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);