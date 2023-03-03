import React, { useState, useContext } from "react";
// import { Modal, Input, Select } from "antd";
import { AddContext } from "../../contexts/AddContext";
// import "antd/dist/antd.css";
import axios from "axios";
import "./addCss.css";

function Add() {
  //   const data = useContext(AddContext);
  //   const [name, setName] = useState();
  //   const [role, setRole] = useState();
  //   const [email, setEmail] = useState();
  //   const [password, setPassword] = useState("");
  //   const [confirmPassword, setConfirmPassword] = useState("");
  //   const Save = () => {
  //     window.location.reload(false);
  //     data.setAddisoverlayShown(false);
  //     const user = {
  //       name: name,
  //       role: role,
  //       password: password,
  //       passwordConfirm: confirmPassword,
  //       email: email,
  //     };
  //     console.log(data);
  //     axios
  //       .post("http://127.0.0.1:5050/api/v1/users/postUser", user)
  //       .then((res) => {
  //         console.log("post method test");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   return (
  //     <div>
  //       <Modal
  //         title="Create User"
  //         visible={true}
  //         okText="Create"
  //         onCancel={() => {
  //           data.setAddisoverlayShown(false);
  //           console.log("cancelling");
  //         }}
  //         onOk={() => {
  //           Save();
  //           console.log("ok");
  //         }}
  //       >
  //         {" "}
  //         <form>
  //           <label> Full Name : </label> <br />
  //           <Input
  //             id="label"
  //             required
  //             type="text"
  //             name="name"
  //             value={name}
  //             onChange={(e) => {
  //               setName(e.target.value);
  //             }}
  //           />
  //           <br />
  //           <label> Role : </label> <br />
  //           <Select
  //             name="role"
  //             value={role}
  //             onChange={(e) => {
  //               setRole(e.target.value);
  //             }}
  //             style={{ width: "313px" }}
  //           >
  //             <option value="superAdmin">Super Admin</option>
  //             <option value="admin">Admin</option>
  //             <option value="user">User</option>
  //           </Select>{" "}
  //           <br />
  //           <label> E-mail: </label> <br />
  //           <Input
  //             id="label"
  //             required
  //             type="email"
  //             name="email"
  //             value={email}
  //             onChange={(e) => {
  //               setEmail(e.target.value);
  //             }}
  //           />{" "}
  //           <br></br>
  //           <label> Password: </label> <br />
  //           <Input
  //             id="label"
  //             required
  //             type="password"
  //             name="password"
  //             value={password}
  //             onChange={(e) => {
  //               setPassword(e.target.value);
  //             }}
  //           />{" "}
  //           <br />
  //           <label> confirmPassword: </label> <br />
  //           <Input
  //             id="label"
  //             required
  //             type="password"
  //             name="confirmPassword"
  //             value={confirmPassword}
  //             onChange={(e) => {
  //               setConfirmPassword(e.target.value);
  //             }}
  //           />
  //         </form>
  //       </Modal>
  //     </div>
  //   );
}
export default Add;
