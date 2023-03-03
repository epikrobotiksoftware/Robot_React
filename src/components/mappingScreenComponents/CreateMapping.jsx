// import React, { useState } from "react";
// import { useContext } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";
// import { MappingContext } from "../../contexts/MappingContext";
import createPos from "./createMappingCss.module.css";

function CreateMapping(props) {
  const {
    isAllowed,
    setIsAllowed,
    modal,
    setModal,
    area_width,
    setArea_width,
    area_height,
    setArea_height,
    resulation,
    setResulation,
    view_map,
    statusMap,
    setMappingOrGoal,
  } = props;
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  // const {view_map} = useContext(MappingContext);
  
  const sent_map_area = async (data) => {
    const { width, height, resolution } = data;
    if (isNaN(width) || isNaN(height) || isNaN(resolution)) {
      throw new Error("Width, height, or resolution is not a valid number");
    }
    // assign.width = parseFloat(width);
    // assign.height = parseFloat(height);
    // assign.resolution = parseFloat(resolution);
    try {
      // const data = {
      //   width: "400",
      //   height: "800",
      //   resolution: "0.09",
      // };
      await axios.post(hostName + "/api/v1/map/startMap", data, {});
      console.log("area value sent");
    } catch (error) {
      console.log(error);
    }
  };

  const handleclose = () => {
    setModal(false);
  };

  
  const handleStartMapping = async() => {
    setIsAllowed(true);
    const deta = {
      width: area_width,
      height: area_height,
      resolution: resulation,
    };
    await sent_map_area(deta);
    setMappingOrGoal(true);
    statusMap();
    view_map();
    setModal(false);
  };
  console.log(typeof area_width);
  return (
    <div>
      <Modal show={true} title="Create Mapping Start">
        <Modal.Header>
          <Modal.Title>Create Mapping Start</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label> Width[meter]:</Form.Label>
              <Form.Control
                required
                type="string"
                name="width"
                value={area_width}
                onChange={(e) => {
                  setArea_width(Number(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Height[meter]:</Form.Label>
              <Form.Control
                required
                type="string"
                name="height"
                value={area_height}
                onChange={(e) => {
                  setArea_height(Number(e.target.value));
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Resulation[px]:</Form.Label>
              <Form.Control
                required
                step="0.01"
                type="number"
                name="resulation"
                value={resulation}
                onChange={(e) => {
                  setResulation(Number(e.target.value));
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
            onClick={() => handleclose()}
          >
            Close
          </Button>
          <Button
            className={createPos["button2"]}
            onClick={() => handleStartMapping()}
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
