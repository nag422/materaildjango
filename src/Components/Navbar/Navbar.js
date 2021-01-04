import React from 'react'
import { AppBar, Toolbar, Grid, InputBase, IconButton, Badge, Hidden, makeStyles } from '@material-ui/core'
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MenuOpenOutlinedIcon from '@material-ui/icons/MenuOpenOutlined';
import FormatIndentIncreaseOutlinedIcon from '@material-ui/icons/FormatIndentIncreaseOutlined';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import clsx from 'clsx';
import NavMenu from '../Controls/NavMenu'
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#fff',

    },
    navshift: {
        paddingLeft: '20%',
        width: '100%'
    },
    navshrink: {
        paddingLeft: '0',
        width: '100%'

    },
    logobackgroundcolor: {
        backgroundColor: theme.palette.primary.main,
        paddingTop:'1.6%',
        paddingRight:'1.4%',
        paddingBottom:'1.6%',
        paddingLeft:'2%',
        marginLeft:'-2%'
    },
    avatar: {
        width: '130px',
        height: '100%',
        borderRadius: '0px'
    },

    searchInput: {
        opacity: '0.6',
        padding: `0px ${theme.spacing(1)}px`,
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: '#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight: theme.spacing(1)
        }
    }
}))

export default function Navbar(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    
    const classes = useStyles();
    const { handleSidebar, isopened } = props;

    


    return (
        <AppBar position="static"

            className={classes.root}>
            <Toolbar>
                <Grid container
                    alignItems="center" >
                    {/* className={clsx(classes.navshift,{[classes.navshrink]:!isopened})} */}

                    <Grid  item sm={2} className={classes.logobackgroundcolor}>
                        <Avatar alt="logo" className={classes.avatar} src="https://app.kiranvoleti.com/static/assets/images/logo-white.png" />

                    </Grid>

                    <Grid item sm={2} style={{paddingLeft:'100px'}}>
                        <IconButton onClick={handleSidebar}>
                            {isopened ?
                                <MenuOpenOutlinedIcon fontSize="small" />
                                :
                                <FormatIndentIncreaseOutlinedIcon fontSize="small" />
                            }

                        </IconButton>
                    </Grid>
                    <Hidden smDown>
                    <Grid item sm={6} xs={0}>
                        <InputBase
                            placeholder="Search topics"
                            className={classes.searchInput}
                            startAdornment={<SearchIcon fontSize="small" />}
                        />

                    </Grid>
                    </Hidden>

                    <Grid item sm={2} style={{display:'flex',justifyContent:'flex-end'}}>
                        
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
                </Grid>
            </Toolbar>
        </AppBar>
    )
}