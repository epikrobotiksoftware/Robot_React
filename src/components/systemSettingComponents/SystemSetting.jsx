import React from "react";
import RobotIP from "./RobotIp";
import SystemLanguage from "./SystemLanguage";
import ChangePassword from "./ChangePassword";
import Header from "../consociateComponents/Header";
import Sidebar from "../consociateComponents/SideBar";
import "./SystemSetting.css";

const SystemSetting = () => {
  return (
    <> 
    <Header/>
    <Sidebar/>
    <div className="container4">
      <div className="systemlanguage">
        <SystemLanguage />
      </div>
      <div className="robotip">
        <RobotIP />
      </div>
      <div >
        <ChangePassword />
      </div>
    </div>
    </>
  );
};

export default SystemSetting;
