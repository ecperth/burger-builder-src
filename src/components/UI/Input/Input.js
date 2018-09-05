import React from 'react';
import classes from './input.css';

const input = (props) => {

    let inputElement = null;
    let errorMessage = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.touched){
        inputClasses.push(classes.Invalid)
        errorMessage = <p style={{color: 'red'}}>Please enter a valid {props.field}</p>
    }

    switch (props.inputtype){
        case ('input'):
            inputElement = 
            <input 
                className={inputClasses.join(' ')} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
        break;
        case ('textarea'):
            inputElement = 
            <textarea 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
        break;
        case ('select'):
            inputElement = 
            <React.Fragment>
            <h3>Delivery Method?</h3>
            <select
                className={classes.InputElement} 
                value={props.value}
                onChange={props.changed}>
                {props.elementConfig.options.map(op => (
                <option key={op.value} value={op.value}>{op.displayValue}</option>))}
            </select>
            </React.Fragment>
        break;
        default:
            inputElement = <input 
                className={classes.InputElement} 
                {...props.elementConfig} 
                value={props.value}
                onChange={props.changed}
            />
        break;
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    )
}

export default input;