import Diagnostics from "../components/diagnostics/Diagnostics";
import "../components/diagnostics/Diagnostics.scss";

const DiagnosticsPage = ({ selectedModel, selectedMake, selectedYear }) => {
  return (
    <div className="diag">
      <Diagnostics
        selectedModel={selectedModel}
        selectedMake={selectedMake}
        selectedYear={selectedYear}
      />
    </div>
  );
};

export default DiagnosticsPage;
