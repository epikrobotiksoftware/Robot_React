import { BrowserRouter, Route, Routes } from "react-router-dom";
import PositionMarker from "./pages/PositionMarker";
import RobotParameters from "./pages/RobotParameters";
import HomePage from "./pages/HomePage";
import UsersHome from "./pages/UsersHome";
// import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/Updatepassword";
import SettingMainScreen from "./pages/SettingMainScreen";
import SystemSetting from "./components/systemSettingComponents/SystemSetting";
import "./bootstrap/bootstrapstyling/yeti.css";
import OnDevice from "./pages/OnDevice";
import OnlyJoystick from "./pages/OnlyJoystick";
import SideBarProvider from "./contexts/SideBarMenuContext";
import RosContextProvider from "./contexts/RosContext";
import GetTablesContextProvider from "./contexts/GetTableDataContext";
import MappingScreen from "./pages/MappingScreen";
import MapStatusContextProvider from "./contexts/MapStatusContext";
import EditMap from "./pages/EditMap";

function App() {
  return (
    <div>
      <MapStatusContextProvider>
        <GetTablesContextProvider>
          <RosContextProvider>
            <SideBarProvider>
              <BrowserRouter>
                <Routes>
                  {/* <Route path="/" element={<Login />} /> */}
                  <Route path="/resetpassword" element={<ResetPassword />} />
                  <Route path="/updatepassword" element={<UpdatePassword />} />
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/setup/positionmarker"
                    element={<PositionMarker />}
                  />
                  <Route
                    path="/setup/robotparameters"
                    element={<RobotParameters />}
                    exact
                  />
                  <Route
                    path="/setup/mappingscreen"
                    element={<MappingScreen />}
                  />
                  <Route path="/setup/editmap" element={<EditMap/>}/>
                  <Route path="/setup/usershome" element={<UsersHome />} />
                  <Route
                    path="/settingmainscreen"
                    element={<SettingMainScreen />}
                  />
                  <Route path="/systemsetting" element={<SystemSetting />} />
                  <Route path="/ondevice" element={<OnDevice />} />
                  <Route path="/onlyjoystick" element={<OnlyJoystick />} />
                  <Route path="*" element={<> not found</>} />
                  {/* <Route path="/Joystick" element={<ManualJoystick />} /> */}
                  {/* <Route path="/logout" element={<Logout />} />  */}
                  {/* <Route path="Dashboards/DefaultDashboard" element={<Home />} /> */}
                  {/* <Route path="/SideBar" element={<SideBar />} /> */}
                </Routes>
              </BrowserRouter>
            </SideBarProvider>
          </RosContextProvider>
        </GetTablesContextProvider>
      </MapStatusContextProvider>
    </div>
  );
}

export default App;
