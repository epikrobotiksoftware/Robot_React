// import * as ROSLIB from "roslib";
import React, { useState, useEffect, useContext } from "react";
import { GiBattery100 as B100 } from "react-icons/gi";
import { GiBattery75 as B75 } from "react-icons/gi";
import { GiBattery50 as B50 } from "react-icons/gi";
import { GiBattery25 as B25 } from "react-icons/gi";
import { GiBatteryPack as Bch } from "react-icons/gi";
import { GiBattery0 as B0 } from "react-icons/gi";
import { Container, Row, Col } from "react-bootstrap";
// import { RosContext } from "../../contexts/RosContext";
import robotCss from "./robotCss.module.css";
import axios from "axios";

const Robot = () => {
  // const { ros } = useContext(RosContext);
  const [icon, setIcon] = useState(null);
  const [data, setData] = useState([]);
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  // console.log(data.battery_percentege);
  function getRobotState() {
    let intervalID = setInterval(() => {
      axios
        .get(hostName + "/api/v1/ros/robotStatus")
        .then((res) => {
          setData(res.data.data);
          console.log(res.data.data);
          // console.log(data.battery_percentege);
        })
        .catch((err) => {
          console.log(err);
        });

      if (data.battery_percentege === 100) {
        setIcon(B100);
      } else if (data.battery_percentege > 80) {
        setIcon(Bch);
      } else if (data.battery_percentege > 75) {
        setIcon(B75);
      } else if (data.battery_percentege > 50) {
        setIcon(B50);
      } else if (data.battery_percentege > 25) {
        setIcon(B25);
      } else {
        setIcon(B0);
      }
    }, 10000);
  }
  useEffect(() => {
    getRobotState();
  }, []);
  return (
    <Container>
      <div className={robotCss["robotBattery"]}>
        <span className={robotCss["robotStatue"]}>Robot Statue</span>
        <div className={robotCss["batteryAndicon"]}>
          <span className={robotCss["battery"]}>
            {data.battery_percentege?.toFixed(0)}
          </span>
          <span className={robotCss["batteryIcon"]}>{icon}</span>
        </div>
      </div>

      <div>
        <br />
      </div>
      <Row>
        <Col>
          <h5> Model </h5>
        </Col>
        <Col>
          <h5>{data.robot_model_name}</h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>Serial Number</h5>
        </Col>
        <Col>
          <h5>{data.robot_serial_number}</h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>Battery Remaining Distance </h5>
        </Col>
        <Col>
          <h5>{data.battery_remaining_distance} [KM] </h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>Battery Remaining Time </h5>
        </Col>
        <Col>
          <h5>{data.battery_remaining_time} % </h5>
        </Col>
      </Row>

      <Row>
        <Col>
          <h5>UpTime </h5>
        </Col>
        <Col>
          <h5>{data.uptime} % </h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <h5>Traveled Distance </h5>
        </Col>
        <Col>
          <h5>{data.distance_traveled} [KM] </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Robot;
