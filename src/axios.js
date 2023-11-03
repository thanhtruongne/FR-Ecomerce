import axios from 'axios';
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER
  });

  instance.interceptors.response.use(
    (response) => {

        const { data } = response;
        return response.data;
    })
    instance.interceptors.request.use(function (config) {
      // tạo token trong Authorization;
       let localSetitemToken = window.localStorage.getItem('persist:user');
       if(localSetitemToken) {
          localSetitemToken = JSON.parse(localSetitemToken);
          const accessToken = JSON.parse(localSetitemToken?.token)
          config.headers = {Authorization : `Bearer ${accessToken}`}
          return config;
       }
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
    });
  


export default instance;
