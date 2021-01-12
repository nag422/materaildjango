import axios from 'axios';
import {  
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,  
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_FAIL,
    AUTHENTICATED_SUCCESS,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    GOOGLE_AUTH_SUCCESS,
    GOOGLE_AUTH_FAIL,
    FACEBOOK_AUTH_SUCCESS,
    FACEBOOK_AUTH_FAIL,
    REPORT_ISSUE_SUCCESS,
    REPORT_ISSUE_FAIL,
    CONTACT_SUCCESS,    
    LOGOUT
    

} from './types';

const process_env_REACT_APP_API_URL= "https://app.kiranvoleti.com"


export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get(`${process_env_REACT_APP_API_URL}/auth/users/me/`, config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const checkAuthenticated = () => async dispatch => {
    if (typeof window == 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ token: localStorage.getItem('access') });
    
        try {
            const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/jwt/verify/`, body, config);
    
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const googleAuthenticate = (state, code) => async dispacth => {
    if (state && code && !localStorage.getItem('access')) {
        const config ={
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
        const details ={
            'state':state,
            'code':code,
            'first_name':'imfirstname'
            
        };
        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&')
        try {
            const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/o/google-oauth2/?${formBody}`,config);
            console.log(res.data)
            alert(res.data)
            dispacth({
                type: GOOGLE_AUTH_SUCCESS,
                payload:res.data
            });
            dispacth(load_user);
        }
        catch(err){
            
            dispacth({
                type: GOOGLE_AUTH_FAIL
            })

        }
    }
}

export const facebookAuthenticate = (state, code) => async dispacth => {
    
    if (state && code && !localStorage.getItem('access')) {
        const config ={
            headers: {
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
        const details ={
            'state':state,
            'code':code
        };
        const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&')
        try {
            const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/o/facebook/?${formBody}`,config);
            
            dispacth({
                type: FACEBOOK_AUTH_SUCCESS,
                payload:res.data
            });
            dispacth(load_user);
            
        }
        catch(err){
            
            dispacth({
                type: FACEBOOK_AUTH_FAIL
            })

        }
    }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/jwt/create/`, body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
        
    } catch (err) {
        
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const signup = (first_name, email, provider, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    
    const body = JSON.stringify({ first_name, email,provider,password, re_password }); 
   

    try {
        const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/users/`, body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL
        });
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token }); 

    try {
        const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/users/activation/`, body, config);
        
        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });
        
    } catch (err) {
        alert(err)
        dispatch({
            type: ACTIVATION_FAIL
        });
        
    }
};
export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email }); 

    try {
        const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
    }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password }); 

    try {
        const res = await axios.post(`${process_env_REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
    }
};




// operations frontend
 
export const frontendoperations = (dataobject) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    };

    
    const type=dataobject.action;
    const form_data = new FormData();
    switch (type) {
        case 'report':
            
            form_data.append('email',dataobject.email)
            form_data.append('url',dataobject.url)
            form_data.append('inputRadios',dataobject.inputRadios)
            const res = await axios.post(`${process_env_REACT_APP_API_URL}/reportissue/`, form_data, config);
            if(res.data.msg === "REPORT_ISSUE_SUCCESS"){
        
                dispatch({
                    type: REPORT_ISSUE_SUCCESS
                });
        
            }
            else {
                dispatch({
                    type: REPORT_ISSUE_FAIL
                });
            }
            break;
        case 'help':
            
            form_data.append('email',dataobject.email)
            form_data.append('username',dataobject.username)
            form_data.append('message',dataobject.message)
            await axios.post(`https://app.kiranvoleti.com/contact/`, form_data, config);
            
        
            dispatch({
                type: CONTACT_SUCCESS
            });
        
              break;
        
        default:
            const s='v'


    }

    
    
    
    
    

    

    
};

// operations frontend

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
};