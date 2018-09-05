import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authSuccess = (data, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: data.idToken,
        id: data.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authTry = () => {
    return {type: actionTypes.AUTH_TRY}
}

export const authStart = (email, password) => {
    return dispatch => {
        const authData = {  email: email, 
                            password: password, 
                            returnSecureToken: true
        }
        dispatch(authTry())
        
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC3w0F7ALtBYsOO8ELW28G6uFPTHoTlwEk', authData)
            .then(response => {
                dispatch(loginStart(email, password))
            })
            .catch(error => {
                dispatch(authFail(error))
            })
    }
}

export const loginSuccess = (token, id) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token: token,
        id: id
    }
}

export const loginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error: error.response.data.error
    }
}

export const loginStart = (email, password) => {
    return dispatch => {
        const authData = {  email: email, 
                            password: password, 
                            returnSecureToken: true
        }
        dispatch(authTry())
        
        axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyC3w0F7ALtBYsOO8ELW28G6uFPTHoTlwEk', authData)
            .then(response => {
                const expires = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('expiryDate', expires)
                localStorage.setItem('userID', response.data.localId)
                dispatch(loginSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(loginFail(error))
            })
    }
}

export const checkAuthTimeout = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, timeout * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expiryDate')
    return {
        type: actionTypes.LOGOUT
    }
}

export const checkIfLoggedIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        const expiryDate = new Date(localStorage.getItem('expiryDate'))
        if (!token || expiryDate <= new Date()){
            dispatch(logout())
        }
        else {
            const id = localStorage.getItem('userID')
            dispatch(loginSuccess(token, id))
            dispatch(checkAuthTimeout((expiryDate.getTime() - new Date().getTime())/1000))
        }
    }
}
