import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/fakeGenreService';
import { getMovie, saveMovie } from '../services/fakeMovieService';

export default class MovieForm extends Form {
   state = {
      movieId: '',
      data: { title: '', numberInStock: 0, dailyRentalRate: 0, genreId: '' },
      genres: [],
      errors: {}
   }

   componentWillMount() {
      const genres = [{ _id: "", name: "Select a genre" }, ...getGenres()];
      const { id } = this.props.match.params;
      if (id && id !== 'new') {
         const movie = getMovie(id);
         if (movie) {
            this.setState({ data: this.mapToViewModel(movie), genres });
         } else {
            this.props.history.replace('/not-found');
         }
      }else{
         this.setState({ genres });
      }
   }

   mapToViewModel = movie => {
      return {
         _id: movie._id,
         title: movie.title,
         genreId: movie.genre._id,
         numberInStock: movie.numberInStock,
         dailyRentalRate: movie.dailyRentalRate
      };
   }

   schema = {
      _id: Joi.string(),
      title: Joi.string().required().label('Title'),
      genreId: Joi.string().required(),
      numberInStock: Joi.number().required().min(0),
      dailyRentalRate: Joi.number().required().min(0).max(10),
      liked: Joi.any()
   };


   doSubmit = () => {
      saveMovie(this.state.data);
      this.props.history.push('/movies');
   }

   render() {
      return (
         <div>
            <h1>Movie Form</h1>
            <form onSubmit={this.handleSubmit}>
               {this.renderInput('title', 'Title')}
               {this.renderDropDownList('genreId', 'Genre', { value: '_id', label: 'name', data: this.state.genres })}
               {this.renderInput('numberInStock', 'Number In Stock', 'number')}
               {this.renderInput('dailyRentalRate', 'Rate', 'number')}
               {this.renderButton('Save')}
            </form>
         </div>
      );
   }
};