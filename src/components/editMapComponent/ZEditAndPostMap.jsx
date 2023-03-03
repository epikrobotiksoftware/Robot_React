import React from "react";
import { useState } from "react";
import axios from "axios";
// import ProfilePicture from "./Display";
import "./zeditAndPostMapCss.css";
import map from "../../assets/map.png"

const EditAndPostMap = () => {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  const [imageData, setImageData] = useState(null);
  const [direct, setDirect] = useState();

  const [image, setImage] = useState(null);
  const [wasPosted, setWasPosted] = useState(null);
  //!below is get  map from API for edit
  function getMapApi() {
    axios
      .get(hostName + "/api/v1/map/getMap")
      .then((res) => {
        setImageData(res.data.link);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //!below is for set image
  const [degree, setDegree] = useState(0);

  const handleLeftClick = () => {
    setDegree((prevDegree) => prevDegree - 10);
  };

  const handleRightClick = () => {
    setDegree((prevDegree) => prevDegree + 10);
  };
  const handleDownload = () => {
    getMapApi();
  };
  const handleSetState = () => {
    setDirect(imageData);
  };
  console.log(direct);
  //!below is chose file for post
  const handleChose = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  //!below is post file  API
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userImage", image);

    axios
      .post("http://127.0.0.1:5050/api/v1/images/uploadImage", formData)
      .then((response) => {
        setWasPosted(response.data.link);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(image);
  return (
    <div className="editmap">
      <div>
        <p>Image To Be Edited</p>
        <button onClick={handleLeftClick}>Left</button>
        <button onClick={handleRightClick}>Right</button>
        <button onClick={handleDownload}>Download</button>
        <button onClick={handleSetState}>SetState</button>
        <div
          style={{
            transform: `rotate(${degree}deg)`,
            width: "200px",
            height: "200px",
            border: "2px solid purple",
            display: "flex",
            justifyContent: "center",
            margin: "75px",
          }}
        >
          <img src={imageData} alt="Rotated" />
        </div>
      </div>
      <div>
        <p>Image To Be Post</p>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleChose} />
          <img
            src={image}
            // {` ../../assets/${image}`}
            alt="asd"
            style={{
              transform: `rotate(${degree}deg)`,
              width: "50px",
              height: "50px",
              border: "2px solid purple",
              display: "flex",
              justifyContent: "center",
              margin: "75px",
            }}
          />
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default EditAndPostMap;
