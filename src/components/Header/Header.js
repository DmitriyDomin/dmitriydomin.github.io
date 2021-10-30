import React from 'react';

import logo from '../../assets/images/logo.svg'
import { NavLink } from "react-router-dom";
import './Header.scss'

import Search from "./Search/Search";
import Avatar from "./Avatar/Avatar";

const Header = () => {
  return (
    <div className='Header'>
      <div className='Logo'>
        <NavLink to='/'>
          <img src={logo} alt="logo" width='150' height='40'/>
        </NavLink>
      </div>
      <div className='Menu'>
        <ul className='MenuList'>
            <li className='MenuItem'><NavLink to='browse'>Browse</NavLink></li>
            <li className='MenuItem'><NavLink to='/mylist'>My list</NavLink></li>
            <li className='MenuItem'><NavLink to='/recent'>Recent</NavLink></li>
        </ul>
      </div>
      <div className="Search">
        <Search> </Search>
      </div>
      <div className="Avatar">
        <Avatar name='Borow'> </Avatar>
      </div>
    </div>
  );
}

export default Header;
