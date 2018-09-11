import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import './App.css';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/notFound';
import Movie from './components/movie';

class App extends Component {
   render() {
      return (
         <main className="container">
            <NavBar />
            <Switch>
               <Route path="/movies/:id" component={Movie} />
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
