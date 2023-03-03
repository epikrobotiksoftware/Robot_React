import "./robotStateCss.css";
import { Row, Col, Container } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import getYawFromQuat from "../../scripts/getY";
import * as ROSLIB from "roslib";
import { RosContext } from "../../contexts/RosContext";

const RobotState = () => {
  const { ros } = useContext(RosContext);
  const [x, setx] = useState(0);
  const [y, sety] = useState(0);
  const [orientation, setorientation] = useState(0);
  const [linear_velocity, setlinear_velocity] = useState(0);
  const [angular_velocity, setangular_velocity] = useState(0);
  const odom_topic = process.env.REACT_APP_ODOM_TOPIC;
  const robotPose = process.env.REACT_APP_ROBOT_POSE_PARAM;
  
  useEffect(() => {
    var pose_sub = new ROSLIB.Topic({
      ros: ros,
      name: robotPose,
      messageType: "geometry_msgs/Pose",
    });
    pose_sub.subscribe((message) => {
      setx(message.position.x.toFixed(2));
      sety(message.position.y.toFixed(2));
      setorientation(getYawFromQuat(message.orientation).toFixed(2));
    });

    var twist_sub = new ROSLIB.Topic({
      ros: ros,
      name: odom_topic,
      messageType: "nav_msgs/Odometry",
    });

    twist_sub.subscribe((message) => {
      setlinear_velocity(message.twist.twist.linear.x.toFixed(2));
      setangular_velocity(message.twist.twist.angular.z.toFixed(2));
    });
  }, [ros]);

  return (
    <Container>
      <Row>
        <Col>
          <h4 className="mt-4 border-bottom border-dark">Position</h4>
          <p className="mt-0">x: {x}</p>
          <p className="mt-0">y: {y}</p>
          <p className="mt-0">Orientation: {orientation}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <h4 className="mt-4 border-bottom border-dark">Velocity</h4>
          <p className="mt-0">Linear Velocity: {linear_velocity}</p>
          <p className="mt-0">Angular Velocity: {angular_velocity}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default RobotState;
