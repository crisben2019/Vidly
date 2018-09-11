import React, { Component } from 'react';
import Like from "./common/like";
import Table from './common/table';

export default class MoviesTable extends Component {
   columns = [
      { path: 'title', label: 'Title' },
      { path: 'genre.name', label: 'Genre' },
      { path: 'numberInStock', label: 'Stock' },
      { path: 'dailyRentalRate', label: 'Rate' },
      { key: 'like', content: movie => <Like liked={movie.liked} onClick={() => { this.props.onLike(movie) }} /> },
      { key: 'delete', content: movie => <button onClick={() => this.props.onDelete(movie)} className="btn btn-warning btn-sm">Delete</button> }
   ];

   raiseSort = path => {
      const sortColumn = { ...this.props.sortColumn };
      if (sortColumn.path === path) {
         sortColumn.order = (sortColumn.order === 'asc' ? 'desc' : 'asc');
      } else {
         sortColumn.path = path;
         sortColumn.order = 'asc';
      }

      this.props.onSort(sortColumn);
   }

   render() {
      const { movies, onSort, sortColumn } = this.props;
      return (
         <Table columns={this.columns} sortColumn={sortColumn} data={movies} onSort={onSort} />
      );
   }
}