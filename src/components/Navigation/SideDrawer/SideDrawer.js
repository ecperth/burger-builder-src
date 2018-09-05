import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

    let sideDrawerClass = props.open ? [classes.SideDrawer, classes.Open].join(' ') :  [classes.SideDrawer, classes.Close].join(' ')

    return(
        <React.Fragment>
            <div className={sideDrawerClass}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems loggedIn={props.loggedIn} clicked={props.clicked}/>
                </nav>
            </div>
            <Backdrop show={props.open} close={props.clicked}/>
        </React.Fragment>
    );
};

export default sideDrawer;