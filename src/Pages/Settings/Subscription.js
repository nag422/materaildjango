import React from 'react'
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
import GroupIcon from '@material-ui/icons/Group';
import { NavLink } from 'react-router-dom';
import Moment from 'react-moment';
const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
      height: 100,
      width: 100
    },
    iconclass:{
        backgroundColor:'#6573c3',
        color:'#fff',
        padding:'5px 10px',
        borderRadius:'5px'
    }
  }));

const Subscription = ({ className, ...rest }) => {
    const classes = useStyles();
    return (
        <>
        <Card
            className={clsx(classes.root, className)}
        {...rest}
      >
          <CardHeader
          subheader="Manage Your Subscription"
          title="Subscription"
            />
            <Divider />
            <CardContent>
            <Paper elevation={0}>
            <Box color="text.secondary" display="flex" justifyContent="space-between">
                <Box>
                <Typography 
                    color="textSecondary"
                    gutterBottom
                    variant="h6">
                Current Plan: Tier {localStorage.getItem('tier')}
               
                </Typography>
                <Typography 
                    color="textSecondary"
                    gutterBottom
                    variant="body2">
                Expires on :  {localStorage.getItem('expiryon')}
                &nbsp;(<Moment  fromNow>{localStorage.getItem('expiryon')}</Moment>)
               
                </Typography>
                
                </Box>
                <Box>
                <Typography 
                    // color="textSecondary"
                    className={classes.iconclass}
                    gutterBottom
                    variant="h5">
                        <GroupIcon fontSize="small" />
                </Typography>
                </Box>
                

            </Box>

            </Paper>

            </CardContent>
       
            

          </Card>
          <Box display="flex" mt={3} justifyContent="flex-end">
            <NavLink to="/pricing">
          <Button variant="contained" color="primary">
            Upgrade
          </Button>
          </NavLink>
          </Box>
      </>
    )
}

export default Subscription
