import React, { useRef, useEffect, useState, useContext } from "react";
import * as Three from "three";
import * as ROS2D from "ros2d";
import * as ROSLIB from "roslib";
import createjs from "createjs-module";
import goal from "../../assets/goal.png";
import robot from "../../assets/robot.png";
import table from "../../assets/table.png";
import table_duty from "../../assets/table_duty.png";
import table_image1 from "../../assets/table_image1.png";
import mapLayout from "../../assets/mapLayout.jpg";
import big_maze from "../../assets/big_maze.png";
import maze_edited from "../../assets/maze_edited.png";
import map_png from "../../assets/map.png";
import ödeme from "../../assets/ödeme.png";
import mutfak from "../../assets/mutfak.jpg";
import arrow from "../../assets/arrow.gif";
import spinner from "../../assets/spinner.gif";

import charging_station_rotate from "../../assets/charging_station_rotate.png";
import getYawFromQuat from "../../scripts/getY";
import { RosContext } from "../../contexts/RosContext";
import axios from "axios";

import soundFile from "../../assets/voice.mp3";
import { KoorTablesContext } from "../../contexts/GetTableDataContext";
// import { use } from "i18next";

const MapDashboard = () => {
  const { ros } = useContext(RosContext);
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const robotPose = process.env.REACT_APP_ROBOT_POSE_PARAM;
  const planner_plan = process.env.REACT_APP_PLAN_PARAM;
  const simple_goal = process.env.REACT_APP_GOAL_PARAM;
  const [loading, setLoading] = useState(false);
  const audio = new Audio(soundFile);

  const { goal } = useContext(KoorTablesContext);
  let alarm = null;
  var gridClient;
  var robot_image;
  var goal_image;
  var table_image;
  var koordinat = [];
  let viewer;
  var pathMarker;
  var charge_image;
  var goal_gif;
  const map = useRef(null);
  const asd = null;

  useEffect(() => {
    // setTimeout(function () {
    //    view_map();
    // }, 2000);
    view_map();
  }, []);

  const handleVoice = () => {
    audio.play();
  };
  // const reload = () => {
  //   window.location.reload();
  // };
  // reload();
  // function sleep(ms) {
  //   console.log("wait: ", ms);
  //   return new Promise((resolve) => setTimeout(resolve, ms));
  // }

  function view_map() {
    // if (!viewer)
    if (map.current.innerHTML) return;

    viewer = new ROS2D.Viewer({
      divID: "map",
      width: 600,
      height: 600,
    });
    // gridClient = new ROS2D.ImageMapClient({
    //   ros: ros,
    //   rootObject: viewer.scene,
    //   image: mapLayout,
    // });
    gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      continuous: false,
    });

    // console.log(viewer);
    gridClient.on("change", () => {
      // console.log("map on change");
      viewer.scaleToDimensions(
        // gridClient.currentImage.width,
        gridClient.currentGrid.width,
        // gridClient.currentImage.height
        gridClient.currentGrid.height
      );

      try {
        viewer.shift(
          // gridClient.currentImage.pose.position.x,
          gridClient.currentGrid.pose.position.x,
          // gridClient.currentImage.pose.position.y
          gridClient.currentGrid.pose.position.y
        );
        getTable();
        // render_table();
        // render_elments();
      } catch (error) {
        return;
      }
    });
  }

  function getTable() {
    axios
      .get(hostName + "/api/v1/ros/positionMarker")
      .then((res) => {
        koordinat = res.data.data.Position;
        console.log(res.data.data);
        render_table();
        render_elments();
        render_table_duty();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function render_elments() {
    robot_image = new ROS2D.NavigationImage({
      size: 1,
      image: robot,
      pulse: false,
      alpha: 0.9,
    });
    robot_image.x = 10;
    robot_image.y = -10;

    var position = new ROSLIB.Topic({
      ros: ros,
      name: robotPose,
      messageType: "geometry_msgs/Pose",
    }).subscribe((message) => {
      robot_image.x = message.position.x.toFixed(2);
      robot_image.y = -message.position.y.toFixed(2);
      robot_image.rotation = (-getYawFromQuat(message.orientation)).toFixed(2);
    });
    // -------------------------------------
    pathMarker = new ROS2D.PathShape({
      strokeSize: 0.05,
      strokeColor: createjs.Graphics.getRGB(255, 50, 30),
    });

    var path_sub = new ROSLIB.Topic({
      ros: ros,
      name: planner_plan,
      messageType: "nav_msgs/Path",
    }).subscribe((message) => {
      pathMarker.setPath(message);
    });
    //---------------------------------------------
    goal_image = new ROS2D.NavigationImage({
      size: 0.3,
      image: table_image1,
      pulse: false,
      alpha: 0.9,
    });

    var goal_sub = new ROSLIB.Topic({
      ros: ros,
      name: simple_goal,
      messageType: "geometry_msgs/PoseStamped",
    }).subscribe((message) => {
      goal_image.x = message.pose.position.x.toFixed(2);
      goal_image.y = -message.pose.position.y.toFixed(2);
      goal_image.rotation = (-getYawFromQuat(message.pose.orientation)).toFixed(
        2
      );
    });
    goal_image.x = -100;
    goal_image.y = -100;

    viewer.scene.addChild(robot_image);
    viewer.scene.addChild(goal_image);
    viewer.scene.addChild(pathMarker);
    // viewer.scene.addChild(charge_image);
    // viewer.scene.addChild(goal_gif);
  }

  function render_table() {
    console.log(koordinat[0].name);
    for (let index = 0; index < koordinat.length; index++) {
      if (
        koordinat[index].name === "charge-1" ||
        koordinat[index].name === "charge-2" ||
        koordinat[index].name === "charge-3"
      ) {
        table_image = new ROS2D.NavigationImage({
          size: 1,
          image: charging_station_rotate,
          pulse: false,
          alpha: 0.9,
        });
      } else if (koordinat[index].name === "ödeme") {
        table_image = new ROS2D.NavigationImage({
          size: 1,
          image: ödeme,
          pulse: false,
          alpha: 0.9,
        });
      } else if (koordinat[index].name === "mutfak") {
        table_image = new ROS2D.NavigationImage({
          size: 1,
          image: mutfak,
          pulse: false,
          alpha: 0.9,
        });
      } else {
        table_image = new ROS2D.NavigationImage({
          size: 1,
          image: table,
          pulse: false,
          alpha: 0.9,
        });
      }

      table_image.x = koordinat[index].x.$numberDecimal;
      table_image.y = -koordinat[index].y.$numberDecimal;
      viewer.scene.addChild(table_image);
    }
  }

  function render_table_duty() {
    console.log(goal?.Coordinates.split(" ")[2]);
    table_duty = new ROS2D.NavigationImage({
      size: 1,
      pulse: false,
      alpha: 0.9,
      gif: arrow,
    });
    table_duty.x = 12;
    // goal?.Coordinates.split(" ")[2]?.toFixed(2);
    table_duty.y = -9;
    // -goal?.Coordinates.split(" ")[5]?.toFixed(2);
    viewer.scene.addChild(table_duty);
  }

  console.log(asd ? "true" : "false");
  // const handleMap=()=>{
  //   setLoading(false);
  //   if (map.current !== null) {
  //     view_map();
  //   }
  // }
  return (
    <>
      <div ref={map} id="map"></div>
      {/* <button onClick={()=>window.location.reload()} >trutyfalsee</button> */}
      {/* <button onClick={() => setLoading(!loading)}>download map</button> */}
    </>
    // <>
    //   {/* <div>
    //     <img src={spinner} alt="" />
    //   </div> */}

    //   {loading ? (
    //     <div>
    //       {/* <button onClick={handleMap}>download map</button> */}
    //       {/* <img src={spinner} alt="" /> */}
    //     </div>
    //   ) : (
    //     <div ref={map} id="map"></div>
    //   )}

    // </>
  );
};
export default MapDashboard;
