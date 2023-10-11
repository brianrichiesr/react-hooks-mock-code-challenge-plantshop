import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";
const Url = "http://localhost:6001/plants";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [unmodifiedPlantList, setUnmodifiedPlantList] = useState([])

  useEffect(() => {
    fetch(Url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      setPlants(data);
      setUnmodifiedPlantList(data);
    })
    .catch(err => alert(err))
  }, [])
  const addPlantToList = (plantObj) => {
    fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(plantObj)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw (response.statusText);
      }
    })
    .then(data => {
      setPlants([data, ...plants]);
      setUnmodifiedPlantList([data, ...unmodifiedPlantList]);
    })
    .catch(err => alert(err))
  }

  const searchForPlants = (plantStr) => {
    const newPlantList = [...unmodifiedPlantList].filter(plant => {
      return plant.name.toLowerCase().includes(plantStr.toLowerCase());
    })
    setPlants(newPlantList)
  }

  const removePlantFromLists = (collection, setter, id) => {
    const newList = collection.filter(plant => {
      return plant.id !== id;
    })

    setter(newList)
  }

  const removePlant = (id) => {
    fetch(`${Url}/${id}`, {
      method: "DELETE"
    })
    removePlantFromLists(plants, setPlants, id)
    removePlantFromLists(unmodifiedPlantList, setUnmodifiedPlantList, id)
  }

  return (
    <main>
      <NewPlantForm addPlantToList={addPlantToList} />
      <Search searchForPlants={searchForPlants} />
      <PlantList plants={plants} removePlant={removePlant} />
    </main>
  );
}

export default PlantPage;
