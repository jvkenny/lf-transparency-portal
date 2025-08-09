import { BrowserRouter, Routes, Route } from "react-router-dom";
import TransparencyPortal from "./components/TransparencyPortal";
import Parcels from "./pages/maps/Parcels";
import Zoning from "./pages/maps/Zoning";
import ConstructionDetours from "./pages/maps/ConstructionDetours";
import SnowSweeping from "./pages/maps/SnowSweeping";
import TreeCanopy from "./pages/maps/TreeCanopy";
import ParksTrails from "./pages/maps/ParksTrails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TransparencyPortal />} />
        <Route path="/maps/parcels" element={<Parcels />} />
        <Route path="/maps/zoning" element={<Zoning />} />
        <Route path="/maps/construction-detours" element={<ConstructionDetours />} />
        <Route path="/maps/snow-sweeping" element={<SnowSweeping />} />
        <Route path="/maps/tree-canopy" element={<TreeCanopy />} />
        <Route path="/maps/parks-trails" element={<ParksTrails />} />
      </Routes>
    </BrowserRouter>
  );
}
