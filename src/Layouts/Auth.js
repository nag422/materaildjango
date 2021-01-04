import React from 'react'
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../Actions/auth';
import { Route, Switch } from "react-router-dom";
import Signup from "../Pages/Auth/Signup";
import Login from '../Pages/Auth/Login'

const Auth = (props) => {
   

    React.useEffect(() => {
           
           
    props.checkAuthenticated();
    props.load_user();
          
        

        
    }, []);
    return (
        <div>
            <Switch>
            <Route exact path="/login" component= {Login} />            
            <Route exact path='/signup' component={Signup} />
            <Route exact path="/" component= {Login} />
            </Switch>
        </div>
    )
}

export default connect(null, { checkAuthenticated, load_user })(Auth);
