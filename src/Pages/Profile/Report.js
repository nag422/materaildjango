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
import FormikRadio from "../../Components/Controls/FormikRadio";
import {frontendoperations} from "../../Actions/auth";
import {connect} from 'react-redux';

const useStyles = makeStyles(() => ({
    root: {
        minHeight:'325px'
    },
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
  url: Yup.string()
        .min(2, 'Too Short!')
        .required("Link is Should not be Empty"),
        inputRadios: Yup.string()
    .required("A Subscribe option is required")
})
const initialValues = {
    email:localStorage.getItem('email'),
    url: "",
    inputRadios:""
};


const Report = ({ className,frontendoperations,isAuthenticated,isAction,snakreq,setsnakreq,open, ...rest }) => {
    const classes = useStyles();
    
    
    const handleSubmit = async (values) => {      
      
        await frontendoperations({...values,action:'report',email:initialValues.email})
        if(!isAction){
          setsnakreq({...snakreq,
            message:"Successfully Reported !!",
            color:"success"});
        }else{
          setsnakreq({...snakreq,
            message:"Something is Went Wrong !!",
            color:"error"});

        }
        
        open(true)
    };

    return (
        <>
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <CardHeader
                    subheader="Report Link"
                    title="We Remove Your Data"
                />
                <Divider />
                <CardContent>
                    <Paper elevation={0}>

                        <Grid container spacing={3}>

                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validationSchema={notificationschema}
                            >

                                {({ dirty, isValid }) => {
                                    return (
                                        <Grid item xs={12}>
                                            
                                            <Form>

                                            
                                                <FormikField
                                                    textvariant="outlined"
                                                    name="url"
                                                    label="URL"
                                                    required
                                                />
                                            

                                            
                                            <br />

                                                
                                                    <FormikRadio
                                                    name="inputRadios"
                                                    label="InputRadios"
                                                    val="block"
                                                    required
                                                    />
                                                     <FormikRadio
                                                    name="inputRadios"
                                                    label="InputRadios"
                                                    val="unblock"
                                                    required
                                                    />
                                                

                                                
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        disabled={!dirty || !isValid}
                                                        type="submit"

                                                    >
                                                        Submit
                                                    </Button>
                                                

                                            </Form>
                                        </Grid>

                                    );
                                }}
                            </Formik>











                        </Grid>
                    </Paper>

                </CardContent>



            </Card>

        </>
    )
}
Report.propTypes = {
    className: PropTypes.string
}
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAction: state.auth.isAction
});

export default connect(mapStateToProps, { frontendoperations  })(Report);
