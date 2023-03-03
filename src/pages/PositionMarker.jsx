import Header from "../components/consociateComponents/Header";
import SideBar from "../components/consociateComponents/SideBar";

import MapPositionMarker from "../components/positionmarkerComponents/MapPositionMarker";
import { useSideBarContext } from "../contexts/SideBarMenuContext";
import posMar from "./positionMarkerCss.module.css";
import ParamButtonPosition from "../components/positionmarkerComponents/ParamButtonPosition";
import TablesContextProvider from "../contexts/TablesContext";

const PositionMarker = () => {
  const { isOpen } = useSideBarContext();
  return (
    <>
      <Header />
      <SideBar />
      <div
        style={{ display: "flex", justifyContent: "center", height: "100vh" }}
      >
        <TablesContextProvider>
          <div
            className={isOpen ? posMar["posmarOpen"] : posMar["posmarClose"]}
          >
            <div className={posMar["paramScreenMP_2"]}>
              <ParamButtonPosition />
            </div>
            <div className={posMar["vra"]}></div>
            <div className={posMar["mapPosMar"]}>
              <MapPositionMarker />
            </div>
          </div>
        </TablesContextProvider>
      </div>
    </>
  );
};

export default PositionMarker;
