import React, { useEffect } from 'react';
import clsx from 'clsx';
import { AppBar, Container, Toolbar, Grid,
     IconButton, Badge, makeStyles, Hidden,
     Card ,CardContent,Paper} from '@material-ui/core'
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
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import VideoLibraryOutlinedIcon from '@material-ui/icons/VideoLibraryOutlined';
import BuildOutlinedIcon from '@material-ui/icons/BuildOutlined';
import Avatar from '@material-ui/core/Avatar';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Slide from '@material-ui/core/Slide';
import NavMenu from '../Components/Controls/NavMenu'
import { Route, Switch, Redirect } from "react-router-dom";
import routes from "../routes.js";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
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
            color:'#fff'
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
    content: {
        flexGrow: 1,
        padding: theme.spacing(6),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(6, 0),
            
        }
    },
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

export default function LoginPage(props) {
    console.log(props)
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const [mobiledrop, setMobiledrop] = React.useState(false);
    

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    // useEffect(() => {


    // }, [])



    return (
        <div className={classes.root}>

            <AppBar
                position="absolute"
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

                                <IconButton>
                                    <Badge badgeContent={4} color="secondary">
                                        <NotificationsNoneIcon fontSize="small" />
                                    </Badge>
                                </IconButton>

                                <IconButton>
                                    <Badge badgeContent={3} color="primary">
                                        <ChatBubbleOutlineIcon fontSize="small" />
                                    </Badge>
                                </IconButton>


                                <NavMenu />




                            </Grid>
                        </Hidden>

                        <Hidden smUp>
                    
                        <Grid item xs={8} style={{display:'flex',justifyContent:'flex-start'}}>

                                {!open ? <Avatar style={{width:'160px',height:'auto',borderRadius:'0px'}} alt="logo"  src="https://app.kiranvoleti.com/static/assets/images/logo-white.png" />:null}
                                
                        </Grid>
                        <Grid item xs={1}>                    
                                <MoreVertIcon fontSize="small" onClick = {() =>setMobiledrop(!mobiledrop)} />  
                              
                        
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

                    <ListItem button>
                        <ListItemIcon><HomeOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><FileCopyOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Articles' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><VideoLibraryOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Videos' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon><BuildOutlinedIcon fontSize='small' /></ListItemIcon>
                        <ListItemText primary='Tools' />
                    </ListItem>


                </List>
            </Drawer>
           
                        

              
            <main className={classes.content}>  
            
            {mobiledrop ?
                        <Slide direction="down" in={true} mountOnEnter unmountOnExit><div style={{width:'100%',height:'60px',position:'relative',marginTop: '8px',marginRight:'0px',backgroundColor:'#fff',display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'0px 30px'}}><span>nagendra@gmail.com</span></div></Slide>
                        :null }    
                <div className={classes.toolbar} />

                <Container maxWidth="lg">
                <Grid
                container
                spacing={3}
                >
                
                <Switch>
                    {getRoutes(routes)}
                </Switch>
                
                </Grid>
                </Container>
                



            </main>
        </div>
    );
}
