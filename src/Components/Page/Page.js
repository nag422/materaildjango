import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { NavLink } from "react-router-dom";
const Page =  (({
    children,
    title,
    breadcomb,
    ...rest
}) => {
    return (
        <div
        
        {...rest}
        >
           <Box display="flex" p={2} pt={0} pb={5}>
                <Box p={1} flexGrow={1}>
                {breadcomb.slice(1).charAt(0).toUpperCase() + breadcomb.slice(2)}
                
                </Box>
                <Box p={1}>
                <NavLink to='/'>Dashboard</NavLink>/{breadcomb.slice(1).charAt(0).toUpperCase() + breadcomb.slice(2)}
                </Box>
               
      </Box>
                    
              
            
            
            <Helmet>
                <title>{title}</title>
            </Helmet>
            
            {children}
            
        </div>
    )
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default Page
