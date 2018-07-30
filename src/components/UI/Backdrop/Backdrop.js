import React from 'react';
import classes from './Backdrop.css';
import classNames from 'classnames';

const backdrop = (props) => {

    const BackdropClassNames = props.show ?  classNames(classes.Backdrop, classes.Backdrop_open) :classes.Backdrop

    return(
        <div onClick={props.close} className={BackdropClassNames}>
            {props.children}
        </div>
    )
};

export default backdrop;