import React from "react";
import PlantCard from "./PlantCard";

function PlantList({ plants, removePlant }) {
  return (
    <ul className="cards">{
      plants.map(plant => {
        return <PlantCard key={`plant-${plant.id}`} plant={plant} removePlant={removePlant} />
      })  
    }</ul>
  );
}

export default PlantList;
