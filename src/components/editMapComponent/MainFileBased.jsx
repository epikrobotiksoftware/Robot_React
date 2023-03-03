import React, { useEffect, useState } from "react";
import "./style/main.scss";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { GrRotateLeft, GrRotateRight } from "react-icons/gr";
import { CgMergeVertical, CgMergeHorizontal } from "react-icons/cg";
import { IoMdUndo, IoMdRedo, IoIosImage } from "react-icons/io";
import { AiOutlineUpload } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { TfiReload } from "react-icons/tfi";

import storeData from "./LinkedList";
import axios from "axios";
const Main = () => {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  // const filterElement = [
  //   {
  //     name: "brightness",
  //     maxValue: 200,
  //   },
  //   {
  //     name: "grayscale",
  //     maxValue: 200,
  //   },
  //   {
  //     name: "sepia",
  //     maxValue: 200,
  //   },
  //   {
  //     name: "saturate",
  //     maxValue: 200,
  //   },
  //   {
  //     name: "contrast",
  //     maxValue: 200,
  //   },
  //   {
  //     name: "hueRotate",
  //   },
  // ];
  const [property, setProperty] = useState({
    name: "brightness",
    maxValue: 200,
  });
  const [details, setDetails] = useState("");
  const [crop, setCrop] = useState("");
  const [state, setState] = useState({
    image: "",
    brightness: 100,
    grayscale: 0,
    sepia: 0,
    saturate: 100,
    contrast: 100,
    hueRotate: 0,
    rotate: 0,
    vartical: 1,
    horizental: 1,
  });
  const [image, setImage] = useState(null);
  //-----------------------------------------------------,
  //!post file toward API
  const handlePostFile = (event) => {
    setImage(event.target.files[0]);
    console.log(event.target.files);
  };

  const handleUploadAPI = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("userImage", image);

    axios
      .post("http://127.0.0.1:5050/api/v1/images/uploadImage", formData)
      .then((response) => {
        console.log(response.data.link);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //------------------------------------------------------------,
  //!below is reload page
  const reload = () => {
    window.location.reload();
  };
  //--------------------------------------------
  //!below is  belong page
  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const leftRotate = () => {
    setState({
      ...state,
      rotate: state.rotate - 5,
    });

    const stateData = state;
    stateData.rotate = state.rotate - 5;
    storeData.insert(stateData);
  };
  useEffect(() => {
    console.log(details);
    console.log(state);
  }, [details, state]);

  const rightRotate = () => {
    setState({
      ...state,
      rotate: state.rotate + 5,
    });
    const stateData = state;
    stateData.rotate = state.rotate + 5;
    storeData.insert(stateData);
  };
  const varticalFlip = () => {
    setState({
      ...state,
      vartical: state.vartical === 1 ? -1 : 1,
    });
    const stateData = state;
    stateData.vartical = state.vartical === 1 ? -1 : 1;
    storeData.insert(stateData);
  };

  const horizentalFlip = () => {
    setState({
      ...state,
      horizental: state.horizental === 1 ? -1 : 1,
    });
    const stateData = state;
    stateData.horizental = state.horizental === 1 ? -1 : 1;
    storeData.insert(stateData);
  };

  const redo = () => {
    const data = storeData.redoEdit();
    if (data) {
      setState(data);
    }
  };
  const undo = () => {
    const data = storeData.undoEdit();
    if (data) {
      setState(data);
    }
  };
  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();

      reader.onload = () => {
        console.log(reader.result);
        setState({
          ...state,
          image: reader.result,
        });
        const stateData = {
          image: reader.result,
          brightness: 100,
          grayscale: 0,
          sepia: 0,
          saturate: 100,
          contrast: 100,
          hueRotate: 0,
          rotate: 0,
          vartical: 1,
          horizental: 1,
        };
        storeData.insert(stateData);
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const imageCrop = () => {
    const canvas = document.createElement("canvas");
    const scaleX = details.naturalWidth / details.width;
    const scaleY = details.naturalHeight / details.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Url = canvas.toDataURL("image/jpg");

    setState({
      ...state,
      image: base64Url,
    });
  };
  const downloadLocal = async () => {
    console.log(details);
    const canvas = document.createElement("canvas");
    canvas.width = details.naturalHeight;
    canvas.height = details.naturalHeight;
    const ctx = canvas.getContext("2d");

    ctx.filter = `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`;

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((state.rotate * Math.PI) / 180);
    ctx.scale(state.vartical, state.horizental);

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    );

    const link = document.createElement("a");
    link.download = "image_edit" + Date.now();
    link.href = canvas.toDataURL("image/jpg");
    console.log(link);
    link.click();
  };

  return (
    // <div className="image_editor">
    <div className="card">
      <div className="card_header">
        {/* <h2>------ Image Editor ------</h2> */}
        <div className="rotate">
          {/* <label htmlFor="">Rotate & Filp</label> */}
          <div className="icon">
            <div onClick={leftRotate}>
              <GrRotateLeft />
            </div>
            <div onClick={rightRotate}>
              <GrRotateRight />
            </div>
            <div onClick={varticalFlip}>
              <CgMergeVertical />
            </div>
            <div onClick={horizentalFlip}>
              <CgMergeHorizontal />
            </div>

            <div onClick={reload} className="reset">
              Reset
              <TfiReload />
            </div>
            <div onClick={downloadLocal} className="save">
              Download Local
              <FiSave />
            </div>
            <form onSubmit={handleUploadAPI} style={{ display: "flex" }}>
              <div>
                <input type="file" onChange={handlePostFile} />
              </div>
              <div>
                <button type="submit">Upload API</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="card_body">
        <div className="image_section">
          <div className="image">
            {state.image ? (
              <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                <img
                  onLoad={(e) => setDetails(e.currentTarget)}
                  style={{
                    filter: `brightness(${state.brightness}%) brightness(${state.brightness}%) sepia(${state.sepia}%) saturate(${state.saturate}%) contrast(${state.contrast}%) grayscale(${state.grayscale}%) hue-rotate(${state.hueRotate}deg)`,
                    transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
                  }}
                  src={state.image}
                  alt=""
                  crossOrigin="anonymous"
                />
              </ReactCrop>
            ) : (
              <label htmlFor="choose">
                <IoIosImage />
                <span>Choose Image</span>
              </label>
            )}
          </div>
          <div className="image_select">
            <button onClick={undo} className="undo">
              <IoMdUndo />
            </button>
            <button onClick={redo} className="redo">
              <IoMdRedo />
            </button>
            {crop && (
              <button onClick={imageCrop} className="crop">
                Crop Image
              </button>
            )}
            <label htmlFor="choose">Choose Image</label>
            <input onChange={imageHandle} type="file" id="choose" />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Main;
