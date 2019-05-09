import React from 'react';

export default function Filter({ filter, onFilter }) {
  return (
    <div className="field">
      <p className="control has-icons-left">
        <input className="input" type="text" placeholder="Search" 
          onChange={(e) => onFilter(e.target.value)} />
        <span className="icon is-small is-left">
          <i className="fas fa-search"></i>
        </span>
      </p>
    </div>
  );
}
