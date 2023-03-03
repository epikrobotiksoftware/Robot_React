import "../../components/systemSettingComponents/SystemSetting.css";
import { useState, useContext, useEffect } from "react";
import { PositionContext } from "../../contexts/PositionContext";
import { Modal, Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { RiLockPasswordFill, RiLockUnlockFill } from "react-icons/ri";
import axios from "axios";

function CreatePositionChangePassword() {
  const data = useContext(PositionContext);
  console.log(data);
  const [validated, setValidated] = useState(false);

  const [passwordCurrent, setPasswordCurrent] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();

  const [updated, setUpdated] = useState("");
  const [token, setToken] = useState(null);
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  // const handleSubmit = (event) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   }

  //   setValidated(true);
  // };
  // function save() {
  //   console.log("save");
  //   data.setpassword_(password_);
  //   data.setnewpassword_(newpassword_);
  //   data.setconfirmpassword_(confirmpassword_);
  //   data.setisoverlayShown(true);
  // }
  // const changePassword = {
  //   passwordCurrent: passwordCurrent,
  //   password: password,
  //   passwordConfirm: passwordConfirm,
  // };
  function handleSubmit(e, passwordCurrent, password, passwordConfirm) {
    e.preventDefault();
    // const queryString = window.location.search;
    // console.log(queryString);
    // const urlParams = new URLSearchParams(queryString);
    // const token = urlParams.get("token");
    setToken(JSON.parse(localStorage.getItem("token")));
    console.log(token);

    //  const token = tokenData.token

    axios
      .patch(hostName + `/api/v1/users/updateMyPassword/${token}`, {
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm,
      })
      .then((res) => {
        console.log("token", res.token);
        setUpdated("Your Password Successfully Updated");
      })
      .catch((err) => {
        setUpdated("Please Try again");
        if (err.response) {
          console.log(err.response.data);
        } else if (err.request) {
          console.log(err.request);
        } else if (err.message) {
          console.log(err.message);
        }
      });
  }
  useEffect(() => {
    setToken(JSON.parse(localStorage.getItem("token")));
  }, []);
  // console.log(passwordCurrent);
  // console.log(password);
  // console.log(passwordConfirm);

  return (
    <div>
      <Modal show={true} title="Change Password" visible={true} okText="Ok">
        <Modal.Header>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={() => handleSubmit()}
          >
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <RiLockPasswordFill size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    aria-describedby="inputGroupPrepend"
                    // value="passwordCurrent"
                    required
                    onChange={(e) => setPasswordCurrent(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your old password{" "}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">New Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <RiLockUnlockFill size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="New Password"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters
                    and numbers, and must not contain spaces, special
                    characters, or emoji.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter your new password{" "}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="13" controlId="validationCustomUsername">
                <Form.Label className="label">Confirm Password</Form.Label>
                <InputGroup hasValidation>
                  <InputGroup.Text id="inputGroupPrepend">
                    <RiLockPasswordFill size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    aria-describedby="inputGroupPrepend"
                    required
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your confirm password
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
                // updatePassword();
                console.log("ok");
              }}
            >
              Change Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreatePositionChangePassword;
