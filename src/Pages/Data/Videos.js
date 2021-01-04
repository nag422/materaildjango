import React, { useState, useRef, useCallback } from 'react'
import useVideoSearch from './useVideoSearch'
import { CircularProgress, Button, Grid, Avatar, Box, Chip, Link, TextField, MenuItem } from '@material-ui/core';
import Moment from 'react-moment';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PublicIcon from '@material-ui/icons/Public';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ModalPortal from '../../Components/Modal/ModalPortal'
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

const useStyles = makeStyles(theme => ({
  cardsource: {
    // maxWidth:'370px',
    // maxWidth: '340px',
    // boxSizing:'border-box',
    marginTop: '1%',
    '& .MuiCardContent-root': {
      padding: '22px',
      minHeight: '250px',
      maxHeight: '250px',
    },
    '& .MuiTypography-h6': {
      margin: '11px auto',
      paddingTop: '2%',
      maxHeight: '95px',
      minHeight: '95px',
      overflow: 'hidden',
      justifyContent: 'center'
    },
    '& .MuiSelect-outlined.MuiSelect-outlined': {
      paddingRight: '50px'

    },
    '& a': {
      textDecoration: 'none'
    }
  },
  formalign: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '50px'
    }
  },
  buttonalign: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: '100px'
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '30px'
    },
  },
  small: {
    width: theme.spacing(2),
    height: theme.spacing(2),
  },
  content: {
    padding: '10px auto auto atuo'
  },
  card: {
    position: 'relative',
  },
  productImageOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: '140px',
    width: '100%',
    opacity: 0.2,
    transition: '.5s ease',
    background: 'black',
    // zIndex:5555,  
    backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.1))',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5
    }
  }

}));


