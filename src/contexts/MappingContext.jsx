// import { createContext, useEffect, useRef, useState } from "react";
// import * as ROS2D from "ros2d";
// import * as ROSLIB from "roslib";
// import getYawFromQuat from "../scripts/getY";
// import robot from "../assets/robot.png";
// // 1
// export const MappingContext = createContext();

// // 2
// const MappingContextAppProvider = ({ children }) => {
//   const robotPose = process.env.REACT_APP_ROBOT_POSE_PARAM;
//   var ros;
//   ros = new ROSLIB.Ros();
//  const map = useRef(null);

//   var gridClient;
//   var robot_image;
//   var viewer;

//   function view_map() {
   
//     console.log(map);
//     //  if (map.current.innerHTML) return;

//     viewer = new ROS2D.Viewer({
//       divID: "map",
//       width: 1800,
//       height: 800,
//     });

//     gridClient = new ROS2D.OccupancyGridClient({
//       ros: ros,
//       rootObject: viewer.scene,
//       continuous: false,
//     });

//     console.log(viewer);
//     gridClient.on("change", () => {
//       console.log("map on change");
//       viewer.scaleToDimensions(
//         gridClient.currentGrid.width,
//         gridClient.currentGrid.height
//       );

//       try {
//         viewer.shift(
//           gridClient.currentGrid.pose.position.x,
//           gridClient.currentGrid.pose.position.y
//         );
//         render_elments();
//       } catch (error) {
//         console.log(error);
//       }
//     });
//   }

//   function render_elments() {
//     robot_image = new ROS2D.NavigationImage({
//       size: 1,
//       image: robot,
//       pulse: false,
//       alpha: 0.9,
//     });
//     robot_image.x = 10;
//     robot_image.y = -10;

//     var position = new ROSLIB.Topic({
//       ros: ros,
//       name: robotPose,
//       messageType: "geometry_msgs/Pose",
//     }).subscribe((message) => {
//       robot_image.x = message.position.x.toFixed(2);
//       robot_image.y = -message.position.y.toFixed(2);
//       robot_image.rotation = (-getYawFromQuat(message.orientation)).toFixed(2);
//     });

//     viewer.scene.addChild(robot_image);
//   }

//   const rendermap = {view_map};
//   return (
//     <MappingContext.Provider value={rendermap}>
//       {children}
//     </MappingContext.Provider>
//   );
// };

// export default MappingContextAppProvider;
