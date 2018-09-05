import React, {Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import MenuIcon from '../Navigation/MenuIcon/MenuIcon';
import { connect } from 'react-redux'

class Layout extends Component{

    state = {
        sideDrawer: false
    };

    toggleSideDrawerHandler = () =>{
        this.setState({sideDrawer: !this.state.sideDrawer})
    }

    updateDimensions = () => {
        const sideDrawerNew = document.documentElement.clientWidth > 499 ? false : this.state.sideDrawer;
        this.setState({sideDrawer: sideDrawerNew})
    }

    componentWillMount = () => {
        this.updateDimensions();
    }

    componentDidMount = () => {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render(){
        return(
            <React.Fragment>
                <SideDrawer loggedIn={this.props.loggedIn} open={this.state.sideDrawer} clicked={this.toggleSideDrawerHandler}/>
                <MenuIcon open={this.state.sideDrawer} click={this.toggleSideDrawerHandler}/>
                <Toolbar loggedIn={this.props.loggedIn} menuClicked={this.toggleSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </React.Fragment>

        )
    }
}

const mapStateToProps = state => {
    return{
        loggedIn: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);