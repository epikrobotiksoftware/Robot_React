import "../../components/systemSettingComponents/SystemSetting.css";
import { useState, useContext } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { Modal, Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
// import Config from "../scripts/Config";
import { AiOutlineRobot } from "react-icons/ai";

function CreatePosition() {
  const RosServerIp=process.env.REACT_APP_ROSBRIDGE_SERVER_IP
  const data = useContext(PositionContext);
  console.log(data);
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };
  const [robotip, setrobotip] = useState(RosServerIp);
  function save() {
    console.log("save");
    data.setRobotIP(robotip);
    data.setisoverlayShown(false);
    localStorage.setItem('key',JSON.stringify(robotip))
  }

 return (
    <div>
      <Modal show={true} title="Change Robot Ip" visible={true} okText="Ok">
        <Modal.Header>
          <Modal.Title>Change Robot Ip</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">Robot Ip</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <AiOutlineRobot size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Robot Ip"
                    value={robotip}
                    onChange={(e) => {
                      setrobotip(e.target.value);
                    }}
                    aria-describedby="inputGroupPrepend"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter new robot ip
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-15"></Row>
            <Button
              id="button3"
              onClick={() => {
                data.setisoverlayShown(false);
                console.log("cancelling");
              }}
            >
              Close
            </Button>
            <Button
              type="submit"
              id="button4"
              onClick={() => {
                save();
                console.log("ok");
              }}
            >
              Change Robot Ip
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreatePosition;
