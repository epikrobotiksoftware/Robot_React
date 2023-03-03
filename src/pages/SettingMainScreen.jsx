import ButtonRow from "../components/settingMainComponents/ButtonRow";
import { BiHelpCircle } from "react-icons/bi";
import { Col, Row } from "react-bootstrap";
import { ImUsers, ImParagraphJustify } from "react-icons/im";
import { MdOutlineDashboardCustomize, MdSettingsSuggest } from "react-icons/md";
import { GiPositionMarker } from "react-icons/gi";
import SideBar from "../components/consociateComponents/SideBar";
import Header from "../components/consociateComponents/Header";
import "../components/settingMainComponents/SettingMainScreen.css";
import { useSideBarContext } from "../contexts/SideBarMenuContext";

const SettingMainScreen = () => {
  const { isOpen } = useSideBarContext();
  const buttons = [
    {
      title: "Default Dashoard",
      icon: <MdOutlineDashboardCustomize size={25} />,
      description: "Robot,param screen and map",
      navigate: "/Dashboard",
    },
    {
      title: "Position Marker",
      icon: <GiPositionMarker size={25} />,
      description: "Position Marker",
      navigate: "/Setup/PositionMarker",
    },
    {
      title: "Users",
      icon: <ImUsers size={25} />,
      description: "Users",
      navigate: "/Setup/Users",
    },
    {
      title: "Analytics",
      icon: <ImParagraphJustify size={25} />,
      description: "Robot Parameters",
      navigate: "/Setup/Analytics",
    },
    {
      title: "System Setting",
      icon: <MdSettingsSuggest size={25} />,
      description: "System Setting",
      navigate: "/systemsetting",
    },
  ];
  let button_rows = [];
  for (let i = 0; i < buttons.length; i++) {
    const item = buttons[i];
    button_rows.push(
      <Col className="buttons">
        <ButtonRow data={item}> </ButtonRow>
      </Col>
    );
  }
  return (
    <> 
    <Header/>
    <SideBar/>
    <div className={
            isOpen ? "settingOpen" : "settingClose"
          }>
    <div className="container5">
      <h1 className="SettingMainScreen">Setting Main Screen:</h1>
      <h3 className="h3">
        Watch and edit settings for the robot. {<BiHelpCircle size={30} />}
      </h3>
      <Row  className="buttons2">{button_rows}</Row>
    </div>
    </div>
    </>
  );
};

export default SettingMainScreen;
