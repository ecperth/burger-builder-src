import React, {Component} from 'react'
import Order from '../../Order/Order'
import axios from '../../../AxiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../UI/Spinner/Spinner'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'

class orders extends Component {

    componentDidMount(){
        this.props.GetOrders(this.props.token, this.props.userID)
    }

    render(){
        
        let Orders = <Spinner />

        if (!this.props.loading){
            Orders = this.props.orders
            .map(order => 
                <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />)
        }

        return(
            <div>
                {Orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userID: state.auth.userID
    }
}

const mapDispatchToProps = dispatch => {
    return{
        GetOrders: (token,id) => dispatch(actions.fetchOrdersStart(token,id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios))