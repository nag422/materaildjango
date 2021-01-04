import React from 'react'
import styles from '../../assets/jss/Sidebar.js';
import { Grid ,Fade, Slide } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles(styles);


const Sidebar = () => {
    const classes = useStyles();
    return (
        <Slide in={true} direction='left' mountOnEnter unmountOnExit>
        <div className={classes.sidemenu}>
            <Grid container>
                <Grid item>

                </Grid>
            </Grid>

            <Divider />
            im sidebar
            
        </div>
        </Slide>
    )
}

export default Sidebar