const Videos = () => {

  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [videourl, setVideourl] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [orderby, setOrderby] = useState('newest')
  

  const {
    videos,
    hasMore,
    loading,
    error
  } = useVideoSearch(query, pageNumber, orderby,setPageNumber)
  const classes = useStyles();


  const observer = useRef()
  const lastBookElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  

  const toUpperCaseFilter = (d) => {
    if (d === "a day ago") {
      return d.replace("a day ago", "1 day ago");
    } else if (d === "a month ago") {
      return d.replace("a month ago", "1 month ago");
    } else if (d === "a year ago") {
      return d.replace("a year ago", "1 year ago");
    }
    else {
      return d;
    }
  
  };


  const handleClickOpen = (e) => {
    setIsOpen(true);
    setVideourl(e)
  };

  const handleClose = () => {
    setIsOpen(false);
    setVideourl('')
  };

 

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg'
  }

  function handleSearch(e) {

    setOrderby(orderby)
    setPageNumber(1)
  }





  return (
    <>

<Grid container style={{ backgroundColor: "#fff", padding: '2% 1% 0 4%' }}
        alignContent="center"
        alignItems="center"
        justify="flex-start"
      >




        <Grid item xs={12} md={3} sm={5}>
          <TextField id="outlined-basic"
            label="keyword"
            variant="outlined"
            size="small"
            helperText="Enter Query"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Grid>

        <Grid item xs={12} md={5} sm={5} className={classes.formalign}>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            size="small"
            onChange={(e) => setOrderby(e.target.value)}
            helperText="select order"
            variant="outlined"
          >

            <MenuItem key='newest' value='newest'>
              Newest
            </MenuItem>
            <MenuItem key='oldest' value='oldest'>
              Oldest
            </MenuItem>

          </TextField>
          <Button onClick={handleSearch} className={classes.buttonalign} variant="contained" color="primary">Submit</Button>
        </Grid>





      </Grid>

      {videos.map((item, index) => {
        if (videos.length === index + 1) {
          // return <div ref={lastBookElementRef} key={index}>{article.title}</div>
          return <Grid item xs={12} md={3} sm={3} key={index} ref={lastBookElementRef}>

            <Card elevation={0} className={classes.cardsource}>
              <CardActionArea>
                
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="140"
                    image={item.image}
                    title={item.title}
                    onError={addDefaultSrc}
                    onClick={() => handleClickOpen(item.URL)}
                  />

                
                <Box className={classes.productImageOverlay} onClick={() => handleClickOpen(item.URL)}></Box>
              </CardActionArea>
              <CardContent>


                <Box display="flex">

                  <Box>
                    <Link href={`https://www.youtube.com/channel/${item.channelId}`} underline="none" color="inherit">
                      <Avatar className={classes.small} alt={item.title} src={item.image} />


                    </Link>
                  </Box>
                  <Box pl={1}>
                    <Link href={`https://www.youtube.com/channel/${item.channelId}`} underline="none" color="inherit">
                      <Typography gutterBottom variant="body2" color="textSecondary" component="p">

                        {item.channel_title.slice(0,20)}
                      </Typography>
                    </Link>
                  </Box>

                </Box>


                <Box className={classes.content}>
                  <Link onClick={() => handleClickOpen(item.URL)} underline="none" color="inherit">
                    <Typography variant="h6" component="p">
                      {item.title}
                    </Typography>
                  </Link>
                </Box>

                <Box display="flex" mb={2} mt={2} flexDirection="row" alignItems="flex-start">
                  <LocalOfferIcon fontSize="small" style={{ color: "gray", marginTop: "5px" }} />
                  {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                  {item.keytags.map((val, index) => (
                    <Chip size="small" key={index} label={val} style={{ margin: "2px", wrap: 'wrap', overflow: 'hidden' }} id={val} onClick={(e) => { setQuery(val); setPageNumber(1) }} />

                  ))}

                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <AccessTimeIcon fontSize='small' />
                    &nbsp;<Moment filter={toUpperCaseFilter} fromNow>{item.time_elapsed}</Moment>&nbsp;
                    <VisibilityOutlinedIcon fontSize='small'/>&nbsp;{item.views}
                  </Box>
                  
              </CardContent>

            </Card>

          </Grid>
        } else {
          // return <div key={index}>{article.title}</div>
          return <Grid item xs={12} md={3} sm={3} key={index}>

            <Card elevation={0} className={classes.cardsource}>
              <CardActionArea>
                
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="140"
                    image={item.image}
                    title={item.title}
                    onError={addDefaultSrc}
                    onClick={() => handleClickOpen(item.URL)}
                  />

                
                <Box className={classes.productImageOverlay} onClick={() => handleClickOpen(item.URL)}></Box>
              </CardActionArea>
              <CardContent>


                <Box display="flex">

                  <Box>
                    <Link href={`https://www.youtube.com/channel/${item.channelId}`} underline="none" color="inherit">
                    <Avatar className={classes.small} alt={item.title} src={item.image} />

                    </Link>
                  </Box>
                  <Box pl={1}>
                    <Link href={`https://www.youtube.com/channel/${item.channelId}`} underline="none" color="inherit">
                      <Typography gutterBottom variant="body2" color="textSecondary" component="p">

                      {item.channel_title.slice(0,20)}
                      </Typography>
                    </Link>
                  </Box>

                </Box>


                <Box className={classes.content}>
                  <Link onClick={() => handleClickOpen(item.URL)} underline="none" color="inherit">
                    <Typography variant="h6" component="p">
                      {item.title}
                    </Typography>
                  </Link>
                </Box>

                <Box display="flex" mb={2} mt={2} flexDirection="row" alignItems="flex-start">
                  <LocalOfferIcon fontSize="small" style={{ color: "gray", marginTop: "5px" }} />
                  {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                  {item.keytags.map((val, index) => (
                    <Chip size="small" key={index} label={val} style={{ margin: "2px", wrap: 'wrap', overflow: 'hidden' }} id={val} onClick={(e) => { setQuery(val); setPageNumber(1) }} />

                  ))}

                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <AccessTimeIcon fontSize='small' />
                    &nbsp;<Moment filter={toUpperCaseFilter} fromNow>{item.time_elapsed}</Moment>&nbsp;
                    <VisibilityOutlinedIcon fontSize='small'/>&nbsp;{item.views}
                  </Box>
              </CardContent>

            </Card>

          </Grid>

        }
      })}
      <Grid item xs={12} style={{ marginLeft: '45%' }}>
        {loading && <CircularProgress disableShrink />}
        {error && 'Error'}
        {!hasMore && <Button size="small" color="primary">
          No more Records
            </Button>}
      </Grid>
      
      <ModalPortal open={isOpen} vidurl = {videourl} onClose={() => setIsOpen(false)}></ModalPortal>
    </>
  )




}

export default Videos
