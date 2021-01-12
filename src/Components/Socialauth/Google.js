import React from 'react'
import { connect } from 'react-redux';
import { googleAuthenticate } from '../../Actions/auth';
import { Route, Switch, useLocation } from "react-router-dom";
import Login from '../../Pages/Auth/Login'
import queryString from 'query-string'

const Google = (props) => {
    let location = useLocation(); 

    React.useEffect(() => {
            
            const values = queryString.parse(location.search);
            const state = values.state ? values.state : null;
            const code = values.code ? values.code : null;

            console.log('State: ' + state);
            console.log('Code: ' + code);
            

            if(state && code){
                props.googleAuthenticate(state, code ,'google');
            }
            
        

        
    }, [])
    return (
        <div>
            <Switch>                   
            <Route exact path="/google" component= {Login} />
            <Route exact path="/" component= {Login} />
            </Switch>
            Signing in
        </div>
    )
}

export default connect(null, { googleAuthenticate })(Google);
