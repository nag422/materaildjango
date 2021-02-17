import './App.css';
import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
import { createBrowserHistory } from "history";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Admin from "../Layouts/Admin";
import Activate from '../Pages/Auth/Activate'
import ResetPassword from '../Pages/Auth/ResetPassword'
import ResetPasswordConfirm from '../Pages/Auth/ResetPasswordConfirm'
import Auth from '../Layouts/Auth'
import { Provider } from 'react-redux'
import store from '../store';
import Facebook from '../Components/Socialauth/Facebook';
import Google from '../Components/Socialauth/Google';
import Pricing from '../Pages/Data/Pricing';
import CheckoutForm from '../Pages/Payments/checkout'


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#333396',
      light: '#3c44b126'
    },
    secondary: {
      main: '#f83245',
      light: '#f8324526'
    }
  },
  typography: {
    fontFamily: [
      'century gothic',
      'CenturyGothic',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
})
const useStyles = makeStyles({
  appMain: {
    paddingLeft: 'auto',
    width: '100%'
  }
})
var hist = createBrowserHistory();
function App() {
  const classes = useStyles();
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <div className={classes.appMain}>
        <BrowserRouter history={hist}>
          <Switch>  
            
            <Route exact path="/login" component= {Auth} />
            <Route exact path='/signup' component={Auth} />
            <Route exact path="/profile" component= {Admin} />
            <Route exact path="/settings" component= {Admin} />
            <Route exact path="/google" component= {Google} />
            <Route exact path="/pricing" component= {Pricing} />
            <Route exact path="/facebook" component= {Facebook} />            
            <Route exact path='/reset-password' component={ResetPassword} />
            <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
            <Route exact path='/activate/:uid/:token' component={Activate} />
            {/* <Route exact path="/:anything" render={props => <Admin {...props} />} /> */}
            {/* <Route exact path="/:anything" component= {Admin} /> */}
            {/* <Route exact path="/signup" render={props => <LoginPage {...props} />} /> */}
            {/* <Redirect from="*" to="/login" /> */}
            <Route exact path="/checkout" component= {CheckoutForm} />
            {/*  */}
            <Route exact path="/articles" component= {Admin} />
            <Route exact path="/tools" component= {Admin} />
            <Route exact path="/videos" component= {Admin} />
            <Route exact path="/trends" component= {Admin} />
            <Redirect from="/ui/admin" to="/admin/" />
            <Route exact path="/" component= {Auth} />
            
          </Switch>
        </BrowserRouter>
        </div>
        <CssBaseline />
    </ThemeProvider>
    </Provider>
    
  );
}

export default App;
