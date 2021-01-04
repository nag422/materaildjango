import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink, Redirect } from 'react-router-dom'; 
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikField from "../../Components/Controls/FormikField";

import { reset_password_confirm } from "../../Actions/auth";


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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
           
    
    },
     

}));

const resetconfirmschema = Yup.object().shape({
    new_password: Yup.string()
        .min(8, 'Too Short!')
        .required("Password is Should not be Empty")
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
          ),
    re_new_password: Yup.string()
        .min(2, 'Too Short!')        
        .required("A Subscribe option is required")
        .test('passwords-match', 'Passwords must match ya fool', function(value) {
            return this.parent.new_password === value;
          }),
        
})
const initialValues = {
    new_password: "",
    re_new_password: "",
};

function ResetPasswordConfirm(props) {
    const classes = useStyles();

    const [requestSent, setRequestSent] = React.useState(false);

   
    

    const handleSubmit = (values) => {
        
        
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.reset_password_confirm(uid, token, values.new_password, values.re_new_password);
        setRequestSent(true);
        
    };

    if (requestSent)
        return <Redirect to='/' />

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Enter New Password
          </Typography>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={resetconfirmschema}

                    >

                        {({ dirty, isValid }) => {
                            return (

                                <Grid container>
                                <Form className={classes.form}>

                                <Grid item xs={12}>
                                    <FormikField
                                        name="new_password"
                                        label="New Password"
                                        type="password"
                                        required
                                        textvariant="outlined"

                                    />
                                </Grid>

                                <br></br>


                                <Grid item xs={12}>

                                    <FormikField
                                                    name="re_new_password"
                                                    label="Retype Password"
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
                                        Confirm
                                    </Button>
                                </Grid>

                                <Grid container>
              <Grid item xs>
              
                <Link 
                component={RouterLink}
                variant="body2"
                to="/"
                
                >
                  Back
                  </Link>
                
                
              </Grid>
              <Grid item>
                  
                <Link to="/login" variant="body2" component={RouterLink}>
                
                  {"have an account? Sign In"}
                  
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
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { reset_password_confirm  })(ResetPasswordConfirm);