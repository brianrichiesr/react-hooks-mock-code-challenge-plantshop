import React, { useState } from "react";

function NewPlantForm({ addPlantToList }) {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: 0
  })
  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({
      ...formData,
      [key]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let bool = true;
    for (let item in formData) {
      if (!formData[item]) {
        bool = false;
      }
    }
    if (bool) {
      addPlantToList(formData);
      e.target.reset()
    } else {
      return alert("Please fill out form correctly");
    }
  }
  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} type="text" name="name" placeholder="Plant name" />
        <input onChange={handleChange} type="text" name="image" placeholder="Image URL" />
        <input onChange={handleChange} type="number" name="price" step="0.01" placeholder="Price" />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
