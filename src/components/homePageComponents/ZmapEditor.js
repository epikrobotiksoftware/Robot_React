import React, { useState, useEffect } from "react";
import axios from "axios";
import { createCanvas } from "canvas";

function ImageModificationComponent() {
  const [imageData, setImageData] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  useEffect(() => {
    getMapApi();
  }, []);


  function getMapApi() {
    axios
      .get(hostName+"/api/v1/ros/saveMap")
      .then((res) => {
        setImageData(res.data.link);
        console.log(res.data.link);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleSubmit(event) {
    event.preventDefault();

    // Use canvas to manipulate the image data
    const canvas = createCanvas(800, 600);
    console.log("canvassss",canvas);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(imageData, 0, 0, 400, 400);

    // Set the content type and other request headers for the POST request
    const config = {
      headers: {
        "Content-Type": "image/jpeg",
        Authorization: "Bearer your-api-key",
      },
    };

    // Send the POST request to the API endpoint, including the modified image data in the body
    axios
      .post("https://api.example.com/upload-image", canvas.toBuffer(), config)
      .then((response) => {
        setUploadStatus("Success");
      })
      .catch((error) => {
        setUploadStatus("Error");
        console.log("Failed to upload image:", error);
      });
  }
  console.log(imageData);
  return (
    <div>
      <canvas>
      {imageData && (
        <img
          src={imageData}
          alt="Retrieved image"
          width="800px"
          height="600px"
        />
      )}
      </canvas>
      <form onSubmit={handleSubmit}>
        <button type="submit">Modify and Upload Image</button>
      </form>
      {uploadStatus === "Success" && <p>Image was successfully uploaded</p>}
      {uploadStatus === "Error" && (
        <p>An error occurred while uploading the image</p>
      )}
    </div>
  );
}

export default ImageModificationComponent;
