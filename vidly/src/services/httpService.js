import axios from 'axios';
import logger from './logService';
import config from '../config/config';

const instance = axios.create({
   baseURL: config.apiBaseURL,
   timeout: 5000
});

instance.interceptors.response.use(null, 
   ex => {
      if(ex.response){
         logger.error(ex.response.data);
      }else{
         logger.error(ex.message);
      }
      return Promise.reject(ex);
   }
);

function setJWT(jwt){
   instance.defaults.headers.common['x-auth-token'] = jwt;
}

export default {
   setJWT,
   get: instance.get,
   post: instance.post,
   put: instance.put,
   delete: instance.delete
};