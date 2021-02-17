import React, { useState, useRef, useCallback } from 'react'
import useArticleSearch from './useArticleSearch'
import { CircularProgress, Button, Grid, Avatar, Box, Chip, TextField, MenuItem, FormControl, InputLabel, Input, FormHelperText, Link } from '@material-ui/core';
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


const useStyles = makeStyles(theme => ({
  root:{},
  cardsource: {
    // maxWidth:'370px',
    // maxWidth: '340px',
    // boxSizing:'border-box',
    borderRadius:'0px',
    marginTop: '1%',
    '& .MuiCardContent-root': {
      padding: '22px',
      minHeight: '260px',
      maxHeight: '260px',
    },
    '& .MuiTypography-h6': {
      margin: '5px auto',
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
  small: {
    width:'10px',
    height:'10px',
    top:'5.5px'
  },
  content: {
    padding: '2px auto auto atuo'
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
  tagcontent:{
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
  tagtext:{
    marginTop: '5px',
    fontSize: '8px',
    position: 'relative',      
    color: '#5c5a5a',
    display: 'flex',
    flexDirection: 'row',
    cursor: 'pointer'
  },
  tagcategorytesting:{
    alignItems:"center",
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
  searchformcustom:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between",
    
    '& .MuiSelect-select':{
      minWidth:'150px'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent:"flex-start",
      margin:'5px 3px'
    }
  }
}));
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

const Articles = () => {
 
  
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [orderby, setOrderby] = useState('newest')
  const [errormsg, setErrormsg] = useState('')
  React.useEffect(() => {
    if (!localStorage.getItem('remain')) {
      setErrormsg('Your Plan is Expired! Upgrade Now')      
      
    }
    if(localStorage.getItem('trends') == "yes"){
        window.location.replace('/profile')
    }
    
  
  }, [])
  

  const {
    articles,
    hasMore,
    loading,
    error    
  } = useArticleSearch(query, pageNumber, orderby)

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

  function handleSearch(e) {

    setOrderby(orderby)
    setPageNumber(1)
  }

  // function keytagsearch(e) {
  //   // setPageNumber(1)
  //   console.log(e)
  //   setQuery(e.target.id)
  // }


  const urlparser = (url) => {
    var parser = new URL(url);
    var newurl = parser.host;
    return newurl;
  }

  const addDefaultSrc = (ev) => {
    ev.target.src = 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg'
  }





  return (
    <>
      <Grid container style={{ backgroundColor: "#fff", padding: '0.6% 0 0 2%', minHeight:'100px' }}
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
            onChange={(e) => setQuery(e.target.value)}
          />
          </Box>
        </Grid>

        <Grid item xs={12} md={5} sm={12} className={classes.formalign}>
        <Box className={classes.searchformcustom}>
          <InputLabel >Order : </InputLabel>
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            size="small"
            onChange={(e) => setOrderby(e.target.value)}            
            variant="outlined"
          >

            <MenuItem key='newest' value='newest'>
              New
            </MenuItem>
            <MenuItem key='oldest' value='oldest'>
              Oldest
            </MenuItem>

          </TextField>
          
          <Button onClick={handleSearch} className={classes.buttonalign} variant="contained" color="primary">Submit</Button>
          </Box>
        </Grid>

        </Grid>



     

      <Grid container spacing={2}>
      {articles.map((item, index) => {
        if (articles.length === index + 1) {
          // return <div ref={lastBookElementRef} key={index}>{article.title}</div>
          return <Grid item xs={12} md={3} sm={3} key={index} ref={lastBookElementRef}>

            <Card elevation={0} className={classes.cardsource}>
              <CardActionArea>
                <Link href={item.URL} underline="none">
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="140"
                    image={item.image}
                    title={item.title}
                    onError={addDefaultSrc}
                  />
                    <Box className={classes.productImageOverlay}></Box>
                </Link>
                
              </CardActionArea>
              <CardContent>


                <Box display="flex">
                  <Box>
                    <Avatar className={classes.small}>
                      <PublicIcon style={{fontSize:'11px'}} />
                    </Avatar>
                    <Link href={item.URL} underline="none" color="inherit">
                      <Typography gutterBottom variant="body2" color="textSecondary" component="p">

                        {urlparser(item.URL)}
                      </Typography>
                    </Link>
                  </Box>
                  

                </Box>

                
                <Box className={classes.content}>
                  <Link href={item.URL} underline="none" color="inherit" target="_blank">
                    <Typography variant="h6" component="p">
                      {item.title}
                    </Typography>
                  </Link>
                </Box>

                <Box className={classes.tagcontent}>
                  <Box className={classes.tagtext}>
                  <LocalOfferIcon  style={{ color: "lightgray",fontSize:'1rem' }} />
                  
 

                  {item.keytags.map((val, index) => (
                    // <Chip size="small" key={index} label={val} style={{ margin: "2px", wrap: 'wrap', overflow: 'hidden' }} id={val} onClick={(e) => { setQuery(val); setPageNumber(1) }} />
                    <div key={index}  className={classes.tagcategorytesting} id={val} onClick={(e) => { setQuery(val); setPageNumber(1) }}>{val}</div>
                  ))}
                </Box>
                </Box>


                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <AccessTimeIcon fontSize='small' />
                    &nbsp;<Moment filter={toUpperCaseFilter} fromNow>{item.time_elapsed}</Moment>&nbsp;
                  </Box>
              </CardContent>
              {/* </CardActionArea> */}
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
      </Button>
                <Button size="small" color="primary">
                  Learn More
      </Button>
              </CardActions> */}
            </Card>

          </Grid>
        } else {
          // return <div key={index}>{article.title}</div>
          return <Grid item xs={12} md={3} sm={3} key={index}>

            <Card elevation={0} className={classes.cardsource}>
              <CardActionArea>
                <Link href={item.URL} underline="none">
                  <CardMedia
                    component="img"
                    alt={item.title}
                    height="140"
                    image={item.image}
                    title={item.title}
                    onError={addDefaultSrc}
                  />
                  <Box className={classes.productImageOverlay}></Box>
                </Link>
                
              </CardActionArea>
              <CardContent>


                <Box display="flex">
                  <Box  order={1}>
                    <Avatar className={classes.small}>
                    <PublicIcon style={{fontSize:'11px'}} />
                    </Avatar>
                  </Box>
                  <Box pl={1} order={2}>
                    <Link href={item.URL} underline="none" color="inherit">
                      <Typography gutterBottom variant="body2" color="textSecondary" component="p">

                        {urlparser(item.URL)}
                      </Typography>
                    </Link>
                  </Box>

                </Box>
                <Box className={classes.content}>
                  <Link href={item.URL} underline="none" color="inherit" target="_blank">
                    <Typography variant="h6" component="p">
                      {item.title}
                    </Typography>
                  </Link>
                </Box>

                <Box className={classes.tagcontent}>
                  <Box className={classes.tagtext}>
                  <LocalOfferIcon  style={{ color: "lightgray",fontSize:'1rem' }} />
                  


                  {item.keytags.map((val, index) => (
                    // <Chip size="small" key={index} label={val} style={{ margin: "2px", wrap: 'wrap', overflow: 'hidden' }} id={val} onClick={(e) => { setQuery(val); setPageNumber(1) }} />
                    <div key={index}  className={classes.tagcategorytesting} id={val} onClick={(e) => { setQuery(val); setPageNumber(1) }}>{val}</div>
                  ))}
                </Box>
                </Box>
                <Box display="flex" justifyContent="flex-start" alignItems="center">
                  <AccessTimeIcon style={{fontSize:'14px'}} />
                    &nbsp;<Moment filter={toUpperCaseFilter} fromNow>{item.time_elapsed}</Moment>&nbsp;
                  </Box>
              </CardContent>
              {/* </CardActionArea> */}
              {/* <CardActions>
                <Button size="small" color="primary">
                  Share
      </Button>
                <Button size="small" color="primary">
                  Learn More
      </Button>
              </CardActions> */}
            </Card>

          </Grid>

        }
      })}
      <Grid item xs={12} style={{ marginLeft: '45%' }}>
        {loading && <CircularProgress disableShrink />}
        {error && 'Error'}
        {errormsg}
        {/* {!hasMore && <Button size="small" color="primary">
          No more Records
            </Button>} */}
      
      </Grid>
      </Grid>
    </>
  )




}

export default Articles
