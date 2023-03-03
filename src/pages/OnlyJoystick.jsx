import React, { useContext, useEffect, useState } from "react";
import "./onlyJoystickCss.css";
import { Joystick } from "react-joystick-component";
import { RosContext } from "../contexts/RosContext";
import * as ROSLIB from "roslib";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import { IoArrowRedoCircle, IoArrowUndoCircle } from "react-icons/io5";
import { HiArrowsExpand } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import NavUtility2 from "../components/onlyJoystickComponents/NavUtility2";
import SpeedSet from "../components/onlyJoystickComponents/SpeedSet";
import RobotState from "../components/onlyJoystickComponents/RobotState";
import RosParamAndTopic from "../components/onlyJoystickComponents/RosParamAndTopic";
import Button from "react-bootstrap/Button";

const OnlyJoystick = () => {
  const { ros, connect } = useContext(RosContext);
  const navigate = useNavigate();
  const CmdVelTopic = process.env.REACT_APP_CMD_VEL_TOPIC;
  const [dividing, setDividing] = useState(
    JSON.parse(localStorage.getItem("dividing")) || 0.8
  );
  var joystick_x = 0;
  var joystick_y = 0;
  var interval;

  useEffect(() => {
    if (dividing > 1.2) {
      setDividing(1.2);
    } else if (dividing < 0.3) {
      setDividing(0.3);
    }
    localStorage.setItem("dividing", JSON.stringify(dividing));
  }, [dividing]);

  function publishCMD(speed_x, speed_y) {
    console.log(speed_x, speed_y);
    var cmd_vel = new ROSLIB.Topic({
      ros: ros,
      name: CmdVelTopic,
      messageType: "geometry_msgs/Twist",
    });
    var twist = new ROSLIB.Message({
      linear: {
        x: (speed_y * dividing) / 100,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: (-speed_x * dividing) / 100,
      },
    });
    cmd_vel.publish(twist);
  }
  function start_publish() {
    console.log(joystick_x, joystick_y);
    interval = setInterval(function () {
      console.log("publishing", joystick_x, joystick_y);
      if (joystick_x === 0 && joystick_y === 0) {
        clearInterval(interval);
        return;
      }
      publishCMD(joystick_x, joystick_y);
    }, 500);
  }

  function handleStart() {
    console.log("Started moving");
    start_publish();
  }

  function handleMove(event) {
    console.log("Moving");
    joystick_x = event.x;
    joystick_y = event.y;
  }
  function handleStop() {
    console.log("Stopped moving");
    joystick_x = 0;
    joystick_y = 0;
    clearInterval(interval);
    publishCMD(0, 0);
  }
  // document.getElementById("connect_out").onclick = null
  // console.log(dividing);
  return (
    <div className="OnlyJoystick_container">
      <RosParamAndTopic />
      <div className="OnlyJoystick">
        <div id="connect_out">
          <Button
            className="rounded-pill"
            disabled
            variant={connect ? "success" : "danger"}
            id="connect_in"
            color="white"
          >
            {connect ? "Robot Connected" : "Robot Disconnected"}
          </Button>
        </div>
        {/* <Button  id="connect_out">
          <Button
            
            id="connect_in"
            className="rounded-pill"
            variant={connect ? "success" : "danger"}
            disabled
          >
            {connect ? "Robot Connected" : "Robot Disconnected"}
          </Button>
        </Button> */}
        <div className="OnlyJoystick_joystickAndSpeed">
          <div className="joystick_radius">
            <Joystick
              size={200}
              sticky={false}
              baseColor="#000133"
              stickColor="blue"
              move={handleMove}
              start={handleStart}
              stop={handleStop}
              snapBackTime={1}
            />
          </div>
          <div className="speed_Set">
            <h5>Speed Setter</h5>
            <SpeedSet dividing={dividing} setDividing={setDividing} />
          </div>
        </div>

        <div className="click_container">
          <div className="click_container_up">
            <div>
              <IoArrowUndoCircle
                size={50}
                onClick={() => publishCMD(-10, 0)}
                icon={IoArrowUndoCircle}
              />
            </div>
            <div>
              <BsFillArrowUpSquareFill
                size={40}
                icon={BsFillArrowUpSquareFill}
                onClick={() => publishCMD(0, 10)}
              />
            </div>
            <div>
              <IoArrowRedoCircle
                size={50}
                icon={IoArrowRedoCircle}
                onClick={() => publishCMD(10, 0)}
              />
            </div>
          </div>
          <div className="click_container_middle">
            <div>
              <BsFillArrowLeftSquareFill
                size={40}
                onClick={() => publishCMD(-10, 0)}
                icon={BsFillArrowLeftSquareFill}
              />
            </div>
            <div>
              <HiArrowsExpand size={55} />
            </div>
            <div>
              <BsFillArrowRightSquareFill
                size={40}
                icon={BsFillArrowRightSquareFill}
                onClick={() => publishCMD(10, 0)}
              />
            </div>
          </div>
          <div className="click_container_down">
            <div>
              <BsFillArrowDownSquareFill
                size={40}
                onClick={() => publishCMD(0, -10)}
                icon={BsFillArrowDownSquareFill}
              />
            </div>
          </div>
        </div>
        <div className="OnlyJoystick_back_logout">
          <button
            className="button-back-log"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          <button className="button-back-log">Logout</button>
        </div>
        <div>
          <NavUtility2 />
        </div>
      </div>
      <div className="robotState_container">
        <RobotState />
      </div>
    </div>
  );
};

export default OnlyJoystick;
