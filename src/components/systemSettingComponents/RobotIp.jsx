import React, {  useState } from "react";
import "../../components/systemSettingComponents/SystemSetting.css";
import CreatePositionRobotIp from "./CreatePositionRobotIp";
import { PositionContext } from "../../contexts/PositionContext";
function RobotIP(props) {
  const [isOverlayShown, setisoverlayShown] = useState(false);
  const [RobotIP, setRobotIP] = useState(0);
  const onEdit = (record) => {
    setisoverlayShown(true);
  };

  const data = {
    RobotIP,
    setRobotIP,
    setisoverlayShown,
  };
  return (
    <PositionContext.Provider value={data}>
      <div className="App">
        <header className="App-header">
          <button className="butonrobotip" onClick={onEdit}>Robot IP</button>
          {isOverlayShown && <CreatePositionRobotIp></CreatePositionRobotIp>}
        </header>
      </div>
    </PositionContext.Provider>
  );
}

export default RobotIP;
