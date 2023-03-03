import { createContext, useEffect } from "react";
import axios from "axios";
import React, { useState } from "react";

//1
export const MapStatusContext = createContext();

//2
const MapStatusContextProvider = ({ children }) => {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const [map_status, setMap_status] = useState(
    JSON.parse(localStorage.getItem("map_status")) || "No Action in Mapping"
  );
  const [mappingOrGoal, setMappingOrGoal] = useState(
    JSON.parse(localStorage.getItem("mappingOrGoal")) || false
  );
  const [isAllowed, setIsAllowed] = useState(
    JSON.parse(localStorage.getItem("isAllowed")) || false
  );
  const [active, setActive] = useState(null);
  const [playpause, setPlaypause] = useState(true);
  const [modal, setModal] = useState(false);
  const [stop_modal, setStop_modal] = useState(false);

  useEffect(() => {
    localStorage.setItem("map_status", JSON.stringify(map_status));
    localStorage.setItem("mappingOrGoal", JSON.stringify(mappingOrGoal));
    localStorage.setItem("isAllowed", JSON.stringify(isAllowed));
  }, [map_status, mappingOrGoal, isAllowed]);

  function statusMap() {
    axios
      .get(hostName + "/api/v1/map/mapStatus")
      .then((res) => {
        console.log(res.data.mapState);
        setMap_status(res.data.mapState);
        console.log(map_status);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const status = {
    map_status,
    mappingOrGoal,
    setMappingOrGoal,
    statusMap,
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
  };
  return (
    <MapStatusContext.Provider value={status}>
      {children}
    </MapStatusContext.Provider>
  );
};

export default MapStatusContextProvider;
