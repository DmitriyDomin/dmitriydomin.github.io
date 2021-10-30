import React, {useState} from 'react';
import './Search.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/fontawesome-free-solid'
import { useHistory } from "react-router-dom";

const MainPath = '/';

const Search = (props) => {

  const history = useHistory();

  const [inputClasses, setClasses] = useState(['Input-container']);
  const [isDirty, setDirty] = useState(false);
  const [searchValue, setValue] = useState('');

  const onKeyPress = (e) => {
    if (e.key === 'Enter') {
     searchForMovie();
    }
  }

  const searchForMovie = (value = searchValue) => {
    if (history.location.pathname === MainPath) {
      history.push(`/browse?movieName=${value}`);
    } else {
      history.push(`?movieName=${value}`);
    }
  }

  const setActive = () => {
    setClasses([...inputClasses, 'Active']);
  }

  const setInactive = (e) => {
    inputClasses.filter(className => className !== 'Active');
    setClasses(inputClasses.filter(className => className !== 'Active').slice());
  }

  const onChange = (e) => {
    setValue(e.target.value);
    setDirty(!!e.target.value);
  }

  const clearInput = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setValue('');
    setDirty(false);
    searchForMovie('');
  }

  const input = (
    <input
      onFocus={setActive}
      onBlur={setInactive}
      onChange={onChange}
      onKeyDown={onKeyPress}
      value={searchValue}
      type="text"
      className='Search-input'
      placeholder='Search for a movie...'
    />
  );

  const closeIcon = isDirty ? (
    <FontAwesomeIcon
      className='Icon'
      icon={faTimesCircle}
      onMouseDown={clearInput}
    />
    ) : null;
  return (
    <div className='Search-container'>
      <div className={ inputClasses.join(' ') }>
        { input }
        { closeIcon }
      </div>

    </div>
  );
}

export default Search;
