import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikField from "../../Components/Controls/FormikField";

import { login } from "../../Actions/auth";

import GoogleButton from 'react-google-button'

import axios from 'axios';
import { IconButton } from '@material-ui/core';


function Copyright() {

    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            {' '}
            {new Date().getFullYear()}
            {'. '}All Rights Reserved.
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://app.kiranvoleti.com/static/assets/images/login3.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'right center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    facebookbutton:{
        position:'relative',
        borderRadius:'1px',
        width:'auto',
        backgroundColor: '#3B5998',
        color: 'white',
        height:"50px",
        fontSize:'16px',
        paddingTop:'3%',
        textAlign:'center', 
        cursor:'pointer',
        margin: '3px 0',
        boxShadow: 'rgba(0, 0, 0, 0.25) 0px 2px 4px 0',
        '& .dropcap':{
            content:'',
            position:'absolute',            
            left:0,
            top:0,
            backgroundColor:'#fff',
            color:"#3B5998",
            // padding:"5% 5% 7% 5%",
            margin:"1px",
            fontSize:'24px',
            width:'49px',
            height: '48px',
            alignItems:'center',
            justifyContent:'center',          

            fontWeight:"bold",
            fontStyle:"italic",
            
            // float:'left',
            // marginTop:'-9px'
            
        }    
        
        
    },
    googlebutton:{
        borderRadius:'8px',
        width:'100%',
        backgroundColor: '#DD4B39',
        color: 'white',
        height:"50px",
        fontSize:'20px',
        textAlign:'center',
        
       '& .dropcap':{
           backgroundColor:'#fff',
           color:"#000",
           padding:"2% 3%",
           borderRadius:'10px',
           margin:"2px",
           fontWeight:"bold"
       }     
        

    },
    facebookcopy:{
        backgroundColor: 'blue',
        color: 'white',
        height: '50px',
        width: '240px',
        border: 'none',
        textAlign: 'center',        
        fontSize: '14px',
        lineHeight: '48px',
        display: 'block',
        borderRadius: '1px', 
        cursor: 'pointer',
        userSelect: 'none'
       },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
           
    
    },
     

}));

const loginschema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .email()
        .required("Email is Should not be Empty"),
    password: Yup.string()
        .min(2, 'Too Short!')        
        .required("A Subscribe option is required")
        // .matches(
        //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        //   )
})
const initialValues = {
    email: "",
    password: "",
};

function Login({login,isAuthenticated,isAlert}) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');

  
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };



    if (isAuthenticated) {
        return <Redirect to="/profile" />
    }
    
    
   
   
  
    const continuewithgoogle = async () => {
        
        const res = await axios.get('https://app.kiranvoleti.com/auth/o/google-oauth2/?redirect_uri=https://app.kiranvoleti.com/google')
        window.location.replace(res.data.authorization_url);

    }
    const continuewithfacebook = async () => {
        
        const res = await axios.get('https://app.kiranvoleti.com/auth/o/facebook/?redirect_uri=https://app.kiranvoleti.com/facebook')
        window.location.replace(res.data.authorization_url);

    }
    

    const handleSubmit = async (values) => {
        setMsg('Signing in Please Wait..')
        setOpen(true);
        await login((values.email),(values.password))
        if(isAlert){
            setMsg('Something is went wrong, try again')
            setOpen(true)
            return 
        }
        
        if (isAuthenticated) {
            return <Redirect to="/profile" />
        }
        
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={msg}
        action={          
            
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          
        }
      />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={loginschema}

                    >

                        {({ dirty, isValid }) => {
                            return (

                                <Grid container>
                                <Form className={classes.form}>
                               <Grid container style={{marginBottom:'2%'}} spacing={1}>
                                {/* <Grid item xs={12} sm={6} md={6} className={classes.googlebutton}>
                                    <span className='dropcap'>G</span>Login with Google

                                   </Grid>
                                   <Grid item xs={12} sm={6} md={6} onClick={continuewithfacebook} className={classes.facebookbutton}>
                                   <span className='dropcap'>F</span>Login with Facebook
                                   </Grid> */}

                                   <Grid item xs={12} sm={6} md={6}><GoogleButton onClick={continuewithgoogle} style={{width:"auto"}} /></Grid>
                                   {/* <Grid item md={1}></Grid> */}
                                   <Grid item xs={12} sm={6} md={6} onClick={continuewithfacebook} className={classes.facebookbutton}>
                                   <div className='dropcap'><div style={{marginTop:'10%'}}>f</div></div><div style={{paddingLeft:'40px',marginTop:'3.3%'}}> Sign in with Facebook</div>
                                   </Grid>
                               </Grid>

                                <Grid item xs={12}>
                                
                                    <FormikField
                                        name="email"
                                        label="Email"
                                        type="email"
                                        required
                                        textvariant="outlined"

                                    />
                                </Grid>

                                <br></br>


                                <Grid item xs={12}>

                                    <FormikField
                                                    name="password"
                                                    label="Password"
                                                    type="password"
                                                    required
                                                    textvariant="outlined"
                                                />

                                </Grid>


                                <Grid item xs={12} md={12} sm={12}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        disabled={!dirty || !isValid}
                                        type="submit" 
                                        fullWidth                                       
                                        className={classes.submit}
                                    >
                                        Login
                                    </Button>
                                </Grid>

                                <Grid container>
              <Grid item xs>
              
                <Link 
                component={RouterLink}
                variant="body2"
                to="/reset-password"
                
                >
                  Forgot password?
                  </Link>
                
                
              </Grid>
              <Grid item>
                  
                <Link to="/signup" variant="body2" component={RouterLink}>
                
                  {"Don't have an account? Sign Up"}
                  
                </Link>
                
                
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>

                                </Form>
                                </Grid>


                            );
                        }}
                    </Formik>

                    
                </div>
            </Grid>
        </Grid>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isAlert: state.auth.loginaction
});

export default connect(mapStateToProps, { login  })(Login);