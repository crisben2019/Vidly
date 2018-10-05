import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import Logout from './components/logout';
import NotFound from './components/common/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import ProtectedRoute from './components/common/protectedRoute';

import auth from './services/authService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
   state = {};

   componentDidMount() {
      const user = auth.getCurrentUser();
      this.setState({ user });
   }

   render() {
      const { user } = this.state;
      return (
         <React.Fragment>
            <ToastContainer />
            <main className="container">
               <NavBar user={this.state.user} />
               <Switch>
                  <Route path="/login" component={LoginForm} />
                  <Route path="/register" component={RegisterForm} />
                  <ProtectedRoute path="/movies/:id" component={MovieForm} />
                  <Route path="/movies" render={props => <Movies {...props} user={user} />} />
                  <Route path="/customers" component={Customers} />
                  <Route path="/rentals" component={Rentals} />
                  <Route path="/logout" component={Logout} />
                  <Route path="/not-found" component={NotFound} />
                  <Redirect exact from="/" to="/movies" />
                  <Redirect to="/not-found" />
               </Switch>
            </main>
         </React.Fragment>
      );
   }
}

export default App;
