import React, { createContext, useState } from "react";
import * as ROSLIB from "roslib";
export const RosContext = createContext();

const RosContextProvider = (props) => {
  var ros;
  const RosServerIp = process.env.REACT_APP_ROSBRIDGE_SERVER_IP;
  const RosServerPort = process.env.REACT_APP_ROSBRIDGE_SERVER_PORT;
const [connect, setConnect] = useState(false);

  function init_connection() {
    ros = new ROSLIB.Ros();
    try {
      ros.on("connection", () => {
        console.log("connected now");
        console.log("Ros in context:", ros);
        setConnect(true);
      });

      ros.on("close", () => {
        console.log("disconnected now");
        setConnect(false);
        setTimeout(() => {
          ros.connect("ws://" + RosServerIp + ":" + RosServerPort);
        }, 3000);
      });

      ros.connect("ws://" + RosServerIp + ":" + RosServerPort + "");
      
    } catch (error) {
      console.log(error);
    }
  }
 
   
   init_connection();

  const rosdata = { ros,connect };
  return (
    <RosContext.Provider value={rosdata}>{props.children}</RosContext.Provider>
  );
};

export default RosContextProvider;

