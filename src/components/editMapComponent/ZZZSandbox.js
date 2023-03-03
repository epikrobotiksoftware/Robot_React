import React, { useState, useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./zzzSandboxCss.css";

function ZZZSandbox() {
  const [imageSrc, setImageSrc] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [size, setSize] = useState("");
  const [base64, setBase64] = useState("");
  const [croppedImgSrc, setCroppedImgSrc] = useState(null);
  const fileInput = useRef(null);
  const cropper = useRef(null);
  const fileReader = useRef(new FileReader());
  
  const handleFileRead = () => {
    console.log("The reading is over");
    const binaryData = fileReader.current.result;
    const base64Data = window.btoa(binaryData);
    setBase64(base64Data);
  };

  const handleChange = (event) => {
    const file = fileInput.current.files[0];
    const { name, size, type } = file;
    const imageSrc = URL.createObjectURL(event.target.files[0]);
    //imageSrc Base64 
    setName(name);
    setType(type);
    setSize(size);
    setImageSrc(imageSrc);
    setCroppedImgSrc(null);

    console.log(file.name);
    fileReader.current.onloadend = handleFileRead;
    fileReader.current.readAsBinaryString(file);
  };

  const handleCropChange = () => {
    console.log("## cropped !");
    const croppedImgData = cropper.current.cropper
      .getCroppedCanvas()
      .toDataURL();

    setCroppedImgSrc(croppedImgData);
  };

  const handleLeftRotate = () => {
    cropper.current.cropper.rotate(-5);
    handleCropChange();
  };
  const handleRightRotate = () => {
    cropper.current.cropper.rotate(5);
    handleCropChange();
  };



  return (
    <div className="zzzSandbox">
      <div className="choosefile">
        <h1>Image import</h1>
        <p>Import a picture, see its properties, a preview & get a base64 </p>
        <input
          type="file"
          accept="image/*"
          ref={fileInput}
          onChange={handleChange}
        />

        <h2>File properties</h2>
        <ul>
          <li>Name: {name}</li>
          <li>Type: {type}</li>
          <li>Size: {size}</li>
        </ul>
        <h2>Raw image preview</h2>
        <img src={imageSrc} alt="" style={{ maxWidth: "400px" }} />

        <h2>Raw image Base64</h2>
        <textarea
          value={base64}
          style={{ width: "100%", height: "50px" }}
          readOnly
        />
      </div>
      <div className="imageneImage">
        <h2>Cropper</h2>
        <Cropper
          style={{ width: "800px", height: "600px" }}
          ref={cropper}
          src={imageSrc}
          aspectRatio={1/ 1}
          cropend={handleCropChange}
        />
        <div>
          <button onClick={handleLeftRotate}>Left Rotate</button>
          <button onClick={handleRightRotate}>Right Rotate</button>
        </div>
        <h2>Cropped image preview</h2>
        <img src={croppedImgSrc} style={{ maxWidth: "400px" }} />
        <br />
        <h2>Cropped image Base64</h2>
        <textarea
          value={croppedImgSrc}
          style={{ width: "100%", height: "50px" }}
          readOnly
        />
        <a
          download="croppedImage.png"
          href={croppedImgSrc}
          disabled={!croppedImgSrc}
        >
          Download
        </a>
      </div>
    </div>
  );
}
export default ZZZSandbox;
