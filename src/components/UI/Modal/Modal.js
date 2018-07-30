import React from 'react';
import classes from './Modal.css';
import classNames from 'classnames';
import Backdrop from '../../UI/Backdrop/Backdrop';

const modal = (props) => {

    const modalClassNames = props.show ?  classNames(classes.Modal, classes.Modal_open) :classes.Modal

    return(
    <React.Fragment>
    <Backdrop close={props.close} show={props.show}/>
        <div className={modalClassNames}>
            {props.children}
        </div>
    </React.Fragment>
    )
};

export default modal;