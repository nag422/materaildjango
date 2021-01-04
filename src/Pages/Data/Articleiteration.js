import React from 'react'
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import { Grid,Box } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles({
    cardsource: {
        // maxWidth:'370px',
        maxWidth:'300px',
        // paddingLeft:'2%'
    },
});
const toUpperCaseFilter = (d) => {
    return d.replace("a day ago", "1 day ago");;
};
const Articleiteration = (props) => {
    const classes = useStyles();
    const {lastelm,articles} = props;
    const addDefaultSrc = (ev) => {
        ev.target.src = 'https://app.kiranvoleti.com/static/assets/images/imagenotfound.jpg'
    }
    const urlparser = (url) => {
        var parser = new URL(url);
        var newurl = parser.host;
        return newurl;
    }

    let items = articles.map((item, key) =>{

            

        // <div className="col-md-3">
        //     <div className="card product-card">
        //         <a target="_blank" href={item.URL}>
        //             <img
        //                 className="img-responsive product-image"
        //                 src={item.image}
        //                 alt={item.title}
        //                 style={{ width: "100%" }}
        //                 onError={addDefaultSrc}


        //             />

        //             <div className="product-image-overlay"></div>
        //         </a>
        //         <div className="card-body d-flex flex-column">
        //             <p className="product-title">
        //                 <span className="icon md-image-alt" aria-hidden="true"></span>&nbsp;

        //               <a className="product-icontitle" target="_blank" href={item.URL}>{urlparser(item.URL)}</a>
        //             </p>
        //             <div className="product-content">
        //                 <h3 className="product-text">
        //                     <a target="_blank" href={item.URL} className="nodeclink">{item.title}</a>
        //                 </h3>

        //             </div>
        //             <div className="tag-content">
        //             <div className="tag-text">
        //                 <i className="icon md-label" style={{fontSize:"14px",marginRight:"3px"}} aria-hidden="true"></i>
        //                 {item.keytags.map((val,index) => (
        //                     // <div key={index} className="tagcategorytesting"><span id={val} >{val}</span></div>
        //                     <a key={index} className="tagcategorytesting" id={val} onClick={props.keytagsearch}>{val}</a>

        //                 ))}


        //                 </div>

        //             </div>
        //         </div>
        //         <div className="card-footer d-flex product-card-footer">
        //         <div className="product-card-footer-firstchild">
        //             <span className="icon md-globe" aria-hidden="true"></span>

        //             &nbsp;<Moment filter={toUpperCaseFilter} fromNow>{item.time_elapsed}</Moment>&nbsp;
        //             </div>
        //             {/* start tags */}
        //             {/* start tags */}

        //           </div>
        //     </div>
        // </div>
        

          
          if(articles.length === key+1){
          
                    return (<Grid item xs={12} md={3} sm={3} ref={lastelm}>
                        
                        <Card  elevation={0}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image={item.image}
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {urlparser(item.URL)}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {item.title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                    </Button>
                                <Button size="small" color="primary">
                                    Learn More
                    </Button>
                            </CardActions>
                        </Card>
                        
                    </Grid>)
          }
          else{
            return (<Grid item xs={12} md={3} sm={3}>
                        
                <Card  elevation={0}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            alt="Contemplative Reptile"
                            height="140"
                            image={item.image}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {urlparser(item.URL)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.title}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
            </Button>
                        <Button size="small" color="primary">
                            Learn More
            </Button>
                    </CardActions>
                </Card>
                
            </Grid>)

          }
        
        


     } );
    return (
        <>
            
            {items}
            
            


        </>
    );
}

export default Articleiteration;