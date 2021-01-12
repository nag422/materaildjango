import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NotificationsNoneIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Badge, IconButton } from '@material-ui/core';
import Moment from 'react-moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function ExtraNavMenu() {
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
      <>
    
  <IconButton  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}> 
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsNoneIcon fontSize="small" />
                                    </Badge>
                                   
                                </IconButton>

<Menu
id="simple-menu"
anchorEl={anchorEl}
keepMounted
open={Boolean(anchorEl)}
onClose={handleClose}
style={{marginTop:'35px',marginLeft:'1px'}}
>
<MenuItem>

<List className={classes.root}>
      <ListItem alignItems="flex-start">
       
        <ListItemText
          primary={<Moment fromNow>{localStorage.getItem('expiryon')}</Moment>}

        />
      </ListItem>
     
    </List>



</MenuItem>
</Menu>


  
    </>
  );
}
