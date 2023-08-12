import React from 'react';

const Result = ({ dose }) => {
  return (
    <div>
      <h3>Calculated Dose:</h3>
      <p>{dose} mg</p>
    </div>
  );
};

export default Result;
