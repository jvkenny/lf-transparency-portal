import { Routes, Route } from "react-router-dom";
import Parcels from "../pages/maps/Parcels";
import Zoning from "../pages/maps/Zoning";
import ConstructionDetours from "../pages/maps/ConstructionDetours";
import SnowSweeping from "../pages/maps/SnowSweeping";
import TreeCanopy from "../pages/maps/TreeCanopy";
import ParksTrails from "../pages/maps/ParksTrails";

export default function MapsPage() {
  return (
    <Routes>
      <Route
        index
        element={
          <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Maps</h1>
            <p>Map pages coming soon.</p>
          </div>
        }
      />
      <Route path="parcels" element={<Parcels />} />
      <Route path="zoning" element={<Zoning />} />
      <Route path="construction" element={<ConstructionDetours />} />
      <Route path="snow" element={<SnowSweeping />} />
      <Route path="trees" element={<TreeCanopy />} />
      <Route path="parks" element={<ParksTrails />} />
    </Routes>
  );
}
