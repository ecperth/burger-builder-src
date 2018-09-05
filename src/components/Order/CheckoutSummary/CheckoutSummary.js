import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import {withRouter} from 'react-router-dom'

const checkoutSummary = (props) => {
    let buttons = null;

    if (props.location.pathname==='/Checkout'){
        buttons = (<React.Fragment>
                     <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
                     <Button btnType="Success"clicked={props.continue}>CONTINUE</Button>
                    </React.Fragment>)
    }
    return (
        <div className={classes.checkoutSummary}>
            <h1> Enjoy your burger </h1>
            <div>
                <Burger ingredients={props.ingredients}/>
                {buttons}
            </div>

        </div>
    )
}

export default withRouter(checkoutSummary);