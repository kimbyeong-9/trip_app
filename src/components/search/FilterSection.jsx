import React from 'react';

const FilterSection = ({ title, children }) => {
  return (
    <div className="filter-section">
      <h4>{title}</h4>
      {children}
    </div>
  );
};

export default FilterSection;
