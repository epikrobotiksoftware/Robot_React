import ParamRow from "./ParamRow";
import * as ROSLIB from "roslib";
import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RosContext } from "../../contexts/RosContext";
// import "./paramScreenCss.css";
import psScreen from "./paramScreenCss.module.css";

function ParamScreen() {
  const { ros } = useContext(RosContext);
  // const params = props.param;
  const [charge_params, setCharge_params] = useState();
const charge_param = process.env.REACT_APP_CHARGE_PARAM;
  let content = []; //birden fazla sayfayı for döngüsü içinde yazıldı.
  for (let i = 0; i < charge_params.length; i++) {
    // const item = charge_params[i];
    content.push(
      <div className={psScreen["parameters"]}>
        <ParamRow paramName={charge_params[i]}/>
      </div>
    );
  }

  useEffect(() => {
    var paramCharge = new ROSLIB.Param({
      ros: ros,
      name: charge_param,
    });
    paramCharge.get((charge_params) => {
      console.log(charge_params);
      setCharge_params(charge_params);
    });
  }, []);

  if (charge_params === undefined) {
    return <div>boşşşşş</div>;
  } else {
    return (
      <>
        <Container>
          <Row>
            <section className={psScreen["rbt_param-prm_screen"]}>
              <div className={psScreen["title2"]}>
                <span className={psScreen["spa"]}>Charge Params</span>
                <span>Description</span>
                <span>Value</span>
                <span className={psScreen["action"]}>Action</span>
              </div>

              <div className={psScreen["content"]}>{content}</div>
            </section>
            {/* <Row className="content2"> */}
            {/* <Col>   */}
            {/* {content} */}
            {/* </Col> */}
            {/* </Row> */}
          </Row>
        </Container>
      </>
    );
  }
}

export default ParamScreen;
