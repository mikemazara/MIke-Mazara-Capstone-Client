import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as React from "react";
import { BootstrapInput } from "../functions/StyleSelect";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
    <div className="home__card">
      <h1 className="home__title">
        Welcome to Poke-Mechs! The Pocket Mechanic App
      </h1>
      <div className="home__select-options">
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="home-simple-select-label">Year</InputLabel>
            <Select
              labelId="home-simple-select-label"
              id="home-simple-select"
              value={selectedYear}
              label="Year"
              onChange={handleYearChange}
              input={<BootstrapInput />}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="home-simple-select-label">Make</InputLabel>
            <Select
              labelId="home-simple-select-label"
              id="home-simple-select"
              value={selectedMake}
              label="Make"
              onChange={handleMakeChange}
              input={<BootstrapInput />}
            >
              {makes.map((make) => (
                <MenuItem key={make} value={make}>
                  {make}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 110 }} className="">
          <FormControl fullWidth>
            <InputLabel id="home-simple-select-label">Model</InputLabel>
            <Select
              labelId="home-simple-select-label"
              id="home-simple-select"
              value={selectedModel}
              label="Model"
              onChange={handleModelChange}
              input={<BootstrapInput />}
            >
              {model.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
      {selectedMake && selectedModel && selectedYear ? (
        <Link to="/diagnostics" className="home__link">
          Diagnostics
        </Link>
      ) : (
        <div className="home__link-disabled">
          Please Select a Make, Model, and Year
        </div>
      )}
    </div>
  );
};

export default Home;
