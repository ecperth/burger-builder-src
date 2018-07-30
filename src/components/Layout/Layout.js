import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import MenuIcon from '../Navigation/MenuIcon/MenuIcon';

class Layout extends Component{

    state = {
        sideDrawer: false
    };

    toggleSideDrawerHandler = () =>{
        this.setState({sideDrawer: !this.state.sideDrawer})
    }

    render(){
        
        return(
            <React.Fragment>
                <SideDrawer open={this.state.sideDrawer} clicked={this.toggleSideDrawerHandler}/>
                <MenuIcon open={this.state.sideDrawer} click={this.toggleSideDrawerHandler}/>
                <Toolbar menuClicked={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }

}

export default Layout;