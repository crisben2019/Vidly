import React from 'react';
import _ from 'lodash';

const DropDownList = ({ name, label, error, data, ...rest }) => {
   return (
      <div className="form-group">
         <label htmlFor={name}>{label}</label>
         <select {...rest} className="form-control" name={name} id={name}>{data.data.map(d =>
            <option key={data.data.indexOf(d)} value={_.get(d, data.value)}>{_.get(d, data.label)}</option>
         )}</select>
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
}
export default DropDownList;