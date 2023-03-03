import React, { useState, useEffect, useRef, useContext } from "react";
import { Button } from "react-bootstrap";
import { Row, Col, Container } from "react-bootstrap";
import * as ROSLIB from "roslib";
import { RosContext } from "../../contexts/RosContext";
import "./SpeedSet"
const NavUtility2 = () => {
    const { ros } = useContext(RosContext);
  const [stop, setstop] = useState(false);
  const normalBtn = useRef(false);
  const emercengyBtn = useRef(false);
  const div = useRef(false);
  const base_cancel=process.env.REACT_APP_BASE_CANCEL_TOPIC;
const emergency_stop = process.env.REACT_APP_EMERGENCY_PARAM;
const amcl_pose = process.env.REACT_APP_AMCL_POSE_PARAM;

  useEffect(() => {
    emercengyBtn.current.style.display = "inline";
    normalBtn.current.style.display = "none";
  }, []);

  function emergencyStop() {
    var emergencyStop = new ROSLIB.Param({
      ros: ros,
      name: emergency_stop,
    });
    emergencyStop.set(true);
    setstop(true);
    emercengyBtn.current.style.display = "none";
    normalBtn.current.style.display = "inline";
    div.current.style.backgroundColor = "blue";
    var msg = new ROSLIB.Message({});
    emercengyBtn.publish(msg);
  }

  function normalMode() {
    var emergencyStop = new ROSLIB.Param({
      ros: ros,
      name: emergency_stop,
    });
    emergencyStop.set(false);
    setstop(false);
    emercengyBtn.current.style.display = "inline";
    normalBtn.current.style.display = "none";
    div.current.style.backgroundColor = "white";
    var msg = new ROSLIB.Message({});
    emergencyStop.publish(msg);
  }

  function cancelGoal() {
    var cancelGoal = new ROSLIB.Topic({
      ros: ros,
      name: base_cancel,
      messageType: "actionlib_msgs/GoalID",
    });
    var msg = new ROSLIB.Message({});
    cancelGoal.publish(msg);
  }

  function saveAMCL() {
    var saveAMCLPose = new ROSLIB.Param({
      ros: ros,
      name: amcl_pose,
    });
    saveAMCLPose.set(true);
  }

  return (
    <div ref={div}>
      <Container>
        <Row>
          <Col>
            <Button
              className="NavUtility_buttons"
              ref={emercengyBtn}
              onClick={emergencyStop}
              variant="danger"
            >
              Emergency Stop
            </Button>
            <Button
              className="NavUtility_buttons"
              ref={normalBtn}
              onClick={normalMode}
              variant="success"
            >
              Normal Mode
            </Button>
          </Col>
          <Col>
            <Button
              className="NavUtility_buttons"
              onClick={cancelGoal}
              variant="info"
            >
              Cancel Goal
            </Button>
          </Col>
          <Col>
            <Button
              className="NavUtility_buttons"
              onClick={saveAMCL}
              variant="info"
            >
              Save Position for AMCL
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavUtility2;
