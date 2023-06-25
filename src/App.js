import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Diagnostics from "./components/diagnostics/Diagnostics";
import useSessionStorageState from "./components/functions/useSessioonStorageState";
import "./App.scss";

function App() {
  const [makes, setMake] = useState([]);
  const [selectedMake, setSelectedMake] = useSessionStorageState("make", "");
  const [selectedYear, setSelectedYear] = useSessionStorageState("year", "");
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useSessionStorageState("model", "");

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                makes={makes}
                setMake={setMake}
                selectedMake={selectedMake}
                setSelectedMake={setSelectedMake}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                model={model}
                setModel={setModel}
                selectedModel={selectedModel}
                setSelectedModel={setSelectedModel}
              />
            }
          />
          <Route
            path="/diagnostics"
            element={
              <Diagnostics
                selectedModel={selectedModel}
                selectedMake={selectedMake}
                selectedYear={selectedYear}
              />
            }
          />
          <Route path="/about" element={<h1>About</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
