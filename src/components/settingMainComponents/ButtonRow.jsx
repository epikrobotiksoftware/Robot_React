import "./SettingMainScreen.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ButtonRow = (props) => {
  console.log(props);
  var data = props.data;
  var title = data.title;
  var icon = data.icon;
  var description = data.description;
  var navigate = useNavigate();
  function onChange() {
    navigate(data.navigate, { replace: true})
  }
  return (
    <Container onClick={onChange} >
    <Row>
      <Col className="buttonicons">
        <p>{icon}</p>
      </Col>
      </Row>
      <Row>
      <Col className="buttonstitle">
        <p>{title}</p>
      </Col>
      </Row>
      <Row>
      <Col className="buttonsp">
        <p>{description}</p>
      </Col>
      </Row>
    </Container>
  );
};

export default ButtonRow;
