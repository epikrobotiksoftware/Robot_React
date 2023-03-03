import React, { useContext } from "react";
import "./manualJoyStickCss.css";
import { Joystick } from "react-joystick-component";
import { RosContext } from "../../contexts/RosContext";
import * as ROSLIB from "roslib";
import {
  BsFillArrowUpSquareFill,
  BsFillArrowDownSquareFill,
} from "react-icons/bs";
import { IoArrowRedoCircle, IoArrowUndoCircle } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

const ManualJoystick = () => {
  const { ros } = useContext(RosContext);
  // const navigate = useNavigate();
  const CmdVelTopic = process.env.REACT_APP_CMD_VEL_TOPIC;
  var joystick_x = 0;
  var joystick_y = 0;
  var interval;

  function publishCMD(speed_x, speed_y) {
    var cmd_vel = new ROSLIB.Topic({
      ros: ros,
      name: CmdVelTopic,
      messageType: "geometry_msgs/Twist",
    });
    var twist = new ROSLIB.Message({
      linear: {
        x: speed_y / 113,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: -speed_x / 113,
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
    //  console.log("Moving");
    joystick_x = event.x;
    joystick_y = event.y;
    // publishCMD(event.x, event.y);
  }
  function handleStop() {
    console.log("Stopped moving");
    joystick_x = 0;
    joystick_y = 0;
    console.log(joystick_x, joystick_y);
    publishCMD(0, 0);
    clearInterval(interval);
    for (var i = 0; i < 10000; i++) {
      window.clearInterval(i);
    }
  }

  return (
    <div className="z_joystick_container">
      <div className="container_up">
        <div>
          <IoArrowUndoCircle
            color="rgb(92, 2, 29)"
            id="left-circle"
            size={40}
            onClick={() => publishCMD(-10, 0)}
            icon={IoArrowUndoCircle}
          />
        </div>
        <div>
          <BsFillArrowUpSquareFill
            color="rgb(92, 2, 29)"
            size={30}
            icon={BsFillArrowUpSquareFill}
            onClick={() => publishCMD(0, 10)}
          />
        </div>
        <div>
          <IoArrowRedoCircle
            color="rgb(92, 2, 29)"
            id="right-circle"
            size={40}
            icon={IoArrowRedoCircle}
            onClick={() => publishCMD(10, 0)}
          />
        </div>
      </div>

      <div className="joystick_joystick">
        <div className="position_joystick_radius">
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
      </div>
      <div className="container_down">
        <div>
          <BsFillArrowDownSquareFill
            color="rgb(92, 2, 29)"
            size={30}
            onClick={() => publishCMD(0, -10)}
            icon={BsFillArrowDownSquareFill}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualJoystick;
