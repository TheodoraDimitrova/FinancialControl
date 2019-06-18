import React from 'react';
import spinner from './272.gif';

const Loader = () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading"
        style={{
          width: '50px',
          margin: 'auto',
          display: 'block'
        }}
      />
    </div>
  );
};
export default Loader;
