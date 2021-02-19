import React, { useState, useRef, useCallback } from 'react'
import useTrendSearch from './useTrendSearch'
import { CircularProgress, Button, Grid, Avatar, Box, Chip, Link, TextField, MenuItem, InputLabel } from '@material-ui/core';
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
import axiosInstance from '../../axiosmodelapi';
import Alert from '@material-ui/lab/Alert';
// import 'moment-timezone';
import moment from 'moment'
const useStyles = makeStyles(theme => ({
  cardsource: {
    // maxWidth:'370px',
    // maxWidth: '340px',
    // boxSizing:'border-box',
    borderRadius: '0px',
    marginTop: '1%',
    '& .MuiCardContent-root': {
      padding: '22px',
      minHeight: '250px',
      maxHeight: '250px',
    },
    '& .MuiTypography-h6': {
      margin: '0px auto',
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
    width: '10px',
    height: '10px',
    top: '5.5px'
  },
  content: {
    // margin: '5px auto auto atuo',
    cursor: 'pointer'
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
  },
  tagcontent: {
    position: 'relative',
    marginTop: 'auto',
    paddingTop: '5%',
    display: 'flex',
    maxHeight: '56px',
    minHeight: '56px',
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center'

  },
  tagtext: {
    marginTop: '5px',
    fontSize: '8px',
    position: 'relative',
    color: '#5c5a5a',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer'
  },
  tagcategorytesting: {
    alignItems: "center",
    backgroundColor: '#f9f9f9',
    padding: '5px',
    color: '#030303',
    height: '24px',
    minWidth: '12px',
    fontSize: '11px',
    // padding: 'auto 0px',
    borderRadius: '16px',
    boxSizing: 'border-box',
    outline: 'none',
    overflow: 'hidden',

    /* user-select: none; */
    textAlign: 'center',
    verticalAlign: 'baseline',
    /* margin-bottom: -11.5rem; */
    marginTop: '-0.5rem',
    marginRight: '3px',
    cursor: 'pointer'
  },
  searchformcustom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    '& .MuiSelect-select': {
      minWidth: '150px'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: "flex-start",
      margin: '5px 3px'
    }
  }

}));


