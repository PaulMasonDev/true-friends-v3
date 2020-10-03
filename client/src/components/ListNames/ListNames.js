import React from 'react'

import './ListNames.scss';

const ListNames = (props) => {
  const filteredFriends = props.userData.friends.filter(friend => 
    friend.name.toLowerCase().includes(props.searchName.toLowerCase())
    );
  
  const handleClick = (e) => {
    const name = e.target.getAttribute('data-name');
    props.handleClick(name);
  } 

  return (
    <div className="homepage__names__list">
      <ul>
        {filteredFriends.map(friend => {
          return (
          <li 
            key={friend.id}
            data-name={friend.name} 
            onClick={handleClick}
            >
            {friend.name}
          </li>
          );
        })}
      </ul>
      
    </div>
  );
}

export default ListNames;