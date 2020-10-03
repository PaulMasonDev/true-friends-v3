import React from 'react'

import './OccasionDisplay.scss';
const OccasionDisplay = ({displayData, displayOccasion, handleClick}) => {
  const handleItemClick = (e) => {
    const item = e.target.getAttribute('data-item');
    handleClick(displayData.name, displayOccasion, item);
  }
  return (
    <div className="homepage__info__occasionInfo">
      <h2>{displayOccasion.occasion}</h2>
      <h3>{displayOccasion.date}</h3>
        <ul>
        {
          displayOccasion.items ? displayOccasion.items.map(item => {
            return <li onClick={handleItemClick} data-item={item}>{item}</li>;
          }) : ''
        }
        </ul>
        
    </div>
  );
}

export default OccasionDisplay;