import axios from 'axios';
import React from 'react';

import { connect } from 'react-redux';

import './AddName.scss';

const AddName = (props) => {
  const handleChange = (e) => {
    props.handleName(e.target.value.trim())
  }

  const handleClick = (e) => {
    e.preventDefault();
    axios.post(`/friends/addfriend/${props.auth.user.id}/${props.name}`)
      .then(res => console.log(res))
      .catch(err => console.log(err))
    //LOGIC TO ADD NAME GOES HERE WHEN DB IS SETUP
  }

  return (
    <form className="homepage__names__add__search">
      <input onChange={handleChange} type="Search" placeholder="Enter Name" />
      <button onClick={handleClick}>ADD NAME</button>
    </form> 
  )
}

const mapStateToProps = state => ({
  auth: state.auth,
  name: state.friends.name
})

export default connect(mapStateToProps)(AddName);