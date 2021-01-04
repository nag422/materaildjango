import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import axios from 'axios';




const useStyles = makeStyles(() => ({
  root: {
    minHeight:'348px',
    maxHeight:'349px'
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className,user, ...rest }) => {
  
  
  const classes = useStyles();
  

  



  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body1"
          >
            {user.first_name}
          </Typography>
          <Typography
            color="textPrimary"
            gutterBottom
            variant="body2"
          >
            {user.email}
          </Typography>
          
        </Box>
      </CardContent>
      <Divider />
      
      <Typography
            color="textPrimary"
            align="center"
            gutterBottom
            variant="body2"
          >
            Joined On:  {user.joined}
          </Typography>
          <Typography
            color="textPrimary"
            align="center"
            gutterBottom
            variant="body2"
          >
            Role :  {user.usertype}
          </Typography>
      {/* <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions> */}
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};


export default Profile;
