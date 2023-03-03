import React, { useEffect, useState } from "react";
import "./paramButtonCss.css";
import axios from "axios";

const ParamButton = (props) => {
  const [content, setContent] = useState([]);
const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  function getAllTables() {
    axios
      .get(hostName+"/api/v1/ros/positionMarker")
      .then((res) => {
        setContent(res.data.data.Position);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const getTableData = (id) => {
    axios
      .post(hostName +`/api/v1/ros/sendGoal/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllTables();
  }, []);

  return (
    <div>
      {content.map((item, index) => (
        <button
          key={index}
          class="glow-on-hover"
          onClick={() => getTableData(item._id)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default ParamButton;
