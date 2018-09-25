import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/notFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import './App.css';
import RegisterForm from './components/registerForm';

class App extends Component {
   render() {
      return (
         <main className="container">
            <NavBar />
            <Switch>
               <Route path="/login" component={LoginForm} />
               <Route path="/register" component={RegisterForm} />
               <Route path="/movies/:id" component={MovieForm} />
               <Route path="/movies" component={Movies} />
               <Route path="/customers" component={Customers} />
               <Route path="/rentals" component={Rentals} />
               <Route path="/not-found" component={NotFound} />
               <Redirect exact from="/" to="/movies" />
               <Redirect to="/not-found" />
            </Switch>
         </main>
      );
   }
}

export default App;
