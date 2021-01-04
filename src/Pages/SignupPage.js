import React from 'react'
import { Grid } from '@material-ui/core'
import Profile from './Profile/Profile'
import ProfileDetails from './Profile/ProfileDetails'

const SignupPage = () => {
    return (
        <>
            <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails />
          </Grid>
        </>
    )
}

export default SignupPage
