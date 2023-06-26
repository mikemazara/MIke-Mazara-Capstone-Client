import Home from "../components/home/Home";

const HomePage = ({
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
  return (
    <div>
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
    </div>
  );
};

export default HomePage;
