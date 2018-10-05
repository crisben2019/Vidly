import React, { Component } from 'react';
import _ from 'lodash';
import auth from '../../services/authService';

export default class TableBody extends Component {

   renderCell = (item, column) => {
      if (column.content !== undefined) {
         return column.content(item);
      } else {
         return _.get(item, column.path);
      }
   }

   createKey = (item, column) => {
      if(!column){
         return item._id;
      }else{
         return item._id + (column.path || column.key);
      }
   }

   render() {
      const { data, columns } = this.props;
      return (
         <tbody>{data.map(item =>
            <tr key={this.createKey(item)}>{columns.map(column =>
               ((!column.login && !column.admin) 
                  || (column.login && auth.getCurrentUser()) 
                  || (column.admin && auth.getCurrentUser() && auth.getCurrentUser().isAdmin)) 
               && <td key={this.createKey(item, column)}>{this.renderCell(item, column)}</td>
            )}</tr>
         )}
         </tbody>
      );
   }
}