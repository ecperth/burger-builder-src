import React from 'react';
import classes from './MenuIcon.css';

const menuIcon = (props) => {

    const MenuIconClasses = props.open ? [classes.MenuIcon, classes.MenuIconClose].join(' ') : classes.MenuIcon;
    const MenuIconMiddle = props.open ? classes.MenuIconClose__middle : classes.MenuIcon__middle;

return(
    <div onClick={props.click} className={MenuIconClasses}>
        <div className={MenuIconMiddle}/>
    </div>
)
}


export default menuIcon;