import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Checkout from './components/containers/Checkout/Checkout';
import Orders from './components/containers/Orders/Orders'
import Auth from './components/containers/Auth/Auth'
import Logout from './components/containers/Auth/Logout/Logout'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'

class App extends Component {

  componentDidMount() {
    this.props.checkLoggedIn()
  }


  
  render() {
    const Routes = this.props.isAuthenticated ? 
      <Switch>
        <Route path='/Orders' component={Orders}/>
        <Route path='/Logout' component={Logout}/>
        <Route path='/Checkout' component={Checkout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch> 
      :
      <Switch>
        <Route path='/Auth' component={Auth}/>
        <Route path='/Checkout' component={Checkout}/>
        <Route path='/' exact component={BurgerBuilder}/>
        <Redirect to='/'/>
      </Switch> 
    
    
    
    return (
      <div>
        <Layout>
          {Routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispathToProps = dispatch => {
  return{
    checkLoggedIn: () => dispatch(actions.checkIfLoggedIn())
  }
}

export default withRouter(connect(mapStateToProps, mapDispathToProps)(App));
