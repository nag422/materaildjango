import React from 'react'
import { Grid, useScrollTrigger } from '@material-ui/core'
import Profile from './Profile'
import ProfileDetails from './ProfileDetails'
import Help from './Help'
import Report from './Report'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios'
import Moment from 'react-moment';
import axiosInstance from '../../axiosmodelapi'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const ProfileIndex = () => {
  const [open, setOpen] = React.useState(false);
  const [snakreq,setSnakreq] = React.useState({
    message:"",
    color:"inherit"

  });

  const [user,setUser] = React.useState({
    avatar: '/static/images/avatars/avatar_6.png',
    first_name:"",
    last_name:"",
    email:"",
    joined:"",
    usertype:"",
    phone:"",
    id:'',
    tier:'',
    trends:'',

  });
  
  



  React.useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
  };
    
    const body = {
      params:{
        id:1
      }
    }
    
    axiosInstance.get(`https://app.kiranvoleti.com/testing/checkfun/`,config)
    .then(res => {
      
      // setProfilename(res.data.response.first_name)
      
      
       
     (res.data.response.map((val) => {
        setUser({
          ...user,
            first_name:val.first_name,
            last_name: val.last_name,
            email: val.email,
            id:val.id,
            tier:val.tier,
            phone:val.phone,
            joined:<Moment format="D MMM YYYY" withTitle>{val.joined}</Moment>,
            usertype: val.is_staff ? (val.is_superuser ? 'Admin': 'Staff') : 'Subscriber',
            trends:''

        })
        localStorage.setItem('first_name',val.first_name)
        localStorage.setItem('last_name',val.last_name)
        localStorage.setItem('phone',val.phone)
        localStorage.setItem('email',val.email)
        localStorage.setItem('usertype',val.is_staff ? (val.is_superuser ? 'Admin': 'Staff') : 'Subscriber')
        localStorage.setItem('userid',val.id)
        localStorage.setItem('tier',val.tier)
        localStorage.setItem('trends',val.trends?'yes':'no')
        
      }
     
     
      
        
        
        ))

        localStorage.setItem('remain',res.data.remain)
        localStorage.setItem('expiryon',res.data.totaldays)

        
      
    })

    // setProfile(userprofileresp)
    
    
  }, [])
  //    Snackbar

    
    
  const handleClose = (event,reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

// Snackbar


  
    return (
        <>
        {open &&
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snakreq.color}>
                    {snakreq.message}
                </Alert>
            </Snackbar>}
        <Grid container spacing={2}>
            <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile
            user= {user}
            snakreq = {snakreq}
            setsnakreq = {setSnakreq}  
            open={setOpen}
            className='profileclass'
            />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails user= {user} snakreq = {snakreq}
            setsnakreq = {setSnakreq}  
            open={setOpen}
            className='profiledetailsclass' />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Report
              snakreq = {snakreq}
              setsnakreq = {setSnakreq}  
              open={setOpen}          
            />
          </Grid>
          <Grid
            item
            lg={6}
            md={6}
            xs={12}
          >
            <Help
            snakreq = {snakreq}
            setsnakreq = {setSnakreq}  
            open={setOpen}   
            />
          </Grid>
          </Grid>
        </>
    )
}

export default ProfileIndex;
