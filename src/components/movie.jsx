import React, { Component } from 'react';

export default class Movie extends Component {
   handleClick(id){
      this.props.history.push('/movies');
   }

   render() {
      const { id } = this.props.match.params;
      return (
         <React.Fragment>
            <h1>Movie: {id}</h1>
            <button className="btn btn-primary" onClick={() => { this.handleClick(id) }}>Save</button>
         </React.Fragment >
      );
   }
};