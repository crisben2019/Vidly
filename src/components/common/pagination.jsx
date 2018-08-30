import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = (props) => {
   const { itemsCount, pageSize, currentPage, onPageChange } = props;

   const pagesCount = Math.ceil(itemsCount / pageSize);
   const pages = _.range(1, pagesCount + 1);
   if (pages <= 1) {
      return null;
   }
   return (
      <nav aria-label="...">
         <ul className="pagination">
            <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
               <a className="page-link" onClick={() => onPageChange(currentPage - 1)}>
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
               </a>
            </li>
            {pages.map(page =>
               <li key={page} className={currentPage === page ? 'page-item active' : 'page-item'}>
                  <a className="page-link" onClick={() => onPageChange(page)}>{page}</a>
               </li>
            )}
            <li className={currentPage === pagesCount ? 'page-item disabled' : 'page-item'}>
               <a className="page-link" onClick={() => onPageChange(currentPage + 1)}>
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Previous</span>
               </a>
            </li>
         </ul>
      </nav>
   );
}

Pagination.propTypes = {
   itemsCount: PropTypes.number.isRequired, 
   pageSize: PropTypes.number.isRequired,
   currentPage: PropTypes.number.isRequired, 
   onPageChange: PropTypes.func.isRequired
};

export default Pagination;
