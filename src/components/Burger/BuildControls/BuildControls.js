import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'}, 
    { label: 'Bacon', type: 'bacon'}, 
    { label: 'Cheese', type: 'cheese'}, 
    { label: 'Meat', type: 'meat'} 
]

const buildControls = (props) => {
    
    return(
        <div className={classes.BuildControls}>
            <p>Current Price: <strong>${props.price.toFixed(2)}</strong></p> 
            {controls.map(ctrl => <BuildControl 
                                    disabled={props.disabledInfo[ctrl.type]} 
                                    more={() => props.more(ctrl.type)} 
                                    less={() => props.less(ctrl.type)} 
                                    key={ctrl.label} 
                                    label={ctrl.label}/>
            )}
            <button onClick={props.purchase} disabled={!props.purchaseable} className={classes.OrderButton}>{props.isAuth ? 'Order Now' : 'Sign in to Order'}</button>
        </div>
    )
}

export default buildControls;