import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from '../services/fakeGenreService';
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup"
import { paginate } from "../utils/paginate";
import MoviesTable from './moviesTable';
import _ from 'lodash';
import SearchBox from './common/searchBox';

class Movies extends Component {
   state = {
      movies: [],
      genres: [],
      pageSize: 4,
      currentPage: 1,
      selectedGenre: null,
      searchText: '',
      sortColumn: { path: 'title', order: 'asc' }
   }

   componentDidMount = () => {
      const genres = [{ _id: '', name: "All" }, ...getGenres()];
      const movies = getMovies();
      // for(let m of movies){
      //    m.title = <Link to={'/movies/' + m._id}>{m.title}</Link>;
      // }
      this.setState({
         movies,
         genres,
         selectedGenre: genres[0]
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
      this.setState({ selectedGenre: genre, searchText: '' });
   }

   handleSort = sortColumn => {
      this.setState({ sortColumn });
   }

   getPagedData = () => {
      const { pageSize, currentPage, selectedGenre, movies, sortColumn } = this.state;

      let filtered = movies;

      if(this.state.searchText){
         filtered = filtered.filter(m => m.title.toUpperCase().indexOf(this.state.searchText.toUpperCase()) >= 0);
      }

      if(selectedGenre && selectedGenre._id){
         filtered = filtered.filter(m => m.genre._id === selectedGenre._id);
      }

      const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
      const paginatedMovies = paginate(sorted, currentPage, pageSize);
      return { totalCount: filtered.length, data: paginatedMovies };
   };

   handleSearch = query => {
      this.setState({ searchText: query, selectedGenre: this.state.genres[0], currentPage: 1 });
   }

   render() {
      const { pageSize, currentPage, sortColumn } = this.state;
      const { totalCount, data: movies } = this.getPagedData();
      // if (totalCount === 0) return <p>There are no movies in the database.</p>;

      return (
         <div className="row">
            <div className="col-3">
               <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
            </div>
            <div className="col">
               <Link className="btn btn-primary mb-2" to="/movies/new">Add</Link>
               <SearchBox onChange={this.handleSearch} value={this.state.searchText} />
               {/* <p>Showing {totalCount} movies in the database.</p> */}
               <MoviesTable sortColumn={sortColumn} movies={movies} onDelete={this.handleDelete} onLike={this.handleLike} onSort={this.handleSort} />
               <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
            </div>
         </div>
      );
   }
}

export default Movies;
