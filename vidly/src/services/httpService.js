import axios from 'axios';
import logger from './logService';
import config from '../config/config';

const instance = axios.create({
   baseURL: config.apiBaseURL,
   timeout: 5000
});

instance.interceptors.response.use(null, 
   error => {
      console.dir(error);
      const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;
      if (!expectedError) {
         logger.error(error.message);
      }
      return Promise.reject(error);
   }
);

export default {
   get: instance.get,
   post: instance.post,
   put: instance.put,
   delete: instance.delete
};