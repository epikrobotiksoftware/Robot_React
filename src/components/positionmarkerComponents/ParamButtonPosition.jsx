import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { MdOutlineClose } from "react-icons/md";
import paramButPos from "./paramButtonPositionCss.module.css";
import { useContext } from "react";
import { TablesContext } from "../../contexts/TablesContext";

const ParamButtonPosition = () => {
  const [isShown, setIsShown] = useState(false);
  const [_id, setId] = useState();
  const { getAllTables, content } = useContext(TablesContext);
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  useEffect(() => {
    getAllTables();
  }, []);
  const handleDelete = (item) => {
    axios
      .delete(hostName + `/api/v1/ros/positionMarker/${item._id}`)
      .then((res) => {
        console.log("user deleted");
        getAllTables();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showDeleteList = (event) => {
    setIsShown(!isShown);
  };
  const handleCancel = (event) => {
    setIsShown(!isShown);
  };
  return (
    <div className={paramButPos["allButton"]}>
      <div className={paramButPos["twoButton"]}>
        {isShown ? (
          <button
            className={paramButPos["cancelbutton"]}
            onClick={handleCancel}
          >
            Cancel
          </button>
        ) : (
          <button
            className={paramButPos["deletebutton"]}
            onClick={showDeleteList}
          >
            Edit
          </button>
        )}
      </div>
      <div className={paramButPos["responsive"]}>
        {content.map((item) => (
          <div key={item.id}>
            {!isShown && (
              <button className={paramButPos["button"]}>{item.name}</button>
            )}

            {isShown && (
              <button
                className={paramButPos["showCancelButton"]}
                onClick={() => handleDelete(item)}
              >
                {item.name}
                <MdOutlineClose size={20} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParamButtonPosition;
