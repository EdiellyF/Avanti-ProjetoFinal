import React from 'react';

const ItemCard = ({ item }) => (
  <div className="item-card">
    <img
      src={item.image || '/placeholder.png'}
      alt={item.name}
      className="item-card-img"
    />
    <div className="item-card-body">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  </div>
);

export default ItemCard;