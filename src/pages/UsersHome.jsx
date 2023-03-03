import React, { Fragment, useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import "react-confirm-alert/src/react-confirm-alert.css";
// import "../bootstrap/bootstrapstyling/bootstrap6.min.css";
import "./usersHomeCss.css";
import Add from "../components/usersHome/Add";
import Edit from "../components/usersHome/Edit";
import { AddContext } from "../contexts/AddContext";
import { EditContext } from "../contexts/EditContext";
import Header from "../components/consociateComponents/Header";
import Sidebar from "../components/consociateComponents/SideBar";
function UsersHome() {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const [_id, setId] = useState();
  const [addisoverlayShown, setAddisoverlayShown] = useState(false);
  const [editisoverlayShown, setEditisoverlayShown] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  var edited_user;

  const data = {
    _id,
    setId,
    name,
    setName,
    role,
    setRole,
    email,
    setEmail,
    editisoverlayShown,
    setEditisoverlayShown,
    setAddisoverlayShown,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
  };

  function getAllUsers() {
    axios
      .get(hostName+"/api/v1/users/getAllUsers")
      .then((res) => {
        setUsers(res.data.data.User);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function openAddModal() {
    setAddisoverlayShown(true);
  }

  function deleteConfirmation() {
    confirmAlert({
      title: "Confirm To Submit",
      message: "Are you sure you want to delete this user",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(),
        },
        {
          label: "No",
        },
      ],
    });
  }
  function deleteUser() {
    axios
      .delete(`http://127.0.0.1:5050/api/v1/users/${edited_user._id}`)

      .then((res) => {
        console.log("user deleted");
        getAllUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function updateUser(_id, name, role, email) {
    data.setId(_id);
    data.setName(name);
    data.setRole(role);
    data.setEmail(email);
    setEditisoverlayShown(true);
  }

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Header />
      <Sidebar />
      <Container className="allUsers">
        <Fragment>
          <AddContext.Provider value={data}>
            <Button onClick={openAddModal} id="createUser">
              Create User
            </Button>
            {addisoverlayShown && <Add />}
          </AddContext.Provider>
          <center>
            <div>
              <Table id="table">
                {" "}
                <tbody>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>E-mail</th>
                    <th>Actions</th>
                  </tr>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td>{user.email}</td>{" "}
                      <td>
                        {" "}
                        <EditContext.Provider value={data}>
                          <Button
                            id="editButton"
                            onClick={() =>
                              updateUser(
                                user._id,
                                user.name,
                                user.role,
                                user.email
                              )
                            }
                          >
                            <FiEdit size={19} />
                          </Button>
                          {editisoverlayShown && <Edit />}
                        </EditContext.Provider>
                        <Button
                          id="deleteButton"
                          onClick={() => {
                            edited_user = user;
                            deleteConfirmation();
                          }}
                        >
                          <RiDeleteBin5Line size={20} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>{" "}
          </center>
        </Fragment>
      </Container>
    </>
  );
}
export default UsersHome;
