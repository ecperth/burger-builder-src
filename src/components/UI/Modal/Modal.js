import React, {Component} from 'react';
import classes from './Modal.css';
import classNames from 'classnames';
import Backdrop from '../../UI/Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate = (nextProps) => nextProps.show !== this.props.show || nextProps.children !== this.props.children;

    render(){
        const modalClassNames = this.props.show ?  classNames(classes.Modal, classes.Modal_open) :classes.Modal

        return(
            <React.Fragment>
            <Backdrop close={this.props.close} show={this.props.show}/>
                <div className={modalClassNames}>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
};

export default Modal;