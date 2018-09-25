import React, { Component } from 'react';

const SearchBox = ({onChange, value}) => {
   return (
      <input className="form-control mb-2" type="text" placeholder="Search..." name="search" onChange={e => { onChange(e.currentTarget.value) }} value={value} />
   );
}

export default SearchBox;