import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useVideoSearch(query, pageNumber, orderby) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [videos, setVideos] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setVideos([])
        pageNumber=1

    }, [query,orderby])

    useEffect(() => {
        if(!localStorage.getItem('remain')) return;
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method: 'GET',
            url: 'https://app.kiranvoleti.com/user/videos_scroll_page/',
            params: { q: query, page: pageNumber, orderby: orderby },
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,   
                // 'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEwMDQ2OTIxLCJqdGkiOiJjOThiZjk5MjhjZjA0YjIyYTlmMWJlYTkxNTU2Njk3NSIsInVzZXJfaWQiOjF9.LVg285l2hEj2hqW56kFafMMU9lC2eFYSF_LMse9epuo',             
                'Accept': 'application/json'
            },
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setVideos(prevVideos => {
                return [...new Set([...prevVideos, ...res.data.response])]
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

    return { loading, error, videos, hasMore }
}

