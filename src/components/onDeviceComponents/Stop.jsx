import React, {useState,useContext } from "react";
import redButton from "../../assets/redButton.gif";
import greenButton from "../../assets/greenButton.gif";
import * as ROSLIB from "roslib";
import { RosContext } from "../../contexts/RosContext";

const Stop = () => {
  const { ros } = useContext(RosContext);
const emergency_stop = process.env.REACT_APP_EMERGENCY_PARAM;
  const redStyle = {
    backgroundImage: "url(" + redButton + ")",
    backgroundPosition: "center",
    border: "solid 10px  #f80d05",
    color: "white",
    padding: "15px 32px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "400px",
    marginRight: "10%",
    marginTop: "18%",
    // float: "right",
    width: "250px",
    height: "250px",
    value: "Stop",
  };

  const greenStyle = {
    backgroundImage: "url(" + greenButton + ")",
    backgroundPosition: "center",
    border: "solid 10px  #11b111",
    color: "green",
    value: "Resume",
    padding: "15px 32px",
    fontSize: "20px",
    cursor: "pointer",
    borderRadius: "400px",
    marginRight: "10%",
    marginTop: "18%",
    // float: "right",
    width: "250px",
    height: "250px",
  };
  const [desgin, setDesgin] = useState(redStyle);

  function stop_hint() {
    var btn = document.getElementById("stopOnDvice");
    var param = new ROSLIB.Param({
      ros: ros,
      name: emergency_stop,
    });
    
    if (btn.value === "Stop") {
      param.set(true);
      setDesgin(greenStyle);
      btn.value = "Resume";
      btn.innerHTML = "Resume";
    } else {
      param.set(false);
      setDesgin(redStyle);
      btn.value = "Stop";
      btn.innerHTML = "Stop";
    }
  }


  return (
    <div>
      <button
        id="stopOnDvice"
        onClick={stop_hint}
        value="Stop"
        style={desgin}
      >
        Stop
      </button>
    </div>
  );
};
export default Stop;
