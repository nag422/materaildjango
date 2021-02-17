import React, { useEffect } from 'react';
import clsx from 'clsx';
import {
    AppBar, Container, Toolbar, Grid,
    IconButton, Badge, makeStyles, Hidden,
    Card, CardContent, Paper, Box, Link, Menu, MenuItem
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import Slide from '@material-ui/core/Slide';
import NavMenu from '../Components/Controls/NavMenu'
import { Route, Switch, Redirect, useLocation, NavLink } from "react-router-dom";
import routes from "../routes.js";
import Page from "../Components/Page/Page"
import { connect } from 'react-redux';
import { logout } from '../Actions/auth';
// import ExtraNavMenu from '../Components/Controls/ExtraNavMenu';







const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',    
        boxSizing:'border-box',
        margin:'0',
        padding:'0' 
        
        

    },
    textdecor:{
        textDecoration:'none',
        color:'inherit'        
    },

    avatar: {
        width: '80%',
        height: '40px',
        borderRadius: '0px',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: '#fff',
        color: '#000',
        [theme.breakpoints.down('xs')]: {
            backgroundColor: theme.palette.primary.main,
            color: '#fff'
        },
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 37,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
        [theme.breakpoints.down('sm')]: {
            width: 0,
            display: 'none'
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    maincontent: {
        flexGrow: 1,
        padding: theme.spacing(3,1),
        backgroundColor:'#f1f4f5',
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(6, 0),

        }
    },
    activeclass: {
        backgroundColor:'red',
        color:'blue',
        '& .MuiListItem-button':{
            backgroundColor:'#EEEEEE',
        }
    }
}));

const getRoutes = routes => {
    return routes.map((prop, key) => {
        if (prop.layout === "/admin") {
            return (
                <Route
                    exact
                    path={prop.path}
                    component={prop.component}
                    key={key}
                />
            );
        } else {
            return null;
        }
    });
};

function Admin({logout,isAuthenticated}) {

    const location = useLocation();
    
    
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [mobiledrop, setMobiledrop] = React.useState(false);
    
    
    if (!isAuthenticated) {
        return <Redirect to="/login" />
    }

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };





    return (
        <div className={classes.root}>

            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Grid container alignItems="center">
                        <Grid item sm={2} xs={3}>
                            <Typography variant="h6" noWrap>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    className={clsx(classes.menuButton, {
                                        [classes.hide]: open,
                                    })}
                                >
                                    <MenuIcon />
                                </IconButton>
                            </Typography>

                        </Grid>

                        <Hidden xsDown>
                            <Grid item sm style={{ display: 'flex', justifyContent: 'flex-end' }}>


                             
                                
                                
                                
                               
                                
                                {/*
                                <IconButton>
                                    <Badge badgeContent={3} color="primary">
                                        <ChatBubbleOutlineIcon fontSize="small" />
                                    </Badge>
                                </IconButton> */}
                                <Box mt={1}>
                                {localStorage.getItem('first_name')}({localStorage.getItem('usertype')})
                                </Box>
                                <NavMenu logout={logout} />
                                




                            </Grid>
                        </Hidden>

                        <Hidden smUp>

                            <Grid item xs={8} style={{ display: 'flex', justifyContent: 'flex-start' }}>

                                {!open ? <Avatar style={{ width: '160px', height: 'auto', borderRadius: '0px' }} alt="logo" src="https://app.kiranvoleti.com/static/assets/images/logo-white.png" /> : null}

                            </Grid>
                            <Grid item xs={1}>
                                <MoreVertIcon fontSize="small" onClick={() => setMobiledrop(!mobiledrop)} />


                            </Grid>




                        </Hidden>

                    </Grid>



                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar} style={{ backgroundColor: '#3f51b5' }}>
                    <Avatar alt="logo" className={classes.avatar} src="https://app.kiranvoleti.com/static/assets/images/logo-white.png" />
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={{ color: '#fff' }} />}
                    </IconButton>
                </div>
                <Divider />

                <List>
                    {(localStorage.getItem('usertype')==="Admin" || localStorage.getItem('usertype')==="Staff") ?
                    <Link href="/ui/admin/" activeClassName={classes.activeclass} className={classes.textdecor}>
                    <ListItem button>
                        <ListItemIcon><HomeOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                    </Link>:null
                    }
                    {localStorage.getItem('trends') == 'no' ?
                    <>
                    <NavLink to="/articles" activeClassName={classes.activeclass} className={classes.textdecor}>
                    <ListItem button>                        
                        <ListItemIcon><FileCopyOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Articles' />
                    </ListItem>
                    </NavLink>

                    <NavLink to="/videos" activeClassName={classes.activeclass} className={classes.textdecor}>
                    <ListItem button>                        
                        <ListItemIcon><VideoLibraryOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Videos' />
                    </ListItem>
                    </NavLink>
                    <NavLink to="/tools" activeClassName={classes.activeclass} className={classes.textdecor}>
                    <ListItem button>
                        <ListItemIcon><BuildOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Tools' />
                    </ListItem>
                    </NavLink></>:null}
                    {localStorage.getItem('trends') == 'yes'?
                    <NavLink to="/trends" activeClassName={classes.activeclass} className={classes.textdecor}>
                    <ListItem button>
                        <ListItemIcon><TrendingUpIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Trends' />
                    </ListItem>
                    </NavLink>:null
                    }

                </List>
            </Drawer>




            <main className={classes.maincontent}>

                {mobiledrop ?
                    <Slide direction="down" in={true} mountOnEnter unmountOnExit><div style={{ width: '100%', height: '60px', position: 'fixed', marginTop: '8px', marginRight: '0px', backgroundColor: '#fff', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', padding: '0px 30px',zIndex:'4' }}><span>{localStorage.getItem('first_name')}({localStorage.getItem('usertype')})</span><NavMenu logout={logout} /></div></Slide>
                    : null}
                <div className={classes.toolbar} />
                <Page
                    className='justemp'
                    title='KiranVoleti | Digitalbox'
                    breadcomb={location.pathname}
                >
                    {/* <Container> */}
                        <Grid
                        
                            container
                            spacing={2}
                        >
                            <Grid item md={12} xs={12} lg={12}>
                            <Switch>
                                {getRoutes(routes)}
                            </Switch>
                            </Grid>

                        </Grid>
                    {/* </Container> */}
                </Page>




            </main>
        </div>
    );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Admin);