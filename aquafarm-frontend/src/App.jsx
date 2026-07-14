import { Routes, Route } from "react-router-dom";
import AquaFarmHomepage from "./AquaFarmHomepage";
import SpeciesDetail from "./SpeciesDetail";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AquaFarmHomepage />} />
      <Route path="/species/:slug" element={<SpeciesDetail />} />
    </Routes>
  );
}

export default App;