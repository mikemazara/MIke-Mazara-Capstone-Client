import Home from "../components/home/Home";
import "../components/home/Home.scss";

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
    <div className="home">
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
