import React from 'react'

import './ItemDisplay.scss';

const ItemDisplay = ({displayItem}) => {
  const amazonUrl = "https://www.amazon.com/s?k=";
  const amazon = displayItem ? `Find ${displayItem} on Amazon.com` : ''

  const walmartUrl = "https://www.walmart.com/search/?query=";
  const walmart = displayItem ? `Find ${displayItem} on Walmart.com` : ''

  const targetUrl = "https://www.target.com/s?searchTerm=";
  const target = displayItem ? `Find ${displayItem} on Target.com` : ''

  return (
    <div className="homepage__info__item">
      <h2>{displayItem}</h2>
      <p>
        <a 
          href={`${amazonUrl}${displayItem}`} 
          target="_blank"
          rel="noopener noreferrer"
          >{amazon}
        </a>
      </p>
      <p>
        <a 
          href={`${walmartUrl}${displayItem}`} 
          target="_blank"
          rel="noopener noreferrer"
          >{walmart}
        </a>
      </p>
      <p>
        <a 
          href={`${targetUrl}${displayItem}`} 
          target="_blank"
          rel="noopener noreferrer"
          >{target}
        </a>
      </p>
    </div>
  );
}

export default ItemDisplay;