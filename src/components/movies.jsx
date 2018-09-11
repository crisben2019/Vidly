import React, { Component } from 'react';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup"
import { paginate } from "../utils/paginate";
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      sortColumn: { path: 'title', order: 'asc' }
   }

   componentDidMount = () => {
      const genres = [{ _id: '', name: "All" }, ...getGenres()];
      this.setState({
         movies: getMovies(),
         genres
      });
   }

   handleDelete = (movie) => {
      const movies = this.state.movies.filter(m => m._id !== movie._id);
      this.setState({ movies: movies });
      //this.state.movies = movies;
      this.handlePageChange(this.state.currentPage);
   }

   handleLike = (movie) => {
      movie.liked = !movie.liked;
      this.setState({ movies: this.state.movies });
   }

   handlePageChange = (page) => {
      const pagesCount = Math.ceil(this.state.movies.length / this.state.pageSize);
      let currentPage = Math.min(Math.max(page, 1), pagesCount);
      this.setState({ currentPage });
   }

   handleGenreSelect = (genre) => {
      this.setState({ selectedGenre: genre });
   }

   handleSort = sortColumn => {
      this.setState({ sortColumn });
   }

   getPagedData = () => {
      const { length: count } = this.state.movies;
      const { pageSize, currentPage, selectedGenre, movies, sortColumn } = this.state;

      const filtered = selectedGenre && selectedGenre._id ? movies.filter(m => m.genre._id === selectedGenre._id) : movies;
      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
      const paginatedMovies = paginate(sorted, currentPage, pageSize);

      return { totalCount: filtered.length, data: paginatedMovies };
   };

   render() {
      const { pageSize, currentPage, sortColumn } = this.state;
      const { totalCount, data: movies } = this.getPagedData();
      if (totalCount === 0) return <p>There are no movies in the database.</p>;

      return (
         <div className="row">
            <div className="col-3">
               <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
            </div>
            <div className="col">
               <p>Showing {totalCount} movies in the database.</p>
               <MoviesTable sortColumn={sortColumn} movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} />
               <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
         </div>
      );
   }
}

export default Movies;
