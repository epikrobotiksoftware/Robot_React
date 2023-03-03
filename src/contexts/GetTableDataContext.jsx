import { createContext } from "react";
import { useState } from "react";
import axios from "axios";
// 1
export const KoorTablesContext = createContext();

// 3
// export const useSideBarContext = () => {
//   return useContext(TablesContext);
// };

// 2
const GetTablesContextProvider = ({ children }) => {
  const [goal, setGoal] = useState();
  const getTableData = (id) => {
    axios
      .post(`http://127.0.0.1:5050/api/v1/ros/sendGoal/${id}`)
      .then((res) => {
        console.log(res.data);
        setGoal(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const tables = { getTableData, goal, setGoal };

  return (
    <KoorTablesContext.Provider value={tables}>
      {children}
    </KoorTablesContext.Provider>
  );
};

export default GetTablesContextProvider;
