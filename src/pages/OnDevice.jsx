import Main from "../components/onDeviceComponents/Main";
import ParamButton from "../components/onDeviceComponents/ParamButton";
import Stop from "../components/onDeviceComponents/Stop";
// import "./styles.css";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsAlt,
  faExpandArrowsAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./onDeviceCss.css";


function OnDevice() {

  const handle = useFullScreenHandle();
  return (
    <div>
      <FullScreen handle={handle}>
        <div
          style={{
            background: "#233",
            padding: 20,
            // marginTop: 20,
            color: "#fff",
            height: "100vh",
          }}
        >
          {/* {handle.active && (
            <button onClick={handle.exit}>
              <FontAwesomeIcon icon={faArrowsAlt} />
            </button>
          )} */}
          <div className="mps">
            <div className="mps_main">
              <Main />
            </div>
            <div className="exnar">
              {!handle.active && (
                <button onClick={handle.enter}>
                  <FontAwesomeIcon icon={faExpandArrowsAlt} />
                  <i className="fa fa-expand"></i>
                </button>
              )}

              {handle.active && (
                <button onClick={handle.exit}>
                  <FontAwesomeIcon icon={faArrowsAlt} />
                </button>
              )}
            </div>

            <div className="mps_ps">
              <div className="mps_p">
                <ParamButton />
              </div>
              <div className="mps_s">
                <Stop />
              </div>
            </div>
          </div>
        </div>
      </FullScreen>
    </div>
  );
}

export default OnDevice;
