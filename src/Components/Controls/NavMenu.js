import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import PersonIcon from '@material-ui/icons/Person';
import FaceIcon from '@material-ui/icons/Face';
import SettingsIcon from '@material-ui/icons/Settings';
import { makeStyles } from '@material-ui/core';
import {NavLink} from 'react-router-dom';



const useStyles = makeStyles(theme => ({
  spacing: {
    marginRight: theme.spacing(1),
    textAlign: 'center'
  },
  a:{
    textDecoration:'none',
    color:'inherit'
  },
  selected:{
    textDecoration:'none',
    color:'#000',
    backgroundColor: 'gray.300'
  }
}))
export default function NavMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>

      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <KeyboardArrowDownIcon fontSize="small" />
      </IconButton>


      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{marginTop:'35px',marginLeft:'1px'}}
      >


        <MenuItem onClick={handleClose}><FaceIcon className={classes.spacing} fontSize="small" /><NavLink to="/profile" className={classes.a} activeClassName="selected">Profile</NavLink></MenuItem>
        <MenuItem onClick={handleClose}><SettingsIcon className={classes.spacing} fontSize="small" /><NavLink to="/settings" className={classes.a} activeClassName="selected">Settings</NavLink></MenuItem>
        <MenuItem onClick={handleClose}><AttachMoneyIcon className={classes.spacing} fontSize="small" /><NavLink to="/pricing" className={classes.a} activeClassName="selected">Pricing</NavLink></MenuItem>
        
        
        <MenuItem onClick={props.logout}>



          <PowerSettingsNewIcon className={classes.spacing} fontSize="small" /> Logout

        </MenuItem>
      </Menu>
    </>
  );
}