const Trends = () => {

  const [query, setQuery] = useState('')
  const [datavideos, setDatavideos] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [videourl, setVideourl] = useState(false)
  const [isOpen, setIsOpen] = useState(false);
  const [orderby, setOrderby] = useState('50')
  const [errormsg, setErrormsg] = useState('')
  const [redalert, setRedalert] = useState(false)
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)


  React.useEffect(() => {
    if (!localStorage.getItem('remain')) {
      setErrormsg('Your Plan is Expired! Upgrade Now')

    }

  }, [])


  

  const classes = useStyles();


  



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

 



  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg'
  }

  function handleSearch(e) {

    // setOrderby(orderby)
    // setPageNumber(1)
    if (query.length <= 1) {
      setRedalert(true)
      return setQuery('');
    }

    setRedalert(false)
    


    const form_data = new FormData();
    form_data.append('q', query);
    form_data.append('count', orderby);


    setIsloading(true)
    axiosInstance.post('/ui/admin/trendsscroll/', form_data).then(res => {
      
      setIsloading(false)
      console.log(res.data)
      setDatavideos(res.data.trends)
    }).catch(err => {
      console.log(err.message)
      setRedalert(true)
      setIsloading(false)
    })



  }


  const stage = ((views) => {
    if (views == 0) {
      return 'Normal'
    }
    else if (views >= 0 && views <= 800) {
      return 'Below Average'
    }
    else if (views > 800 && views <= 1000) {
      return 'Average'
    }
    else if (views > 1000 && views <= 5000) {
      return 'Best'
    }
    else if (views > 5000 && views <= 80000000) {
      return 'Viral'
    }
    else if (views > 80000000 && views <= 200000000) {
      return 'Trending'
    } else {
      return 'Trending'
    }

  })






  return (
    <>

      {redalert && <Alert onClose={() => { setRedalert(false) }} severity="error">Please Enter a Query!</Alert>}

      <Grid container style={{ backgroundColor: "#fff", padding: '0.6% 0 0 2%', minHeight: '100px' }}
        alignContent="center"
        alignItems="center"
        justify="flex-start"
      >




        <Grid item xs={12} md={3} sm={5}>

          <Box className={classes.searchformcustom}>
            <label>Query : </label>
            <TextField id="outlined-basic"
              label="keyword"
              variant="outlined"
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputLabelProps={{
                shrink: query ? true : false
              }}
              
            />
          </Box>
        </Grid>

        <Grid item xs={12} md={5} sm={12} className={classes.formalign}>
          <Box className={classes.searchformcustom}>
            <InputLabel >Search Count : </InputLabel>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              size="small"
              onChange={(e) => setOrderby(e.target.value)}
              variant="outlined"
              value={orderby}
            >

              <MenuItem key='50' value='50'>
                50
            </MenuItem>
              <MenuItem key='100' value='100'>
                100
            </MenuItem>
            <MenuItem key='200' value='200'>
                200
            </MenuItem>
            
            

            </TextField>

            <Button onClick={handleSearch} className={classes.buttonalign} variant="contained" color="primary">Submit</Button>
          </Box>
        </Grid>

      </Grid>


      {/* Trending */}


      <Box borderBottom={4} borderColor="primary.light" mb={3}>
        <Typography component='h3' variant="h5" style={{ padding: '10px 0' }}>Trending</Typography>
      </Box>
      <Grid container spacing={2}>
        {datavideos.map((item, index) => {
          if (datavideos.length && item.views >= 80000000) {
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
                        <Typography gutterBottom variant="body3" color="textSecondary" component="p">

                          {item.channel_title.slice(0, 20)}
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

                  <Box className={classes.tagcontent}>
                    <Box className={classes.tagtext}>
                      <LocalOfferIcon style={{ color: "lightgray", fontSize: '1rem' }} />
                      {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                      {/* {item.keytags.map((val, index) => ( */}

                      <div className={classes.tagcategorytesting} id={item.dataquery} onClick={(e) => { setQuery(item.dataquery); setPageNumber(1) }}>
                        <Typography color="secondary" component="h5" variant="body2">{stage(item.views)}</Typography>
                      </div>

                      {/* ))} */}

                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" justifyContent="center" alignItems="center">


                      <AccessTimeIcon style={{ fontSize: '14px' }} />
                      &nbsp; <Moment fromNow>{moment.utc(item.time_elapsed).local().format('YYYY-MMM-DD h:mm A')}</Moment>&nbsp;

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '4px' }}>
                      <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />&nbsp;{item.views}

                    </Box>
                  </Box>
                </CardContent>

              </Card>

            </Grid>
          }
        })}



      </Grid>


      {/* Viral */}

      <Box borderBottom={4} borderColor="primary.light" mb={3}>
        <Typography component='h3' variant="h5" style={{ padding: '10px 0' }}>Viral</Typography>
      </Box>
      <Grid container spacing={2} pt={1}>

        {datavideos.map((item, index) => {
          if (datavideos.length && item.views > 5000 && item.views <= 80000000) {
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
                        <Typography gutterBottom variant="body3" color="textSecondary" component="p">

                          {item.channel_title.slice(0, 20)}
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

                  <Box className={classes.tagcontent}>
                    <Box className={classes.tagtext}>
                      <LocalOfferIcon style={{ color: "lightgray", fontSize: '1rem' }} />
                      {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                      {/* {item.keytags.map((val, index) => ( */}

                      <div className={classes.tagcategorytesting} id={item.dataquery} onClick={(e) => { setQuery(item.dataquery); setPageNumber(1) }}>
                        <Typography color="secondary" component="h5" variant="body2">{stage(item.views)}</Typography>
                      </div>

                      {/* ))} */}

                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" justifyContent="center" alignItems="center">


                      <AccessTimeIcon style={{ fontSize: '14px' }} />
                      &nbsp; <Moment fromNow>{moment.utc(item.time_elapsed).local().format('YYYY-MMM-DD h:mm A')}</Moment>&nbsp;

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '4px' }}>
                      <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />&nbsp;{item.views}

                    </Box>
                  </Box>
                </CardContent>

              </Card>

            </Grid>
          }
        })}

      </Grid>


      {/* Best */}

      <Box borderBottom={4} borderColor="primary.light" mb={3}>
        <Typography component='h3' variant="h5" style={{ padding: '10px 0' }}>Best</Typography>
      </Box>
      <Grid container spacing={2} pt={1}>

        {datavideos.map((item, index) => {
          if (datavideos.length && item.views > 1000 && item.views <= 5000) {
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
                        <Typography gutterBottom variant="body3" color="textSecondary" component="p">

                          {item.channel_title.slice(0, 20)}
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

                  <Box className={classes.tagcontent}>
                    <Box className={classes.tagtext}>
                      <LocalOfferIcon style={{ color: "lightgray", fontSize: '1rem' }} />
                      {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                      {/* {item.keytags.map((val, index) => ( */}

                      <div className={classes.tagcategorytesting} id={item.dataquery} onClick={(e) => { setQuery(item.dataquery); setPageNumber(1) }}>
                        <Typography color="secondary" component="h5" variant="body2">{stage(item.views)}</Typography>
                      </div>

                      {/* ))} */}

                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" justifyContent="center" alignItems="center">


                      <AccessTimeIcon style={{ fontSize: '14px' }} />
                      &nbsp; <Moment fromNow>{moment.utc(item.time_elapsed).local().format('YYYY-MMM-DD h:mm A')}</Moment>&nbsp;

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '4px' }}>
                      <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />&nbsp;{item.views}

                    </Box>
                  </Box>
                </CardContent>

              </Card>

            </Grid>
          }
        })}

      </Grid>



      {/* Average */}

      <Box borderBottom={4} borderColor="primary.light" mb={3}>
        <Typography component='h3' variant="h5" style={{ padding: '10px 0' }}>Average</Typography>
      </Box>
      <Grid container spacing={2}>

        {datavideos.map((item, index) => {
          if (datavideos.length && item.views > 800 && item.views <= 1000) {
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
                        <Typography gutterBottom variant="body3" color="textSecondary" component="p">

                          {item.channel_title.slice(0, 20)}
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

                  <Box className={classes.tagcontent}>
                    <Box className={classes.tagtext}>
                      <LocalOfferIcon style={{ color: "lightgray", fontSize: '1rem' }} />
                      {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                      {/* {item.keytags.map((val, index) => ( */}

                      <div className={classes.tagcategorytesting} id={item.dataquery} onClick={(e) => { setQuery(item.dataquery); setPageNumber(1) }}>
                        <Typography color="secondary" component="h5" variant="body2">{stage(item.views)}</Typography>
                      </div>

                      {/* ))} */}

                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" justifyContent="center" alignItems="center">


                      <AccessTimeIcon style={{ fontSize: '14px' }} />
                      &nbsp; <Moment fromNow>{moment.utc(item.time_elapsed).local().format('YYYY-MMM-DD h:mm A')}</Moment>&nbsp;

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '4px' }}>
                      <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />&nbsp;{item.views}

                    </Box>
                  </Box>
                </CardContent>

              </Card>

            </Grid>
          }
        })}

      </Grid>



      {/* Below Average */}

      <Box borderBottom={4} borderColor="primary.light" mb={3}>
        <Typography component='h3' variant="h5" style={{ padding: '10px 0' }}>Below Average</Typography>
      </Box>
      <Grid container spacing={2} pt={1}>

        {datavideos.map((item, index) => {
          if (datavideos.length && item.views > 0 && item.views <= 800) {
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
                        <Typography gutterBottom variant="body3" color="textSecondary" component="p">

                          {item.channel_title.slice(0, 20)}
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

                  <Box className={classes.tagcontent}>
                    <Box className={classes.tagtext}>
                      <LocalOfferIcon style={{ color: "lightgray", fontSize: '1rem' }} />
                      {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                      {/* {item.keytags.map((val, index) => ( */}

                      <div className={classes.tagcategorytesting} id={item.dataquery} onClick={(e) => { setQuery(item.dataquery); setPageNumber(1) }}>
                        <Typography color="secondary" component="h5" variant="body2">{stage(item.views)}</Typography>
                      </div>

                      {/* ))} */}

                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" justifyContent="center" alignItems="center">


                      <AccessTimeIcon style={{ fontSize: '14px' }} />
                      &nbsp; <Moment fromNow>{moment.utc(item.time_elapsed).local().format('YYYY-MMM-DD h:mm A')}</Moment>&nbsp;

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '4px' }}>
                      <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />&nbsp;{item.views}

                    </Box>
                  </Box>
                </CardContent>

              </Card>

            </Grid>
          }
        })}

      </Grid>




      {/* Normal */}
      
      <Box borderBottom={4} borderColor="primary.light" mb={3}>
        <Typography component='h3' variant="h5" style={{ padding: '10px 0' }}>Normal</Typography>
      </Box>
      <Grid container spacing={2} pt={1}>

        {datavideos.map((item, index) => {
          if (datavideos.length && item.views == 0) {
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
                        <Typography gutterBottom variant="body3" color="textSecondary" component="p">

                          {item.channel_title.slice(0, 20)}
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

                  <Box className={classes.tagcontent}>
                    <Box className={classes.tagtext}>
                      <LocalOfferIcon style={{ color: "lightgray", fontSize: '1rem' }} />
                      {/* <Chip size="small" label="Basic" style={{margin:"2px"}} /> */}


                      {/* {item.keytags.map((val, index) => ( */}

                      <div className={classes.tagcategorytesting} id={item.dataquery} onClick={(e) => { setQuery(item.dataquery); setPageNumber(1) }}>
                        <Typography color="secondary" component="h5" variant="body2">{stage(item.views)}</Typography>
                      </div>

                      {/* ))} */}

                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
                    <Box display="flex" justifyContent="center" alignItems="center">


                      <AccessTimeIcon style={{ fontSize: '14px' }} />
                      &nbsp; <Moment fromNow>{moment.utc(item.time_elapsed).local().format('YYYY-MMM-DD h:mm A')}</Moment>&nbsp;

                    </Box>

                    <Box display="flex" justifyContent="center" alignItems="center" style={{ marginTop: '4px' }}>
                      <VisibilityOutlinedIcon style={{ fontSize: '14px' }} />&nbsp;{item.views}

                    </Box>
                  </Box>
                </CardContent>

              </Card>

            </Grid>
          }
        })}

      </Grid>


























      <Grid item xs={12} style={{ marginLeft: '45%' }}>
       
        {error && 'Error'}
        {errormsg}
        {!hasMore ? <Button size="small" color="primary">
          No more Records
            </Button> : null}

        {isloading ? <CircularProgress /> : null}
      </Grid>

      <ModalPortal open={isOpen} vidurl={videourl} onClose={() => setIsOpen(false)}></ModalPortal>

    </>
  )




}

export default Trends
