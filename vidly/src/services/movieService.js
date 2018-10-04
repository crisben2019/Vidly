import http from './httpService';

const apiEndpoint = '/movies';

function movieURL(id){
   return `${apiEndpoint}/${id ? id : ''}`;
}

export function getMovies() {
   return http.get(movieURL());
}

export function getMovie(id) {
   return http.get(movieURL(id));
}

export async function saveMovie(movie) {
   if(movie._id){
      const body = {...movie};
      delete body._id;
      return http.put(movieURL(movie._id), body);
   }else{
      return http.post(apiEndpoint, movie);
   }
}

export function deleteMovie(movie) {
   return http.delete(movieURL(movie._id || movie));
}
