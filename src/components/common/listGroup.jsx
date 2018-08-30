import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = (props) => {
   const { items, textProperty, valueProperty } = props;
   return (
      <ul className="list-group">
         {items.map(item=>
            <li key={item[valueProperty]} className="list-group-item">{item[textProperty]}</li>
         )}
      </ul>
   );
}

ListGroup.defaultProps = {
   textProperty: "name",
   valueProperty: "_id"
};

ListGroup.propTypes = {
   items: PropTypes.array.isRequired,
   textProperty: PropTypes.string,
   valueProperty: PropTypes.string
};



export default ListGroup;