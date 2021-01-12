
import React from 'react'
import ReactDom from 'react-dom'
import ReactPlayer from 'react-player/lazy'
import './modalportal.css';
const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '5px',
  zIndex: 1000,
  transition: 'all 0.75s ease-out',
  
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
  transition: 'all 0.75s ease-out'
}

const BUTTON_STYLES = {
    border:'1px solid lightgray',
    backgroundColor:'red',
    color:'#fff',
    float: 'right',
    marginTop:'-35px',
    cursor:'pointer'
    
    // fontSize: '12px'
}

export default function ModalPortal({ open, vidurl, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
          <div onClick={onClose} style={{zIndex:999999}}>
          <button style={BUTTON_STYLES}>{'X'}</button>    
          </div>

          <div>
          <ReactPlayer className='reactplayer' playIcon playing={true} controls={true} url={vidurl} 
          
          />
          </div>
        
      </div>
    </>,
    document.getElementById('portal')
  )
}