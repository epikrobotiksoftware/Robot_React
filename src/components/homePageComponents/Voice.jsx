// import React, { useRef, useEffect, useState, useContext } from "react";
// import * as ROS2D from "ros2d";
// import * as ROSLIB from "roslib";
// import robot from "../../assets/robot.png";
// import table_image1 from "../../assets/table_image1.png";
// import getYawFromQuat from "../../scripts/getY";

// import { Row, Col, Button } from "react-bootstrap";
// import { RosContext } from "../../contexts/RosContext";
// import { PositionContext } from "../../contexts/PositionContext";

// import axios from "axios";
// import VoiceCreate from "./VoiceCreate";

// import soundFile from "../../assets/anons.mp3";
// const Voice = () => {
//   const { ros } = useContext(RosContext);

//  const audio = new Audio(soundFile);

//   var robot_image;
//   var viewer;
//   let koordinat = [];

//   const [follow, setFollow] = useState();
//   const [robot_position, setrobot_position] = useState({
//     x: 0,
//     y: 0,
//   });

//   const data = {
//     robot_position,
//   };
//   useEffect(() => {
//     getTable();
//     render_elments();
//   }, []);

//   const handleVoice = () => {
//     audio.play();
//   };

//   function render_elments() {
//     console.log("render elemnts");
//     var position = new ROSLIB.Topic({
//       ros: ros,
//       name: "/mir_robot1/robot_pose",
//       messageType: "geometry_msgs/Pose",
//     });
//     position.subscribe((message) => {
//       setrobot_position({
//         x: Number(message.position.x).toFixed(2),
//         y: Number(message.position.y).toFixed(2),
//       });
//       console.log(robot_position);
//     });
//   }

//   function getTable() {
//     axios
//       .get("http://127.0.0.1:5050/api/v1/ros/positionMarker")
//       .then((res) => {
//         setFollow(res.data.data.Position);
//         koordinat = res.data.data.Position;

//         console.log(koordinat);
//         console.log(follow);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//     render_elments();
//   }

//   // const info = { data };
//   console.log(follow);
//   console.log(data.robot_position.x);
//   console.log(data.robot_position.y);

// // const scaner= follow?.map((item)=>{
// //   return (
// //     (item.x.$numberDecimal == data.robot_position.x) &
// //     (item.y.$numberDecimal == data.robot_position.y)
// //   );
// // })

// // setInterval(scaner && handleVoice, 1000);

//   return (
//   <>
//       {follow?.map((item) => {
//         console.log(item);
//         return <p key={item._id}>{item._id}</p>;
//       })}
//       <div>denemeeeeeeeeee</div>
//       <VoiceCreate />
//  </>
//   );
// };
// export default Voice;
