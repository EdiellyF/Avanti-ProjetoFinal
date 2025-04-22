import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => (
  <input
    className="search-bar"
    type="text"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

export default SearchBar;