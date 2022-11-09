import axios from "axios";
import {API_URL} from "../../../constants/index";
// import queryString from "query-string";

//set up default config for axios
const axiosClient = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        'Content-Type': 'application/json',
    }
    // ,
    // paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    // const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJiaW5obnYxIiwib3JnIjoibmFzaHRlY2giLCJleHAiOjE2NTkwMTE3NDQsImlhdCI6MTY1ODk5Mzc0NH0.1WT44cNqGtR_4KWew41BqNhopjuzM1rH29BSpSV3g9LQyOF9T332jyCcVzlPqTimLeLyYUoBIFvi1U5bh7NCJA'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

// axiosClient.interceptors.response.use((response) => {
//     if(response && response.data){
//         return response.data;
//     }
//     return response;
// }, (error)=>{
//     if(error.response && error.response.status === 401){
//         localStorage.removeItem('token');
//         window.location.reload();
//     }
//     return Promise.reject(error);
// });
export default axiosClient;