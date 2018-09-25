import React, { Component } from 'react';
const Checkbox = ({ name, children, value, onChange, error }) => {
   return (
      <React.Fragment>
         <div className="form-group form-check">
            <input type="checkbox" onChange={onChange} checked={value ? 'checked' : ''} value={value} className="form-check-input" name={name} id={name} />
            <label className="form-check-label" htmlFor={name}>{children}</label>
         </div>
         {error && <div className="alert alert-danger">{error}</div>}
      </React.Fragment>
   );
}

export default Checkbox;