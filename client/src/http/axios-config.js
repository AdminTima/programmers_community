import axios from "axios";
import {API_URL} from "@/consts/api-consts";
import {store} from "@/store/store";


export const publicApi = axios.create({
   baseURL: API_URL,
    withCredentials: true,
});

export const authApi = axios.create({
   baseURL: API_URL,
   withCredentials: true,
});

authApi.interceptors.request.use(config => {
   config.headers.Authorization = `Bearer ${localStorage.getItem('access')}`;
   return config;
});

authApi.interceptors.response.use(config => {
   return config;
}, async (error) => {
      const originalRequest = error.config;
      if(originalRequest && error.response.status === 401 && !originalRequest.isRetry) {
         originalRequest.isRetry = true;
         try {
            const response = await publicApi.get('/tokens/refresh', {withCredentials: true});
            localStorage.setItem('access', response.data.accessToken);
            localStorage.setItem('username', response.data.username);
            return authApi.request(originalRequest);
         } catch (err) {
            console.log(err, 'error cs');
            if(err.response.status === 401) {
                localStorage.removeItem('isAuth');
                localStorage.removeItem('access');
                localStorage.removeItem('username');
                localStorage.removeItem('userId');
                store.commit('changeIsAuth', false);
            }
         }
      }
    }
    );