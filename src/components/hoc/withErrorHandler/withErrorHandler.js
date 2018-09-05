import React, {Component} from 'react';
import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount() {
            this.response = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error})
            })
            this.request = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return(req)
            })
        }

        componentWillUnmount() {
            axios.interceptors.response.eject(this.response)
            axios.interceptors.request.eject(this.request)
        }

        errorConfirmHandler = () => {
            this.setState({error: null})
        }

        render() {
            return(
                <React.Fragment>
                    <Modal 
                        close={this.errorConfirmHandler}
                        show={this.state.error}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </React.Fragment>
            )
        }
    }
}

export default withErrorHandler;