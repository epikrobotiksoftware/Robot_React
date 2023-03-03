import "./headerCss.css";
import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
import { Navbar, Nav } from "react-bootstrap";
import * as ROSLIB from "roslib";
import { GiTablet } from "react-icons/gi";
import { BsJoystick } from "react-icons/bs";
import { BiJoystickButton } from "react-icons/bi";
import { GiStopSign } from "react-icons/gi";
import { VscRunAll } from "react-icons/vsc";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import { RiVoiceprintFill } from "react-icons/ri";
import ManualJoystick from "./ManualJoystick";
import { RosContext } from "../../contexts/RosContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import soundFile from "../../assets/voice.mp3";
import { KoorTablesContext } from "../../contexts/GetTableDataContext";
import { MapStatusContext } from "../../contexts/MapStatusContext";

const Header = () => {
  const audio = new Audio(soundFile);

  const { goal } = useContext(KoorTablesContext);
  const { map_status, mappingOrGoal } = useContext(MapStatusContext);
  const { ros, connect } = useContext(RosContext);
  const [showJoystick, setshowJoystick] = useState(false);
  const [icon, setIcon] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState([]);
  const [emergency, setEmergency] = useState(false);
  const navigate = useNavigate();
  const [controls, setControls] = useState(false);
  const handleVoice = () => {
    audio.play();
  };
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const emergency_stop = process.env.REACT_APP_EMERGENCY_PARAM;

  function getBatteryLevel() {
    let intervalID = setInterval(() => {
      axios
        .get(hostName + "/api/v1/ros/battery")
        .then((res) => {
          // setBatteryLevel(res.data);
          console.log(batteryLevel);
          if (res.data.Battery === 100) {
            setIcon(B100);
          } else if (res.data.Battery > 80) {
            setIcon(Bch);
          } else if (res.data.Battery > 75) {
            setIcon(B75);
          } else if (res.data.Battery > 50) {
            setIcon(B50);
          } else if (res.data.Battery > 25) {
            setIcon(B25);
          } else {
            setIcon(B0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }, 20000);
  }
  useEffect(() => {
    getBatteryLevel();
  }, []);

  function changeEmergency() {
    var param = new ROSLIB.Param({
      ros: ros,
      name: emergency_stop,
    });
    setEmergency(!emergency);
    param.set(!emergency);
  }
  console.log(emergency);
  return (
    <div className="headercontainer">
      <Navbar
        ros={ros}
        style={{ height: "55px" }}
        bg="dark"
        // expand="sm"
        collapseOnSelect
        variant="dark"
      >
        <Navbar.Brand href="/homepage" id="epik">
          EPIK ROBOTIK &copy;
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="ms-auto" style={{ height: "50px" }}>
            <Button className="voice">
              <RiVoiceprintFill
                onClick={() => {
                  handleVoice();
                }}
                id="joystickicon"
                size={40}
                color="#2c7caa"
              />
            </Button>
            <Button id="outtable">
              <div role="button" id="tabletmode">
                <GiTablet
                  color="black"
                  size={35}
                  onClick={() => {
                    navigate("/ondevice");
                  }}
                />
              </div>
            </Button>
            <Button id="onlyjoystick">
              <BiJoystickButton
                onClick={() => {
                  navigate("/onlyjoystick");
                }}
                id="joystickicon"
                size={40}
                color="#2c7caa"
              />
            </Button>

            <Button id="joystick">
              <BsJoystick
                onClick={() => {
                  setshowJoystick(!showJoystick);
                }}
                id="joystickicon"
                size={40}
                color="#2c7caa"
              />

              {showJoystick && (
                <div className="konusma-balonu">
                  <ManualJoystick />{" "}
                </div>
              )}
            </Button>
            {!emergency && (
              <Button
                id="stopOut"
                onClick={() => {
                  // console.log("first");
                  changeEmergency();
                }}
              >
                <div id="stop">
                  <GiStopSign size={33} />
                </div>
              </Button>
            )}
            {emergency && (
              <Button
                id="playOut"
                onClick={() => {
                  // console.log("first");
                  changeEmergency();
                }}
              >
                <div role="button" id="play">
                  <VscRunAll size={33} />
                </div>
              </Button>
            )}

            <div id="robot_connect">
              <Button
                className="rounded-pill"
                disabled
                variant={connect ? "success" : "danger"}
                id="robot_connect_button"
                color="white"
              >
                {connect ? "Robot Connected" : "Robot Disconnected"}
              </Button>
            </div>
            {mappingOrGoal & (map_status !== "mapStoped") ? (
              <button id="misson_mapping" disabled>
                {map_status}
              </button>
            ) : (
              <button id="misson_goal" disabled>
                {goal
                  ? goal.Destination + "'e gidiyor..."
                  : "Robot Görev Bekliyor"}
              </button>
            )}

            <h5 style={{ fontSize: "30px " }} id="batterylevel">
              {icon}
            </h5>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
