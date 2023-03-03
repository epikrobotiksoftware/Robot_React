import React from "react";
import { useGetRos } from "../helpers/rosfunction";

const TestCustom = () => {
const [ros] = useGetRos();
console.log(ros);
// console.log(ros.isConnected);

  return(
  <div>
    <p>ros geldi geldi</p>
    {/* <span> {ros.idCounter} </span> */}
    {/* <p> {ros.isConnected} </p> */}
  </div>
  )
};

export default TestCustom;
