import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'
import Navbar from '../Components/Navbar/Navbar'
import '../assets/css/login.css'
import { Grid, Container, Paper, makeStyles } from '@material-ui/core'

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    pagecontainer: {
        position: 'relative',
        height: '100vh',
        // width: '100%',
        marginTop: '6%',
        // transform: 'translateX(3%)',
        // overflow: 'hidden'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const LoginPage = () => {

    const [open, setOpen] = React.useState(false);

    const handleSidebar = () => {
        setOpen(!open);
    };

    const classes = useStyles();


    return (
        <div>
            {open ? <Sidebar /> : null}
            <Navbar handleSidebar={handleSidebar} isopened={open} />


            <Container maxWidth={open ? 'md' : 'lg'}>

                <Grid container>

                    <Grid item sm={12}>
                        <Paper className={classes.pagecontainer}>
                            <Card className={classes.root}>

                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                        Word of the Day
                                    </Typography>

                                </CardContent>

                            </Card>
                        </Paper>
                    </Grid>


                </Grid>

            </Container>





        </div>
    )
}

export default LoginPage
