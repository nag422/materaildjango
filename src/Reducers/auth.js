/* eslint-disable import/no-anonymous-default-export */
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGOUT,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    REPORT_ISSUE_SUCCESS,
    REPORT_ISSUE_FAIL,
    CONTACT_SUCCESS,
    LOAD_USER_PROFILE_SUCCESS

} from '../Actions/types';

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isSignup:false,
    isAuthenticated: null,
    user: null,
    isAction: 'success',
    loginaction:false,
    profile: {},
};

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {

        
        case GOOGLE_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh); 
             
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case LOGIN_SUCCESS:
        case FACEBOOK_AUTH_SUCCESS:
            localStorage.setItem('access', payload.access);
            localStorage.setItem('refresh', payload.refresh);   
            return {
                ...state,
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }

        case USER_LOADED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: payload
            }

        case SIGNUP_SUCCESS:
            
            return {
                ...state,
                isAuthenticated: false,
                isSignup:true
            }
        
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            }        
            
        case GOOGLE_AUTH_FAIL:
        case FACEBOOK_AUTH_FAIL:
        case LOGIN_FAIL:
        case SIGNUP_FAIL:
        case LOGOUT:            
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                loginaction:true
            }
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case REPORT_ISSUE_SUCCESS:
            return {
                ...state,
                isAction:true
            }
        case REPORT_ISSUE_FAIL:
            return {
                ...state,
                isAction:false
            }
        case CONTACT_SUCCESS:
            return {
                ...state,
                isAction:true
            }
    
            
        
        default:
            return state
    }
}