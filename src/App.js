import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import Footer from "./components/footer/Footer";
import HomePage from "./pages/HomePage";
import DiagnosticsPage from "./pages/DiagnosticsPage";
import ContactPage from "./pages/ContactPage";
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
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
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
              <DiagnosticsPage
                selectedModel={selectedModel}
                selectedMake={selectedMake}
                selectedYear={selectedYear}
              />
            }
          />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
