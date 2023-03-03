import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import paramButPos from "./paramButtonPositionCss.module.css";
import { KoorTablesContext } from "../../contexts/GetTableDataContext";

const ParamButtonPosition = () => {
  const [content, setContent] = useState([]);
  const { getTableData } = useContext(KoorTablesContext);
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;

  function getAllTables() {
    axios
      .get(hostName + "/api/v1/ros/positionMarker")
      .then((res) => {
        setContent(res.data.data.Position);
        console.log("hello");
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getAllTables();
  }, []);
 
  // console.log(content);
  return (
    <>
      {content.map((item, index) => (
        <div key={index}>
          <button
            className={paramButPos["button"]}
            onClick={() => getTableData(item._id)}
          >
            {item.name}{" "}
          </button>
        </div>
      ))}
    </>
  );
};
export default ParamButtonPosition;
