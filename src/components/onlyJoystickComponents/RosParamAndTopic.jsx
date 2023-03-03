import React, { useContext, useState } from "react";
import "./rosParamAndTopicCss.css";
import { Row, Col, Container } from "react-bootstrap";
import { RosContext } from "../../contexts/RosContext";
import * as ROSLIB from "roslib";
import { VscRunAll } from "react-icons/vsc";
const RosParamAndTopic = () => {
  const { ros } = useContext(RosContext);

  const [param, setParam] = useState();
  const [paramTf, setParamTf] = useState(false);
  const [paramResult, setParamResult] = useState("output");

  const [topic_name, setTopic_name] = useState();
  const [message_type, setMessage_type] = useState();
  const [user_value, setUser_value] = useState();
 


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
        setParamResult(`${charge_params}`);
      });
    }
  };

  const handleTopic = () => {
    var topic = new ROSLIB.Topic({
      ros: ros,
      name: topic_name,
      messageType: message_type,
    });
    var msg = new ROSLIB.Message({
      data: user_value,
    });
    topic.publish(msg);
  };
  return (
    <div className="RosParamAndTopic_container">
      <Container>
        <Row className="mt-5">
          <span className="text-center">Ros Param Work space</span>
          <Col className=" d-flex    gap-2" style={{ width: "60%" }}>
            <div className="form-outline">
              <label className="form-label" htmlFor="typeText">
                Param Name
              </label>
              <input
                type="text"
                id="typeText"
                className="form-control"
                style={{ width: "400px" }}
                value={param}
                placeholder="param name"
                onChange={(event) => setParam(event.target.value)}
              />
            </div>
            <button
              className="rosparamAndTopic_button_setget"
              onClick={() => handleParam("set")}
            >
              set
            </button>
            <button
              className="rosparamAndTopic_button_setget"
              onClick={() => handleParam("get")}
            >
              get
            </button>
            <button className="rosparamAndTopic_button_result">
              {paramResult}
            </button>
        
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className=" d-flex flex-column   gap-2" style={{ width: "20%" }}>
            <span className="text-center">RosTopic Work Space</span>
            <div className="form-outline">
              <label className="form-label" htmlFor="typeText">
                Topic Name
              </label>
              <input
                type="text"
                id="typeText"
                className="form-control"
                style={{ width: "50%" }}
                value={topic_name}
                placeholder="topic name"
                onChange={(event) => setTopic_name(event.target.value)}
              />
            </div>

            <div className="form-outline">
              <label className="form-label" htmlFor="typeText">
                Message Type
              </label>
              <input
                type="text"
                id="typeText"
                className="form-control"
                style={{ width: "50%" }}
                value={message_type}
                placeholder="message type"
                onChange={(event) => setMessage_type(event.target.value)}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="typeText">
                Enter Value
              </label>

              <input
                type="text"
                id="typeText"
                className="form-control"
                style={{ width: "50%" }}
                value={user_value}
                placeholder="value"
                onChange={(event) => setUser_value(event.target.value)}
              />
            </div>
            <div>
              <button onClick={handleTopic} className="rosparamAndTopic_button">
                <VscRunAll />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RosParamAndTopic;
