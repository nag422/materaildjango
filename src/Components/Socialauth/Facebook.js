import React from 'react'
import { connect } from 'react-redux';
import { facebookAuthenticate } from '../../Actions/auth';
import { Route, Switch, useLocation,Redirect } from "react-router-dom";
import Login from '../../Pages/Auth/Login'
import queryString from 'query-string'

const Facebook = ({facebookAuthenticate,isAuthenticated}) => {
    let location = useLocation(); 

    React.useEffect(() => {
            
            const values = queryString.parse(location.search);
            const state = values.state ? values.state : null;
            const code = values.code ? values.code : null;

            console.log('State: ' + state);
            console.log('Code: ' + code);
            
            if (isAuthenticated) {
                return <Redirect to="/profile" />
            }

            if(state && code){
                facebookAuthenticate(state, code);
                
            }
            else{
                alert('nostate')
            }
            
        

        
    }, [location])
    return (
        <div>
            <Switch>
            <Route exact path="/facebook" component= {Login} />
            <Route exact path="/" component= {Login} />
            </Switch>
        </div>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});
export default connect(mapStateToProps, { facebookAuthenticate })(Facebook);
