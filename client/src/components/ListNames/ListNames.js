import React from 'react'
import { connect } from 'react-redux';
import './ListNames.scss';

const ListNames = ({friends, name, ...otherProps}) => {
  const filteredFriends = friends.filter(friend => 
    friend.toLowerCase().includes(name.toLowerCase())
    );
  
  const handleClick = (e) => {
    const name = e.target.getAttribute('data-name');
    otherProps.handleClick(name);
  } 

  return (
    <div className="homepage__names__list">
      <ul>
        {filteredFriends.map(friend => {
          return (
          <li 
            key={friend._id}
            data-name={friend} 
            onClick={handleClick}
            >
            {friend}
          </li>
          );
        })}
      </ul>
      
    </div>
  );
}

const mapStateToProps = state => ({
  name: state.friends.name,
  friends: state.friends.friends
})
export default connect(mapStateToProps)(ListNames);