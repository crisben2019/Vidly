import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
   return (
      <Route {...rest} render={props => {
         if (auth.getCurrentUser()) {
            return Component ? <Component {...props} /> : render(props);
         } else {
            return <Redirect to={{pathname: '/login', state: {from: props.location}}} />
         }
      }} />
   );
}

export default ProtectedRoute;