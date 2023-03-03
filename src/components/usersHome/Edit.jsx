import React, { useState, useContext } from "react";
// import { Modal, Input } from "antd";
// import "antd/dist/antd.css";
import { EditContext } from "../../contexts/EditContext";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./editCss.css";

function Edit() {
  //   const data = useContext(EditContext);
  //   const [name, setName] = useState(data.name);
  //   const [role, setRole] = useState(data.role);
  //   const [email, setEmail] = useState(data.email);
  //   const save = () => {
  //     data.setEditisoverlayShown(false);
  //     const user = {
  //       name: name,
  //       role: role,
  //       email: email,
  //     };
  //     console.log(user);
  //     axios
  //       .patch(`http://127.0.0.1:5050/api/v1/users/${data._id}`, user)
  //       .then((res) => {
  //         console.log(res);
  //         console.log("data updated");
  //         window.location.reload(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   return (
  //     <div>
  //       <Modal
  //         title="Update User"
  //         visible={true}
  //         okText="Confirm"
  //         onCancel={() => {
  //           data.setEditisoverlayShown(false);
  //           console.log("cancelling");
  //         }}
  //         onOk={() => {
  //           save();
  //           console.log("ok");
  //         }}
  //       >
  //         {" "}
  //         <form>
  //           <label> Full Name : </label> <br />
  //           <Input
  //             required
  //             id="label"
  //             type="text"
  //             name="name"
  //             value={name}
  //             onChange={(e) => {
  //               setName(e.target.value);
  //             }}
  //           />
  //           <br />
  //           <label> Role : </label> <br />
  //           <Form.Select
  //             value={role}
  //             onChange={(e) => {
  //               setRole(e.target.value);
  //             }}
  //             style={{ width: "313px" }}
  //           >
  //             <option value="superAdmin">Super Admin</option>
  //             <option value="user">User</option>
  //             <option value="admin">Admin</option>
  //           </Form.Select>
  //           <label> E-mail: </label> <br />
  //           <Input
  //             id="label"
  //             required
  //             type="email"
  //             name="Email"
  //             value={email}
  //             onChange={(e) => {
  //               setEmail(e.target.value);
  //             }}
  //           />
  //         </form>
  //       </Modal>
  //     </div>
  //   );
}
export default Edit;
