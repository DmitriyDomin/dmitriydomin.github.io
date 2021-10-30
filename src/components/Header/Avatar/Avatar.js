import React from 'react';
import avatar from '../../../assets/images/avatar.jpg'
import './Avatar.scss'

const Avatar = (props) => {
  return (
    <div className='Avatar-container'>
      <div className="Avatar-name">
        { props.name }
      </div>
        <img className='Avatar-image' src={avatar} alt="avatar" width='50' height='50'/>
    </div>
  );
}

export default Avatar;
