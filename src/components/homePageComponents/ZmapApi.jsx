import React, { useState, useEffect } from "react";
import axios from "axios";
import "./zmapApiCss.css";
import arrow from "../../assets/arrow.gif";


const ZmapApi = () => {
  const [apimap, setApimap] = useState([]);
const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  useEffect(() => {
    getMapApi();
  }, []);

  function getMapApi() {
    axios
      .get(hostName+"/api/v1/images/getImage")
      .then((res) => {
        setApimap(res.data.object.link);
        console.log(res.data.object.link);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(apimap);
  return (
    <>
      <div class="image-container">
        <img src={apimap} alt="" />
        <p>hello api map</p>
        <img src={arrow} alt="" />
      </div>
    </>
  );
};

export default ZmapApi;
