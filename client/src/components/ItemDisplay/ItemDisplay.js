import React from "react";
import { connect } from "react-redux";
import "./ItemDisplay.scss";

const ItemDisplay = ({ items }) => {
  const amazonUrl = "https://www.amazon.com/s?k=";
  const amazon = items.itemName ? `Find ${items.itemName} on Amazon.com` : "";

  const walmartUrl = "https://www.walmart.com/search/?query=";
  const walmart = items.itemName ? `Find ${items.itemName} on Walmart.com` : "";

  const targetUrl = "https://www.target.com/s?searchTerm=";
  const target = items.itemName ? `Find ${items.itemName} on Target.com` : "";

  return (
    <div className="homepage__info__item">
      {items.itemName ? (
        <div>
          <h2>{items.itemName}</h2>
          <p>
            <a
              href={`${amazonUrl}${items.itemName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {amazon}
            </a>
          </p>
          <p>
            <a
              href={`${walmartUrl}${items.itemName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {walmart}
            </a>
          </p>
          <p>
            <a
              href={`${targetUrl}${items.itemName}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {target}
            </a>
          </p>
        </div>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  items: state.items,
});
export default connect(mapStateToProps)(ItemDisplay);
