import React, { useState } from "react";

function PlantCard({ plant, removePlant }) {
  const [inStock, setInStock] = useState(true);
  const toggleInStock = (e) => {
    e.stopPropagation();
    setInStock(currentValue => !currentValue);
  }
  const handleDelete = () => {
    removePlant(plant.id);
  }
  return (
    <li className="card">
      <img src={plant.image} alt={plant.name} />
      <h4>{plant.name}</h4>
      <p>Price: {plant.price}</p>
      {inStock ? (
        <button onClick={toggleInStock} className="primary">In Stock</button>
      ) : (
        <button onClick={toggleInStock}>Out of Stock</button>
      )}
      <button className="delete" onClick={handleDelete}>Delete</button>
    </li>
  );
}

export default PlantCard;
