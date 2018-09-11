import React, { Component } from 'react';
import _ from 'lodash';

export default class TableBody extends Component {

   renderCell = (item, column)=>{
      if(column.content !== undefined){
         return column.content(item);
      }else{
         return _.get(item, column.path);
      }
   }

   render() {
      const { data, columns } = this.props;
      return (
         <tbody>{data.map(item => 
               <tr>{columns.map(column => 
                  <td>{this.renderCell(item, column)}</td>
               )}</tr>
            )}
         </tbody>
      );
   }
}