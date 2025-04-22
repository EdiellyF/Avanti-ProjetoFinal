import React from 'react';

const ItemCard = ({ item }) => (
  <div className="item-card">
    <img
      src={item.foto || '/placeholder.png'}
      alt={item.name}
      className="item-card-img"
    />
    <div className="item-card-body">
      <h2>{item.nome}</h2>
      <p>{item.descricao}</p>
      <p>contato:{item.user.phone}</p>
    </div>
  </div>
);

export default ItemCard;