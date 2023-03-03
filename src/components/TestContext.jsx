import React, { useContext } from "react";
import { RosContext } from "../contexts/RosContext";

const TestContext = () => {
  const { ros } = useContext(RosContext);
  console.log(ros);
  // console.log(ros.idCounter);

  // if (ros.isConnected)
  // {
  //   return()
  // }
  // else{
  //   return ()
  // }

  return (
    <>
      <div>TestContext</div>
      {ros && <p> {ros.idCounter} </p>}
      <p> {ros.idCounter} </p>
      {/* <p> {ros.transportLibrary} </p> */}
    </>
  );
};

export default TestContext;
