import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useArticleSearch(query, pageNumber, orderby) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [tools, setTools] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setTools([])
        pageNumber=1
    }, [query,orderby])

    useEffect(() => {
        if(!localStorage.getItem('remain')) return;
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'https://app.kiranvoleti.com/user/tools_scroll_page/',
            params: { q: query, page: pageNumber, orderby: orderby },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,                
                'Accept': 'application/json'
            },
            
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setTools(prevTools => {
                return [...new Set([...prevTools, ...res.data.response])]
            })
            setHasMore(res.data.response.length > 0)
            setLoading(false)
        }).catch(e => {
            console.log(e)
            setLoading(false)
            if (axios.isCancel(e)) return
            setError(true)
        })
        return () => cancel()
    }, [query, pageNumber,orderby])

    return { loading, error, tools, hasMore }
}

