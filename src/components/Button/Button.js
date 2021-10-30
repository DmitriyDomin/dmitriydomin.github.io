import React from 'react';
import './Button.scss'

const Browse = props => {
  return (
    <div className='Button'>
      { props.children }
    </div>
  );
}

export default Browse;
