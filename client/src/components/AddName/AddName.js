import React from 'react';

import './AddName.scss';

const AddName = (props) => {
  const handleChange = (e) => {
    props.handleName(e.target.value.trim())
  }

  const handleClick = (e) => {
    e.preventDefault();
    //LOGIC TO ADD NAME GOES HERE WHEN DB IS SETUP
  }

  return (
    <form className="homepage__names__add__search">
      <input onChange={handleChange} type="Search" placeholder="Enter Name" />
      <button onClick={handleClick}>ADD NAME</button>
    </form> 
  )
}

export default AddName;