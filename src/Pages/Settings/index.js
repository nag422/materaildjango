import React from 'react'
import { Grid } from '@material-ui/core'
import Subscription from './Subscription'
import Notifications from './Notifications'
import Security from './Security'
const index = () => {
  return (
    <>
      {/* <Grid container W-100> */}
        <Grid
          item
          xs={12}
          
          w-100
        >
          <Subscription className="subscriptclass" />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Notifications className="notifyclass" />
        </Grid>

        <Grid
          item
          xs={12}
        >
          <Security className="securityclass" />
        </Grid>
      {/* </Grid> */}
    </>
  )
}

export default index
