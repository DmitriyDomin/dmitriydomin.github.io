import React from 'react';
import {useSelector} from "react-redux";

const Recent = () => {

  const recent = useSelector(state => {
    return state.watchList.recent;
  });

  console.log(recent);

  return (
    <div>
      Recent
    </div>
  );
}

export default Recent;
