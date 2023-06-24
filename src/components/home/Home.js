import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.scss";

const Home = ({
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
}) => {
  const handleMakeChange = (e) => {
    setSelectedMake(e.target.value);
  };

  const handleModelChange = (e) => {
    setSelectedModel(e.target.value);
  };

  const years = [];

  for (let i = 2023; i >= 1975; i--) {
    years.push(i);
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
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
    <div className="home">
      <h1 className="home__title">Welcome to the Poke-car repair centre</h1>
      <div className="home__select-options">
        <select
          className="home__select"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="">Select a Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          className="home__select"
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
          className="home__select"
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
      {selectedMake && selectedModel && selectedYear ? (
        <Link to="/diagnostics" className="home__link">
          Diagnostics
        </Link>
      ) : (
        <div className="home__link-disabled">
          Please Select a Make, Model, and Year to Continue
        </div>
      )}
    </div>
  );
};

export default Home;
