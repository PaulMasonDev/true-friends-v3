import React from 'react'

import './InfoDisplay.scss';

const InfoDisplay = ({displayData: {name, occasions}, handleClick}) => {
  const handleOccasionClick = (e) => {
    handleClick(name, e.target.getAttribute('data-occasion'));
  }
  return (
    <div className="homepage__info__display">
      <h2>{name}</h2>
        <ul>
          {occasions ? occasions.map(occasion => {
            return <li 
              key={occasion.id}
              onClick={handleOccasionClick}
              data-occasion={occasion.occasion}
              >
                {occasion.occasion}</li>
            }) : ""
          }
        </ul>
          
      <div className="homepage__info__addOccasion">

      </div>
      <div className="homepage__info__addDate">

      </div>
      <div className="homepage__info__addButton">

      </div>
    </div>
  );
}

export default InfoDisplay;