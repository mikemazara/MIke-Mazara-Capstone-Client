import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Header.scss";

function Header({
  makes,
  setMake,
  selectedMake,
  setSelectedMake,
  selectedYear,
  setSelectedYear,
  model,
  setModel,
  selectedModel,
  setSelectedModel,
}) {
  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/vehicles`)
      .then((res) => {
        setMake(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (selectedMake) {
      axios
        .get(`http://localhost:8080/vehicles/${selectedMake}`)
        .then((res) => {
          setModel(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [selectedMake]);

  if (!makes) {
    return <div>Loading...</div>;
  }

  return (
    <header className="header">
      <div className="header__logo">
        <h1>Poke-Mechs</h1>
      </div>
      <div className="header__search">
        <select className="header__search__year">
          <option value="">Select a Year</option>
          <option value="2021">2021</option>
        </select>
        <select
          className="header__search__make"
          value={selectedMake}
          onChange={handleMakeChange}
        >
          <option value="">Select a Make</option>
          {makes.map((make) => (
            <option key={make} value={make.id}>
              {make}
            </option>
          ))}
        </select>
        <select
          className="header__search__make"
          value={selectedModel}
          onChange={handleModelChange}
        >
          <option value="">Select a Model</option>
          {model.map((model) => (
            <option key={model} value={model.id}>
              {model}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
}

export default Header;
