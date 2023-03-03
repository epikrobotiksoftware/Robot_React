import React, { useContext, useEffect, useState } from "react";
import "./rosParamAndTopicCss.css";
import { Row, Col, Container } from "react-bootstrap";
import { RosContext } from "../../contexts/RosContext";
import * as ROSLIB from "roslib";

const RosParamAndTopic = () => {
  const { ros } = useContext(RosContext);

  const [param, setParam] = useState(null);
  const [way, setWay] = useState(null);
  const [paramTf, setParamTf] = useState(false);
  const [paramResult, setParamResult] = useState("output");

  const [allTopics, setAllTopics] = useState();
  const [topic, setTopic] = useState(null);
  const [type, setType] = useState(null);
  const [data, setData] = useState(null);
  const [topicResult, setTopicResult] = useState("output");
  // const [topicResult, setTopicResult] = useState(false);

  const handleParam = (method) => {
    if (method === "set") {
      setParamTf(!paramTf);
      var paramInput1 = new ROSLIB.Param({
        ros: ros,
        name: param, //+ "/description",
      });
      paramInput1.set(paramTf);
      console.log(paramTf);
      setParamResult(`${paramTf}`);
    } else if (method === "get") {
      var paramInput2 = new ROSLIB.Param({
        ros: ros,
        name: param,
      });
      paramInput2.get((charge_params) => {
        console.log(charge_params);
        setParamResult(charge_params);
      });
    }
  };
  useEffect(() => {
    ros.getTopics(function (topics) {
      setAllTopics(topics.topics);
    });
  }, []);

  const handleTopic = () => {
    allTopics.map((item) => {
      return item === topic && console.log(topic);
    });
  };

  return (
    <div className="RosParamAndTopic_container">
      <Container>
        <Row className="mt-5">
          <Col className=" d-flex gap-2">
            <span>Ros Param Name</span>
            <select
              onChange={(event) => setParam(event.target.value)}
              value={param}
              placeholder="select param name"
            >
              <option value="param">select param name</option>
              <option value="/EmergencyStop">/EmergencyStop</option>
              <option value="/mir_robot1/move_base_status">
                /mir_robot1/move_base_status
              </option>
              <option value="/mir_robot1/move_base_status">
                /mir_robot1/move_base_status
              </option>
              <option value="/rosversion">/rosversion</option>
            </select>

            <select
              onChange={(event) => setWay(event.target.value)}
              value={way}
              placeholder="select method"
            >
              <option value="way">select method</option>
              <option value="set">set</option>
              <option value="get">get</option>
            </select>

            <button onClick={() => handleParam(way)}>run</button>
            <button>{paramResult}</button>
            <span></span>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className=" d-flex gap-2">
            <span>RosTopic Name</span>
            <input
              onChange={(event) => setTopic(event.target.value)}
              value={topic}
              placeholder="write topic name"
            />
            <input
              onChange={(event) => setType(event.target.value)}
              placeholder="write message type"
              value={type}
            />
            <input
              onChange={(event) => setData(event.target.value)}
              type="text"
              placeholder="write data"
              value={null}
            />
            <button onClick={() => handleTopic()}>run</button>
          </Col>
        </Row>
        {/* <form>
          <label>Enter first name</label>
          <br />
          <input type="text" name="firstname" />
          <br />
          <label>Enter last name</label>
          <br />
          <input type="text" name="lastname" />
          <br />
          <p>
            <strong>Note:</strong>The default maximum cahracter lenght is 20.
          </p>
        </form> */}
      </Container>
    </div>
  );
};

export default RosParamAndTopic;
// <Container>
//   <Row className="mt-5">
//     <Col className=" d-flex gap-2">
//       <span>Ros Param Name</span>
//       <select
//         onChange={(event) => setParam(event.target.value)}
//         value={param}
//         placeholder="select param name"
//       >
//         <option value="param">select param name</option>
//         <option value="/EmergencyStop">/EmergencyStop</option>
//         <option value="/mir_robot1/move_base_status">
//           /mir_robot1/move_base_status
//         </option>
//         <option value="/mir_robot1/move_base_status">
//           /mir_robot1/move_base_status
//         </option>
//         <option value="/rosversion">/rosversion</option>
//       </select>

//       <select
//         onChange={(event) => setWay(event.target.value)}
//         value={way}
//         placeholder="select method"
//       >
//         <option value="way">select method</option>
//         <option value="set">set</option>
//         <option value="get">get</option>
//       </select>

//       <button onClick={() => handleParam(way)}>run</button>
//       <button>{paramResult}</button>
//       <span></span>
//     </Col>
//   </Row>
//   <Row className="mt-5">
//     <Col className=" d-flex gap-2">
//       <span>RosTopic Name</span>
//       <select
//         onChange={(event) => setTopic(event.target.value)}
//         value={topic}
//       >
//         <option value="topic">select topic name</option>
//         <option value="/mir_robot1/robot_pose">
//           /mir_robot1/robot_pose
//         </option>
//         <option value="">/map_metadata</option>
//         <option value="">/map</option>
//         <option value="">/scan</option>
//         <option value="">
//           mir_robot1/mobile_base_controller/cmd_vel
//         </option>
//       </select>

//       <select
//         onChange={(event) => setType(event.target.value)}
//         value={type}
//       >
//         <option value="type">message type</option>
//         <option value="set">nav_msgs/OccupancyGrid</option>
//         <option value="get">nav_msgs/MapMetaData</option>
//         <option value="get">sensor_msgs/LaserScan</option>
//         <option value="get">geometry_msgs/Twist</option>
//         <option value="get">geometry_msgs/Pose</option>
//         <option value="get">nav_msgs/Path</option>
//         <option value="get">actionlib_msgs/GoalID</option>
//         <option value="get">nav_msgs/Odometry</option>
//         <option value="get">geometry_msgs/Pose</option>
//       </select>
//       <select
//         onChange={(event) => setTecnic(event.target.value)}
//         value={tecnic}
//       >
//         <option value="tecnic">select value</option>
//         <option value="set">set</option>
//         <option value="get">get</option>
//       </select>

//       <button onClick={() => handleTopic()}>run</button>
//     </Col>
//   </Row>

// </Container>;
