


//? Bu Fonksiyona  gerek yok gibi=> localStorage.clear(); locali tamamen siliyor


import {useNavigate } from "react";
const Logout = () => {
  const navigate = useNavigate();
  localStorage.removeItem("token");
  navigate("/");
};

export default Logout;
