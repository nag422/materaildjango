import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactPlayer from 'react-player/lazy'
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        // width:'500px', 
        [theme.breakpoints.down('sm')]: {
            width: '345px',
            overflow:"hidden"
            
        }
    },
    reactplayer:{
        position: 'absolute',
        top: 0,
        left: 0,
       [theme.breakpoints.down('sm')]: {
           width: '345px',
           height: '284px'
       }

    }
}))
export default function ScrollDialog({vidurl,title,handleClose,open}) {
    const classes = useStyles();

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <Box className={classes.root}>
            
      <Dialog
        
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
        <DialogContent dividers={false}>
            <Box style={{position:'relative'}}>
            <ReactPlayer 
                
                playing={true} 
                controls={true} 
                url={vidurl}   
                width='500px'                
                className={classes.reactplayer}
                //   height='100%'        
                />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close
          </Button>
         
        </DialogActions>
      </Dialog>
    </Box>
  );
}