import React, { Component } from 'react';

const Input = ({ name, label, error, ...rest }) => {
   return (
      <div className="form-group">
         <label htmlFor={name}>{label}</label>
         <input {...rest}
            className="form-control"
            name={name}
            id={name}
            aria-describedby={name}
            placeholder={label}
         />
         {error && <div className="alert alert-danger">{error}</div>}
      </div>
   );
}

export default Input;