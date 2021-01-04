import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

import {frontendoperations} from "../../Actions/auth";
import {connect} from 'react-redux';


const useStyles = makeStyles(() => ({
  root: {}
}));

const Help = ({ className,frontendoperations,isAuthenticated,isAction,snakreq,setsnakreq,open, ...rest }) => {
  const classes = useStyles();

  const firstvalues = {
    email:"nagendrakumar422@gmail.com",
    username: "nagendrakumar422@gmail.com",
    message:""
  };
  const [values, setValues] = React.useState(firstvalues)
  

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  
  const handleSubmit = async () => {   
    await frontendoperations({action:'help',email:firstvalues.email,username:firstvalues.username,message:firstvalues.message})
    if(isAction){
      setsnakreq({...snakreq,
        message:"Successfully Message Sent !!",
        color:"success"});
    }else{
      setsnakreq({...snakreq,
        message:"Something is Went Wrong !!",
        color:"error"});
    }  
    open(true)
  };

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Describe in your own words"
          title="Support"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
             <TextField
                fullWidth
                label="Contact Admin"
                name="message"
                multiline
                onChange={handleChange}
                rows={5}
                rowsMax={6}                
                variant="outlined"
                
              />
            </Grid>   
                   
            <Grid item md={12} xs={12}>
            <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit}
            disabled = {values.message.length >= 2 ? false:true}
          >            
           Send Now 
          </Button>
          </Grid>
           
          </Grid>
        </CardContent>
       
      </Card>
    </form>
  );
};

Help.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAction: state.auth.isAction
});

export default connect(mapStateToProps, { frontendoperations  })(Help);
