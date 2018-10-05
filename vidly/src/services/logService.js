// import * as Sentry from '@sentry/browser';
import {toast} from 'react-toastify';

function init() {
   // Sentry.init({ dsn: 'https://5ac2d558d6a74f85af73e42d195d607f@sentry.io/1288762' });
}

function log(message) {
   console.log(message);
   toast.log(message);
   // Sentry.captureException(message);
}

function error(message) {
   console.error(message);
   toast.error(message);
   // Sentry.captureException(message);
}

export default { init, log, error };