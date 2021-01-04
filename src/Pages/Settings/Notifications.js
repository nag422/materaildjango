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
    lettersub: Yup.string()
    .required("A Subscribe option is required")
})
const initialValues = {
    email: localStorage.getItem('email'),
    lettersub:"",
};


const Notifications = ({ className, ...rest }) => {
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
                    subheader="NewsLetter Subscription"
                    title="Daily News Letter"
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
                                                    name="email"
                                                    label="Email"
                                                    required
                                                />
                                            

                                            
                                            <br />

                                                
                                                    <FormikRadio
                                                    name="lettersub"
                                                    label="Lettersub"
                                                    val="subscribe"
                                                    required
                                                    />
                                                     <FormikRadio
                                                    name="lettersub"
                                                    label="Lettersub"
                                                    val="unsubscribe"
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
Notifications.propTypes = {
    className: PropTypes.string
}
export default Notifications
