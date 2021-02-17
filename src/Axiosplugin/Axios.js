import axios from 'axios';
const baseURL = 'https://app.kiranvoleti.com/';
const axiosInstance = axios.create({
    baseURL:baseURL,
    timeout: 5000,
    headers: {
		Authorization: localStorage.getItem('access_token') ?
			'JWT ' + localStorage.getItem('access_token') :
			null,
		'Content-Type': 'application/json',
		accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function(error){
        const originalRequest = error.config;
        if(typeof error.response === 'undefined'){
            alert('A server/network error occurred. ' +
            'Looks like CORS might be the problem. ' +
            'Sorry about this - we will get it fixed shortly.'
            );
            return Promise.reject(error);
        }
        if(
            error.response.status === 401 &&
            originalRequest.url === baseURL + 'token/refresh/'
        ) {
            window.location.href="/login";
            return Promise.reject(error);
        }
        
    }
)