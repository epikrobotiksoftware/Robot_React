import CreateMapping from "./CreateMapping";
import "./navAndMappingCss.css";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiPauseFill } from "react-icons/ri";
import { VscDebugContinue } from "react-icons/vsc";
import { AiFillSave } from "react-icons/ai";
import { MdOutlineNotStarted } from "react-icons/md";
import { FaRegStopCircle } from "react-icons/fa";
import { RiRefreshFill } from "react-icons/ri";

import * as ROS2D from "ros2d";
import * as ROSLIB from "roslib";
import getYawFromQuat from "../../scripts/getY";
import robot from "../../assets/robot.png";
import { RosContext } from "../../contexts/RosContext";
import axios from "axios";
import { useSideBarContext } from "../../contexts/SideBarMenuContext";
import { MapStatusContext } from "../../contexts/MapStatusContext";
import StopModal from "./StopModal";
import { useLocation } from "react-router-dom";
// import * as createjs from "createjs";
import createjs from "createjs-module";
const NavAndMapping = () => {
  const planner_plan = process.env.REACT_APP_PLAN_PARAM;
  const { setIsOpen } = useSideBarContext();
  const {
    map_status,
    setMap_status,
    statusMap,
    setMappingOrGoal,
    active,
    setActive,
    playpause,
    setPlaypause,
    isAllowed,
    setIsAllowed,
    modal,
    setModal,
    stop_modal,
    setStop_modal,
  } = useContext(MapStatusContext);

  // const [map, setMap] = useState(null);
  const [area_width, setArea_width] = useState(40);
  const [area_height, setArea_height] = useState(40);
  const [resulation, setResulation] = useState(0.1);
  const robotPose = process.env.REACT_APP_ROBOT_POSE_PARAM;
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const { ros } = useContext(RosContext);
  const map = useRef(null);
  var gridClient;
  var robot_image;
  var viewer;
  var trace_shape;
  var pathMark;
  const location = useLocation();
  console.log(location.pathname);
  console.log(isAllowed);

  useEffect(() => {
    // setMap(viewer);
  }, [viewer]);

  useEffect(() => {
    // setTimeout(function () {
    //    view_map();
    // }, 2000);
    statusMapEffect();
  }, []);

  function statusMapEffect() {
    axios
      .get(hostName + "/api/v1/map/mapStatus")
      .then((res) => {
        console.log(res.data.mapState);

        if (
          res.data.mapState === "startingMap" ||
          res.data.mapState === "paused" ||
          res.data.mapState === "resumed" ||
          res.data.mapState === "saved"
          // res.data.mapState === "mapStoped"
        ) {
          view_map();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //!below mapping

  function view_map() {
    console.log("Viewing Map");
    if (map.current.innerHTML) return;

    viewer = new ROS2D.Viewer({
      divID: "map",
      width: 1855,
      height: 850,
    });

    gridClient = new ROS2D.OccupancyGridClient({
      ros: ros,
      rootObject: viewer.scene,
      continuous: true,
    });

    gridClient.on("change", () => {
      // console.log("map on change");
      viewer.scaleToDimensions(
        gridClient.currentGrid.width,
        gridClient.currentGrid.height
      );

      try {
        viewer.shift(
          gridClient.currentGrid.pose.position.x,
          gridClient.currentGrid.pose.position.y
        );
        render_elments();
      } catch (error) {
        console.log(error);
      }
    });
  }

  function render_elments() {
    //!robot image part
    robot_image = new ROS2D.NavigationImage({
      size: 1,
      image: robot,
      pulse: false,
      alpha: 0.9,
    });
    robot_image.x = 100;
    robot_image.y = -100;
    //! following lane
    trace_shape = new ROS2D.TraceShape({
      strokeSize: 0.05,
      strokeColor: "rgb(200,10,10)",
      // strokeColor: createjs.Graphics.getrgb(44, 10, 238),
      // maxPoses: 100,
      // minDist: 0.05,
      // graphics: new createjs.Graphics(),
    });

    var position = new ROSLIB.Topic({
      ros: ros,
      name: robotPose,
      messageType: "geometry_msgs/Pose",
    });
    position.subscribe((message) => {
      robot_image.x = message.position.x.toFixed(2);
      robot_image.y = -message.position.y.toFixed(2);
      robot_image.rotation = (-getYawFromQuat(message.orientation)).toFixed(2);
      // console.log(trace_shape);
      trace_shape.addPose(message);
    });

    //!----------------
    // var poses = [];
    // var pose= ROSLIB.Pose
    // // Create the graphics
    // var graphics = new createjs.Graphics();
    // graphics.setStrokeStyle(trace_shape.strokeSize);
    // graphics.beginStroke(trace_shape.strokeColor);

    // // Add first pose if given
    // if (pose !== null && typeof pose !== "undefined") {
    //   this.poses.push(pose);
    // }
    // // Create the shape
    // createjs.Shape.call(graphics);
    //!-------------------------------------

    // var lane = new ROSLIB.Topic({
    //   ros: ros,
    //   name: planner_plan,
    //   messageType: "nav_msgs/Path",
    // }).subscribe((message) => {
    //   trace_shape.setPath(message);
    //   // trace_shape.addPose(message);
    // });

    //! pathshape
    // pathMark = new ROS2D.PathShape({
    //   strokeSize: 0.05,
    //   strokeColor: createjs.Graphics.getRGB(255, 50, 30),
    // });

    // var path_sub = new ROSLIB.Topic({
    //   ros: ros,
    //   name: planner_plan,
    //   messageType: "nav_msgs/Path",
    // });
    // path_sub.subscribe((message) => {
    //   pathMark.setPath(message);
    //   console.log("rostopic subbbbbbbbbb");
    //   console.log("asdkandslkansldnlkasndlkasnd", message);
    // });

    //-----------------------------------
    // viewer.scene.addChild(pathMark);
    viewer.scene.addChild(trace_shape);
    viewer.scene.addChild(robot_image);
    // setMap(viewer);
  }
  //! Below İS API AİT FUNCTİON PARTS
  const resume_pause_map = async (stat) => {
    try {
      await axios.post(hostName + "/api/v1/map/pauseMap", {
        stat,
      });
      console.log("data was sent");
      statusMap();
    } catch (error) {
      console.log(error);
    }
  };
  function stop_map() {
    axios
      .get(hostName + "/api/v1/map/stopMap")
      .then((res) => {
        console.log(res.data.data);
        statusMap();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function save_map() {
    axios
      .get(hostName + "/api/v1/map/saveMap")
      .then((res) => {
        console.log(res.data.data);
        statusMap();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // function status_map() {
  //   axios
  //     .get(hostName + "/api/v1/map/mapStatus")
  //     .then((res) => {
  //       console.log(res.data.mapState);
  //       setMap_status(res.data.mapState);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  //! BELOW İS NAV A AİT  FUNCTİONS PARTS
  const handleStart = (index) => {
    setIsOpen(false);
    setActive(index);
    setModal(true);
  };
  const handlePause = (index) => {
    setActive(index);
    setPlaypause(!playpause);
    resume_pause_map("true");
  };
  const handleResume = (index) => {
    setActive(index);
    setPlaypause(!playpause);
    resume_pause_map("false");
  };

  const handleStop = (index) => {
    setActive(index);
    setStop_modal(!stop_modal);
    // setIsAllowed(!isAllowed);
    // stop_map();
    // alert("Attention can't click save button ");
    //  setMappingOrGoal(false);
  };

  const handleSave = (index) => {
    setActive(index);
    save_map();
    alert(
      "Your map record has been taken. Please click the stop button `END` to end the mapping."
    );
    setMappingOrGoal(false);
  };
  const handleRefresh = () => {
    // window.location.reload();
    // setMap(viewer);
    map.current.innerHTML = "";
    view_map();
    console.log("miiiiiiiiiiiiii");
  };
  const handleClick = (index) => {
    setActive(index);
  };

  return (
    <div className="mappingScreen_all_container">
      <nav className="mappingScreen_toolbar_container">
        <button
          className={`navbar-item ${active === 0 ? "active" : ""}`}
          onClick={() => handleStart(0)}
        >
          START
          <MdOutlineNotStarted className="toolbar_icons" size={25} />
        </button>
        {modal && (
          <CreateMapping
            {...{
              isAllowed,
              setIsAllowed,
              modal,
              setModal,
              area_width,
              setArea_width,
              area_height,
              setArea_height,
              resulation,
              setResulation,
              view_map,
              statusMap,
              setMappingOrGoal,
            }}
          />
        )}
        {playpause && (
          <button
            className={`navbar-item_pause ${
              active === 1 ? "active_pause" : ""
            }`}
            onClick={() => handlePause(1)}
            disabled={!isAllowed}
          >
            PAUSE
            <RiPauseFill className="toolbar_icons" size={25} />
          </button>
        )}
        {!playpause && (
          <button
            className={`navbar-item ${active === 1 ? "active" : ""}`}
            onClick={() => handleResume(1)}
            disabled={!isAllowed}
          >
            RESUME
            <VscDebugContinue className="toolbar_icons" size={20} />
          </button>
        )}

        <button
          className={`navbar-item ${active === 2 ? "active" : ""}`}
          onClick={() => handleStop(2)}
          disabled={!isAllowed}
        >
          STOP
          <FaRegStopCircle className="toolbar_icons" size={25} />
        </button>
        {stop_modal && (
          <StopModal
            {...{
              stop_modal,
              setStop_modal,
              isAllowed,
              setIsAllowed,
              stop_map,
              setMappingOrGoal,
            }}
          />
        )}
        <button
          className={`navbar-item ${active === 3 ? "active" : ""}`}
          onClick={() => handleSave(3)}
          disabled={!isAllowed}
        >
          SAVE
          <AiFillSave className="toolbar_icons" size={25} />
        </button>
        <button
          className={`navbar-item ${active === 4 ? "active" : ""}`}
          onClick={() => handleRefresh()}
        >
          REFRESH
          <RiRefreshFill className="toolbar_icons" size={27} />
        </button>
        <button
          className={`navbar-item ${active === 5 ? "active" : ""}`}
          onClick={() => handleClick(5)}
        >
          FUTURE BUTTON
        </button>
        <button
          className={`navbar-item ${active === 6 ? "active" : ""}`}
          onClick={() => handleClick(6)}
        >
          FUTURE BUTTON
        </button>
      </nav>
      {/* <div id="map">{map && <div id="map"></div>}</div> */}

      <div ref={map} id="map"></div>
    </div>
  );
};
export default NavAndMapping;

// ROS2D.TraceShape.prototype.__proto__ = createjs.Shape.prototype;
