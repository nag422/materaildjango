import axios from 'axios';
const baseURL = "https://app.kiranvoleti.com";

const axiosInstance = axios.create({
    baseURL:baseURL,
    // timeout: 5000,
    headers: {
        Authorization: localStorage.getItem('access')
        ? 'JWT ' + localStorage.getItem('access'):null,
        'Content-Type': 'application/json',
        accept: 'application/json'
    },
    // cancelToken: new axios.CancelToken(c => cancel = c)
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;
        

        if(typeof error.response === 'undefined') {
            console.log('Network error');
            window.location.replace('/login')
            return Promise.reject(error);
        }
        if(error.response.status === 401){
                console.log('login 401')
                window.location.replace('/login')
                return Promise.reject(error);
            }
            if (
                error.response.data.code === 'token_not_valid' &&
                error.response.status === 401 &&
                error.response.statusText === 'Unauthorized'
            ) {

                const refreshToken = localStorage.getItem('refresh_token');
                if (refreshToken) {
                    const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
    
                    // exp date in token is expressed in seconds, while now() returns milliseconds:
                    const now = Math.ceil(Date.now() / 1000);
                    console.log(tokenParts.exp,'token expire error');
    
                    if (tokenParts.exp > now) {
                        return axiosInstance
                            .post('/auth/jwt/refresh/', { refresh: refreshToken })
                            .then((response) => {
                                localStorage.setItem('access_token', response.data.access);
                                localStorage.setItem('refresh_token', response.data.refresh);
    
                                axiosInstance.defaults.headers['Authorization'] =
                                    'JWT ' + response.data.access;
                                originalRequest.headers['Authorization'] =
                                    'JWT ' + response.data.access;
    
                                return axiosInstance(originalRequest);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    } else {
                        console.log('Refresh token is expired', tokenParts.exp, now);
                        window.location.replace('/login')
                    }
                } else {
                    console.log('Refresh token not available.');                    
                    window.location.replace('/login')
                }



            }
        
    }
)

export default axiosInstance;