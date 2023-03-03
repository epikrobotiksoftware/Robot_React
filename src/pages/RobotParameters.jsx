import Header from "../components/consociateComponents/Header";
import SideBar from "../components/consociateComponents/SideBar";
import ParamScreen from "../components/robotParametersComponents/ParamScreen";
import { useSideBarContext } from "../contexts/SideBarMenuContext";
import robotPar from "./robotParametersCss.module.css";

const RobotParameters = () => {
  const { isOpen } = useSideBarContext();

  return (
    <>
      <Header />
      <SideBar />
      <div style={{ height: "100vh"}}>
        <div
          className={
            isOpen ? robotPar["robotParamOpen"] : robotPar["robotParamClose"]
          }
        >
          <div className={robotPar["paramScreen"]}>
            <ParamScreen />
          </div>
        </div>
      </div>
    </>
  );
};

export default RobotParameters;
