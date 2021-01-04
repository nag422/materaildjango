import React from 'react'
import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    CardHeader,
    Paper,
    Grid,
    makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikField from "../../Components/Controls/FormikField";
import {NavLink} from 'react-router-dom';

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    },
    iconclass: {
        backgroundColor: '#6573c3',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px'
    }
}));

const notificationschema = Yup.object().shape({
    email: Yup.string()
    .min(2, 'Too Short!')
    .required("Email is Should not be Empty"),    
})
const initialValues = {
    email: ""
  };


const Security = ({ className, ...rest }) => {
    const classes = useStyles();
    const handleSubmit = (values) => {
        alert(JSON.stringify(values));
      };

    return (
        <>
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <CardHeader
                    subheader="Change Password"
                    title="Security"
                /> 
                <Divider />
                <CardContent>
                    <Paper elevation={0}>
                        
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={4} md={4}>

                                <NavLink to="/reset-password">Reset Password</NavLink>
                                                     
                                </Grid>
                                                          

                                </Grid>   
                    </Paper>

                </CardContent>



            </Card>
           
        </>
    )
}
Security.propTypes = {
    className: PropTypes.string
  }
export default Security
