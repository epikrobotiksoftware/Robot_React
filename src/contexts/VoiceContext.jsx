import { createContext, useEffect, useState, useContext } from "react";
import * as ROSLIB from "roslib";
import { RosContext } from "../../contexts/RosContext";
import soundFile from "../../assets/anons.mp3";

export const VoiceContext = createContext();

const VoiceContextProvider = ({ children }) => {
  const { ros } = useContext(RosContext);
  const audio = new Audio(soundFile);
  const [follow, setFollow] = useState();
  const [robot_position, setrobot_position] = useState({
    x: 0,
    y: 0,
  });

  const data = {
    robot_position,
  };

  //! FUNCTİONS
  const handleVoice = () => {
    audio.play();
  };

  function render_elments() {
    console.log("render elemnts");
    var position = new ROSLIB.Topic({
      ros: ros,
      name: "/mir_robot1/robot_pose",
      messageType: "geometry_msgs/Pose",
    });
    position.subscribe((message) => {
      setrobot_position({
        x: Number(message.position.x).toFixed(2),
        y: Number(message.position.y).toFixed(2),
      });
      console.log(robot_position);
    });
  }

  function getTable() {
    axios
      .get("http://127.0.0.1:5050/api/v1/ros/positionMarker")
      .then((res) => {
        setFollow(res.data.data.Position);
        koordinat = res.data.data.Position;

        console.log(koordinat);
        console.log(follow);
      })
      .catch((err) => {
        console.log(err);
      });
    render_elments();
  }
  function resultVoice() {
    getTable();
    render_elments();
    follow?.map((item) => {
      return (
        (item.x.$numberDecimal === data.robot_position.x) &
          (item.y.$numberDecimal === data.robot_position.y) && handleVoice()
      );
    });
  }

  const values = { resultVoice };

  return (
    <VoiceContext.Provider value={values}>{children}</VoiceContext.Provider>
  );
};

export default VoiceContextProvider;
