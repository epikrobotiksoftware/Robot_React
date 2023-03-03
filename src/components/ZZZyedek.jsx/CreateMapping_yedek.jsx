import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import createPos from "./createMappingCss.module.css";

function CreateMapping(props) {
  const {
    setModal,
    map_width,
    setMap_width,
    map_height,
    setMap_height,
    view_map,
  } = props;
  //   const { data, view_map, getTable } = useContext(PositionContext);
  //   const { getAllTables } = useContext(TablesContext);

  //   const navigate = useNavigate();
 
  //   const [rotation, setrotation] = useState(data.click_position.rotation);
  // const [name, setname] = useState("");

  //   function save() {
  //     const positionData = {
  //       name: name,
  //       x: x,
  //       y: y,
  //       rotation: rotation,
  //     };
  //     axios
  //       .post("http://127.0.0.1:5050/api/v1/ros/positionMarker", positionData)
  //       .then((res) => {
  //         console.log("post method test");
  //         data.setisoverlayShown(false);
  //         data.Enable();
  //         getAllTables();
  //         navigate("/");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }

  //   function get_robot_position() {
  //     setx(data.robot_position.x);
  //     sety(data.robot_position.y);
  //     setrotation(data.robot_position.rotation);
  //   }

  return (
    <div>
      <Modal show={true} title="Create Mapping Start">
        <Modal.Header>
          <Modal.Title>Create Mapping Start</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="positionName">
              <Form.Label> Width:</Form.Label>
              <Form.Control
                required
                type="text"
                name="width"
                value={map_width}
                onChange={(e) => {
                  setMap_width(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="PositionX">
              <Form.Label> Height:</Form.Label>
              <Form.Control
                required
                type="text"
                name="height"
                value={map_height}
                onChange={(e) => {
                  setMap_height(e.target.value);
                }}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="PositionY">
              <Form.Label> Position Y:</Form.Label>

              <Form.Control
                required
                type="text"
                name="PositionY"
                value={y}
                onChange={(e) => {
                  sety(e.target.value);
                }}
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className={createPos["button1"]}
            onClick={() => {
              view_map()
              setModal(false);

            }}
          >
            Close
          </Button>
          <Button
            className={createPos["button2"]}
            onClick={() => {
              //   save();
              console.log("Saved");
            }}
          >
            Save Changes
          </Button>
          {/* <Button
            id={createPos["button2"]}
            onClick={() => {
              get_robot_position();
              // props.Enable();
            }}
          >
            Get Robot Position{" "}
          </Button> */}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default CreateMapping;
