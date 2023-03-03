import RobotAnimated from "./robot-animated";
import React, { useState, useEffect } from "react";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import { FaBackward } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";
import "./mainCss.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Robot = () => {
  const [batteryLevel, setBatteryLevel] = useState([]);
  const [icon, setIcon] = useState(null);
  const navigate = useNavigate();
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  function getBatteryLevel() {
    if (batteryLevel.Battery === 100) {
      setIcon(B100);
    } else if (batteryLevel.Battery > 80) {
      setIcon(Bch);
    } else if (batteryLevel.Battery > 75) {
      setIcon(B75);
    } else if (batteryLevel.Battery > 50) {
      setIcon(B50);
    } else if (batteryLevel.Battery > 25) {
      setIcon(B25);
    } else {
      setIcon(B0);
    }

    let intervalID = setInterval(() => {
      axios
        .get(hostName+"/api/v1/ros/battery")
        .then((res) => {
          setBatteryLevel(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 20000);
  }

  useEffect(() => {
    getBatteryLevel();
  }, []);

  return (
    <Navbar
      id="navbar"
      bg="dark"
      expand="lg"
      collapseOnSelect
      variant="dark"
      style={{ height: "70px" }}
    >
      <Navbar.Brand href="/" id="robot">
        <RobotAnimated />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse>
        <Nav id="epik_text"> EPIK ROBOTIK &copy;</Nav>
        <Nav className="ms-auto" id="batteryicon">
          {batteryLevel.Battery}
        </Nav>
        <Nav id="battery"> {icon}</Nav>
        <Nav
          className="goBack"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaBackward className="FaBackward" />
          Go Back
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Robot;
