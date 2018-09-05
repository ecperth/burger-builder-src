import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = (props) => {

    const Auth = props.loggedIn ?   <React.Fragment>
                                        <NavigationItem link="/Orders">Orders</NavigationItem>
                                        <NavigationItem link="/logout">Sign Out</NavigationItem> 
                                    </React.Fragment>
                                :   <NavigationItem link="/Auth">Login</NavigationItem>
    return(
    <ul className={classes.NavigationItems} onClick={props.clicked}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        {Auth}
    </ul>
    )
}

export default navigationItems;

 