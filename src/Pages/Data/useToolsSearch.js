import React,{ useEffect, useState } from 'react'
import axiosInstance from '../../axiosmodelapi';


export default function useToolSearch(query, pageNumber, orderby) {
    
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tools, setTools] = useState([])
    const [hasMore, setHasMore] = useState(false)
    
    


    useEffect(() => {
        setTools([])
        pageNumber=1
    }, [query,orderby])

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        

    
        setLoading(true)
        setError(false)

        
     
        axiosInstance.get('/user/tools_scroll_page/',{
            
            params: { q: query, page: pageNumber, orderby: orderby },
            
            
        }).then(res => {
            setTools(prevTools => {
                return [...new Set([...prevTools, ...res.data.response])]
            })
            setHasMore(res.data.response.length > 0)
            setLoading(false)
        }).catch(e => {
            // console.log(e)
            setLoading(false)
            
            setError(true)
        })
        
    }, [query, pageNumber,orderby])

    return { loading, error, tools, hasMore }
}

