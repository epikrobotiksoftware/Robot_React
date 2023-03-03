import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import "./editAndPostMapCss.css";
import axios from "axios";

import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { HiRefresh } from "react-icons/hi";

const EditAndPostMap = () => {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
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
    console.log(file);
    console.log(event.target.files[0]);
    console.log(imageSrc);
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
  //-----------------------------------------------------,
  //!below is reload page
  const handleReload = () => {
    window.location.reload();
  };
  //--------------------------------------------
  //!get image as a ..... from API
  const handleImage = async () => {
    try {
      const response = await fetch(hostName + "/api/v1/map/getMap");
      const data = await response.json();
      console.log(data);
      const imageSrc = data.base64;
      // const file = fileInput.current.files[0];
      // const { name, size, type } = file;

      // setName(name);
      // setType(type);
      // setSize(size);
      // setImageSrc(imageSrc);
      // setCroppedImgSrc(null);

      // console.log(file.name);
      // fileReader.current.onloadend = handleFileRead;
      // fileReader.current.readAsBinaryString(file);
    } catch (error) {
      console.error(error);
    }
  };
  //-------------
  const getImage = () => {
    fetch("http://127.0.0.1:5050/api/v1/images/getImage/map.png", {
      mode: "cors",
    })
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        const imageSrc = URL.createObjectURL(blob);
        console.log(imageSrc);
        setImageSrc(imageSrc);
        setCroppedImgSrc(null);
      });
  };
  //-----------
  useEffect(() => {
    getMapAsync();
  }, []);

  async function getMapAsync() {
    let url =
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png";
    let mapUrl = "http://127.0.0.1:5050/api/v1/images/getImage/map.png";
    let blob = await fetch(mapUrl).then((r) => r.blob());
    const imageSrc = URL.createObjectURL(blob);
    console.log(imageSrc);
    setImageSrc(imageSrc);
    setCroppedImgSrc(null);
  }
  //-------------------------------------------------------
  //!post image as a object toward API  ***
  const handleUpload = async () => {
    const deta = {
      imageBase64: croppedImgSrc,
    };
    await sentMap(deta);
    console.log(deta.imageBase64);
  };

  const sentMap = async (imageBase64) => {
    try {
      let result = await axios.post(
        hostName + "/api/v1/map/mapConvert",
        imageBase64
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------
  return (
    <div className="editAndpost_container">
      <div className="editAndpost_header">
        {/* <h2>------ Image Editor ------</h2> */}
        <div className="editAndpost_rotate">
          <div className="editAndpost_icon">
            <div className="rotate_icon_divs">
              <input
                type="file"
                accept="image/*"
                ref={fileInput}
                onChange={handleChange}
              />
            </div>
            <div className="rotate_icon_divs">
              <a
                download="croppedImage.png"
                href={croppedImgSrc}
                disabled={!croppedImgSrc}
              >
                Download
              </a>
            </div>
            <div className="rotate_icon_divs" onClick={handleLeftRotate}>
              <GrRotateLeft />
            </div>
            <div className="rotate_icon_divs" onClick={handleRightRotate}>
              <GrRotateRight />
            </div>

            <div onClick={handleReload} className="editAndpost_reset">
              <HiRefresh />
              Refresh
              <HiRefresh />
            </div>
            {/* <div onClick={handleImage} className="editAndpost_save">
              <FaCloudDownloadAlt />
              handleImage
              <FaCloudDownloadAlt />
            </div> */}
            <div onClick={getImage} className="editAndpost_save">
              <FaCloudDownloadAlt />
              getImage
              <FaCloudDownloadAlt />
            </div>
            <div onClick={handleUpload} className="editAndpost_save">
              <FaCloudUploadAlt />
              handleUpload
              <FaCloudUploadAlt />
            </div>
          </div>
        </div>
      </div>
      <div className="editAndpost_card_body">
        <div className="editAndpost_image_section">
          <Cropper
            style={{ width: "1700px", height: "800px" }}
            ref={cropper}
            src={imageSrc}
            cropend={handleCropChange}
            // aspectRatio={13 / 9}
          />
        </div>
      </div>
    </div>
  );
};

export default EditAndPostMap;
