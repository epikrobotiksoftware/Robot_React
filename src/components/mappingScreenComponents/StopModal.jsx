import { Modal, Button, Form } from "react-bootstrap";
import stopModal from "./stopModalCss.module.css";

function StopModal(props) {
  const {
    stop_modal,
    setStop_modal,
    isAllowed,
    setIsAllowed,
    stop_map,
    setMappingOrGoal,
  } = props;

  const handleclose = () => {
    setStop_modal(!stop_modal);
  };
  const handlesave = () => {
    setIsAllowed(false);
    stop_map();
    setMappingOrGoal(false);
    setStop_modal(!stop_modal);
  };

  return (
    <div>
      <Modal show={true} title="Create Mapping Start">
        <Modal.Header>
          <Modal.Title style={{ color: "red" }}>
            Attention! You will end the mapping.After that you can't save.If you
            want to save the map, please save it before this operation.If you
            want to start the map from the beginning, click the start
            button.FINALLY PRESS END.
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            className={stopModal["button1"]}
            onClick={() => handleclose()}
          >
            Close
          </Button>
          <Button className={stopModal["button2"]} onClick={() => handlesave()}>
            END
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default StopModal;
