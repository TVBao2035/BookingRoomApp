import axios from "axios";
import {store} from '../hooks/redux/store';

// const token = useSelector((state)=> state.user.token)
// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: 'http://localhost:3030'
});
instance.defaults.withCredentials = true;
// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = `Bearer ${token}` ;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = store.getState()?.user?.token ? store.getState()?.user?.token : "";
    console.log("GET token: =>> ", token);
    config.headers.Authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response.data;
}, function (error) {
    switch (error.response.status){
        case 403:
        {
            alert("Token Expired.Please Login!!");
            localStorage.clear('isLogin');
            window.location.pathname = '/signIn';
        }
        case 401:{
            alert("Please Login!!");
            localStorage.clear('isLogin');
            window.location.pathname ='/signIn';
            return;
        }
        case 404:{
            alert(error.response.data.message);
            return error.response.data;
        }
        
        case 400: {
            return error.response.data;
        }

        case 409: {
            return error.response.data;
        }
    }
  
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default instance;