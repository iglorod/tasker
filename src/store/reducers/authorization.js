import jwt from 'jsonwebtoken';

import * as actionTypes from '../actions/actionTypes';

const initialState = {
    id: null,
    email: null,
    token: null,
    expirationTime: null,
    errorMessage: null,
    authStart: false,
    refreshTimerId: null,
    loading: true,
}

const saveToLocalStorage = (data) => {
    localStorage.setItem('id', data.id);
    localStorage.setItem('email', data.email);
    localStorage.setItem('token', data.token);
    localStorage.setItem('expirationTime', data.expirationTime);
}

const clearLocalStorage = () => {
    localStorage.clear();
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: {
            return {
                errorMessage: null,
                authStart: true,
            }
        }

        case actionTypes.LOGIN: {
            const decoded = jwt.decode(action.token.data);

            const userData = {
                id: decoded.id,
                email: decoded.email,
                token: action.token.data,
                expirationTime: decoded.exp
            }

            if (action.remember) saveToLocalStorage(userData);

            return { ...userData };
        }

        case actionTypes.LOAD_FINISH: {
            return {
                ...state,
                loading: false
            }
        }

        case actionTypes.AUTH_ERROR: {
            if (action.err.response === undefined)
                return {
                    errorMessage: 'Service is unavailable. Please, try later...',
                    authStart: false,
                }
            return {
                errorMessage: action.err.response.data.message,
                authStart: false,
            }
        }

        case actionTypes.REFRESH_TOKEN: {
            const decoded = jwt.decode(action.token.data);

            const userData = {
                id: decoded.id,
                email: decoded.email,
                token: action.token.data,
                expirationTime: decoded.exp
            }

            saveToLocalStorage(userData);

            return { ...userData };
        }

        case actionTypes.SIGN_IN_LOCALY: {
            const userData = {
                id: localStorage.getItem('id'),
                email: localStorage.getItem('email'),
                token: localStorage.getItem('token'),
                expirationTime: localStorage.getItem('expirationTime')
            }

            return {
                ...userData,
                loading: false,
            };
        }

        case actionTypes.RESET_TIMEOUT_ID: {
            return {
                ...state,
                refreshTimerId: action.id
            };
        }

        case actionTypes.LOGOUT: {
            clearLocalStorage();

            return {
                ...initialState,
                loading: false,
            }
        }

        default: return state;
    }
}

export default reducer;
