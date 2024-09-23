import React from 'react';

const FallBackpage: React.FC = () => {
  return (
    <div className='fallback-container'>
      <h1 className='fallback-title'>Login Failed</h1>
      <p className='fallback-message'>You can't log in to the screen.</p>
      <a href="/login" className='fallback-link'>Try again</a>
    </div>
  );
};



export default FallBackpage;
