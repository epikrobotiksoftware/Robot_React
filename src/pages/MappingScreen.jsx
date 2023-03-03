import React from "react";
import Header from "../components/consociateComponents/Header";
import SideBar from "../components/consociateComponents/SideBar";
import NavAndMapping from "../components/mappingScreenComponents/NavAndMapping";
import mapping from "./mappingScreenCss.module.css";
import { useSideBarContext } from "../contexts/SideBarMenuContext";
// import Mapping from "../components/mappingScreenComponents/Mapping";
// import ToolBar from "../components/mappingScreenComponents/ToolBar";

const MappingScreen = () => {
  const { isOpen } = useSideBarContext();
  return (
    <div>
      <Header />
      <SideBar />
      <div
        className={isOpen ? mapping["mappingOpen"] : mapping["mappingClose"]}
      >
        <NavAndMapping />
        {/* <ToolBar /> */}
        {/* <Mapping /> */}
       
      </div>
    </div>
  );
};

export default MappingScreen;
