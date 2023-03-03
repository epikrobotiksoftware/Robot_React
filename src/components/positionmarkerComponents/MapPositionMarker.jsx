import React, { useRef, useEffect, useState, useContext } from "react";
import * as ROS2D from "ros2d";
import * as ROSLIB from "roslib";
import robot from "../../assets/robot.png";
import table_image1 from "../../assets/table_image1.png";
import charging_station_rotate from "../../assets/charging_station_rotate.png";
import getYawFromQuat from "../../scripts/getY";
import CreatePosition from "./CreatePosition";
import { Button } from "react-bootstrap";
import { RosContext } from "../../contexts/RosContext";
import { PositionContext } from "../../contexts/PositionContext";
import mapPosMar from "./mapPositionMarkerCss.module.css";

import table from "../../assets/table.png";
import ödeme from "../../assets/ödeme.png";
import mutfak from "../../assets/mutfak.jpg";

import axios from "axios";

const Map2 = () => {
  const { ros } = useContext(RosContext);
const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
 const robotPose = process.env.REACT_APP_ROBOT_POSE_PARAM;
  var gridClient;
  var robot_image;
  var viewer;
  let koordinat = [];
  var table_image;
  const map = useRef(null);
  const [follow, setFollow] = useState([]);
  const [isOverlayShown, setisoverlayShown] = useState(false);
  const [click_position, setclick_position] = useState({
    x: 0,
    y: 0,
    rotation: 0,
  });
  const [robot_position, setrobot_position] = useState({
    x: 0,
    y: 0,
    rotation: 0,
  });

  const [Color, setColor] = useState("green");
  const [Hint, setHint] = useState("");

  const data = {
    click_position,
    robot_position,
    setisoverlayShown,
    Enable,
  };

  useEffect(() => {
    // getTable();
    view_map();
    map.current.style.pointerEvents = "none";
  }, []);

  function view_map() {
    if (map.current.innerHTML !== "") return;
    console.log(ros);
    viewer = new ROS2D.Viewer({
      divID: "map",
      width: 800,
      height: 600,
    });
    gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      continuous: true,
    });

    gridClient.on("change", () => {
      viewer.scaleToDimensions(
        gridClient.currentGrid.width,
        gridClient.currentGrid.height
      );

      try {
        viewer.shift(
          gridClient.currentGrid.pose.position.x,
          gridClient.currentGrid.pose.position.y
        );
      } catch (error) {
        return;
      }
    });
    getTable();
    // render_elments();
    // render_table();
  }

  function overlay_save() {
    viewer.scene.addEventListener("click", function (event) {
      var pose = viewer.scene.globalToRos(event.stageX, event.stageY);
      setclick_position({
        x: Number(pose.x).toFixed(2),
        y: Number(pose.y).toFixed(2),
        rotation: 0,
      });

      setrobot_position({
        x: Number(robot_image.x).toFixed(2),
        y: -Number(robot_image.y).toFixed(2),
        rotation: Number(robot_image.rotation).toFixed(2),
      });

      setisoverlayShown(true);
    });
  }

  function render_elments() {
    overlay_save();
    robot_image = new ROS2D.NavigationImage({
      size: 1.1,
      image: robot,
      pulse: false,
      alpha: 0.9,
    });
    robot_image.x = 10;
    robot_image.y = -10;
    viewer.scene.addEventListener("stagemousemove", function (event) {
      var position = new ROSLIB.Topic({
        ros: ros,
        name: robotPose,
        messageType: "geometry_msgs/Pose",
      });
      position.subscribe((message) => {
        robot_image.x = message.position.x.toFixed(2);
        robot_image.y = -message.position.y.toFixed(2);
        robot_image.rotation = (-getYawFromQuat(message.orientation)).toFixed(
          2
        );
      });
    });
    
    viewer.scene.addChild(robot_image);
  }

  function Enable() {
    setColor((current) => !current);
    if (map.current.style.pointerEvents === "auto") {
      setHint("");
      map.current.style.pointerEvents = "none";
    } else if (map.current.style.pointerEvents === "none") {
      setHint("Click On The Map To Add a Position Marker");
      map.current.style.pointerEvents = "auto";
    }
  }

  function getTable() {
    axios
      .get(hostName+"/api/v1/ros/positionMarker")
      .then((res) => {
        koordinat = res.data.data.Position;
        setFollow(res.data.data.Position);
        console.log(koordinat);
        console.log(follow);
        render_table();
        render_elments();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function render_table() {
    console.log(koordinat);
    console.log(follow);
    for (let index = 0; index < koordinat.length; index++) {
      if (
        koordinat[index].name == "charge-1" ||
        koordinat[index].name == "charge-2" ||
        koordinat[index].name == "charge-3"
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
  const info = { data, view_map, getTable };
  console.log(follow);
  return (
    <PositionContext.Provider value={info}>
      <div className={mapPosMar["map-position"]}>
        <div className={mapPosMar["map-button"]}>
          {isOverlayShown && <CreatePosition />}
          <Button id={mapPosMar["positionmarkerbutton"]} onClick={Enable}>
            Add Position Marker
          </Button>
          <label id={mapPosMar["labelpositionmarker"]}>{Hint}</label>
        </div>
        <div ref={map} id="map"></div>
      </div>
    </PositionContext.Provider>
  );
};
export default Map2;
