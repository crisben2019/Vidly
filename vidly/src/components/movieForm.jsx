import React from 'react';
import Joi from 'joi-browser';
import Form from './common/form';
import { getGenres } from '../services/genreService';
import { getMovie, saveMovie } from '../services/movieService';
import { toast } from 'react-toastify';

export default class MovieForm extends Form {
   state = {
      movieId: '',
      data: { title: '', numberInStock: 0, dailyRentalRate: 0, genreId: '' },
      genres: [],
      errors: {}
   }

   async populateGenres() {
      const { data: genres } = await getGenres();
      genres.splice(0, 0, { _id: "", name: "Select a genre" });
      this.setState({ genres });
   }

   async populateMovie() {
      try {
         const movieId = this.props.match.params.id;
         if (movieId === 'new') return;
         const { data: movie } = await getMovie(movieId);
         this.setState({ data: this.mapToViewModel(movie) });
      } catch (ex) {
         if (ex.response && ex.response.status === 404) {
            this.props.history.replace('/not-found');
         }
      }
   }

   async componentDidMount() {
      await this.populateGenres();
      await this.populateMovie();
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


   doSubmit = async () => {
      try{
         await saveMovie(this.state.data);
         this.props.history.push('/movies');
      }catch(ex){
         if(ex.response && ex.response.status === 400){
            toast.error('Oops, something is wrong! Try again.');
         }
      }
      
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