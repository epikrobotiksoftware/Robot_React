
import { useEffect, useState, useRef } from "react";
import CreateMapping from "./CreateMapping_yedek";
import "./toolbarCss.css";
import mapLayout from "../../assets/mapLayout.jpg";

import Dropzone from "react-dropzone";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const ToolBar = () => {
  const [active, setActive] = useState(null);
  const [modal, setModal] = useState(false);
  const [map_width, setMap_width] = useState(400);
  const [map_height, setMap_height] = useState(400);
const [folder, setFolder] = useState();

  //!added after
  useEffect(() => {
    const canvas = canvasRef.current;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "red";
    context.lineWidth = 5;
    contextRef.current = context;

    const mapFoto = new Image();
    // mapFoto.width = 40;
    // mapFoto.height = 40;
    // console.log("MApppppp", mapFoto.width);
    mapFoto.src = mapLayout;
    mapFoto.onload = function () {
      context.drawImage(mapFoto, 0, 0);
    };
    // const avatar = new Image();
    // avatar.src = table;
    // avatar.onload = function () {
    //   context.drawImage(avatar, 50.5, 200.5);
    // };
    // if (koor) {
    // for (let index = 0; index < koor.length; index++) {
    // console.log(koor[index].x.$numberDecimal);
    // console.log(koor[index].y.$numberDecimal);
    // const avatar = new Image();
    // avatar.src = table;
    // avatar.onload = function () {
    //         context.drawImage(
    //           avatar,
    //           koor[index].x.$numberDecimal * 20,
    //           koor[index].y.$numberDecimal * 20
    //         );
    //       };
    //     }
    //   }
    // };
  }, []);

  //! download map from api
  function getMapApi() {
    fetch("http://127.0.0.1:5050/api/v1/images/getImage")
      .then((response) => response.blob())
      .then((blob) => {
        console.log(blob);
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        // the filename you want
        a.download = "/image.jpg";
        // a.pathname = "./";
        console.log(a.pathname);
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
        console.log("burası map function");
      });
  }

  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    // contextRef.current.moveTo(40, 40);
    // contextRef.current.lineTo(500, 500);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }

    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  };

  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };
  const handleClick = (index) => {
    setActive(index);
  };
  const setToDraw = () => {
    contextRef.current.globalCompositeOperation = "source-over";
  };
  const setToErase = () => {
    contextRef.current.globalCompositeOperation = "destination-out";
  };
  const setToDontknow = () => {
    contextRef.current.globalCompositeOperation = "destination-in";
  };
  //!download current image
  const saveImageToLocal = (event) => {
    let link = event.currentTarget;
    link.setAttribute("download", "/canvas.png");
    let image = canvasRef.current.toDataURL("image/png");
    link.setAttribute("href", image);
  };
  // ~/ServiceRobot/src/assets
  //!constant structure
  const handleStart = (index) => {
    setActive(index);
    setModal(!modal);
  };
  console.log(map_width);
  console.log(map_height);
//! drop down studies
   const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0].path);
    setFolder(acceptedFiles[0].path);
     // Do something with the files
   }, []);
   const { getRootProps, getInputProps, isDragActive } = useDropzone({
     onDrop,
   });
  return (
    <>
      <nav className="mappingScreen_toolbar_container">
        <button
          className={`navbar-item ${active === 0 ? "active" : ""}`}
          onClick={() => handleStart(0)}
        >
          START
        </button>
        {modal && (
          <CreateMapping
            {...{
              setModal,
              map_width,
              setMap_width,
              map_height,
              setMap_height,
            }}
          />
        )}
        <button
          className={`navbar-item ${active === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          STOP
        </button>
        <button
          className={`navbar-item ${active === 2 ? "active" : ""}`}
          onClick={() => handleClick(2)}
        >
          SAVE
        </button>
        <button
          className={`navbar-item ${active === 3 ? "active" : ""}`}
          onClick={() => handleClick(3)}
        >
          FUTURE BUTTON
        </button>
        <button
          className={`navbar-item ${active === 4 ? "active" : ""}`}
          onClick={() => handleClick(4)}
        >
          FUTURE BUTTON
        </button>
        <button
          className={`navbar-item ${active === 5 ? "active" : ""}`}
          onClick={() => handleClick(5)}
        >
          FUTURE BUTTON
        </button>
      </nav>
      <section>
        <div>
          <canvas
            className="toolbar_canvas"
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            width={map_width}
            height={map_height}
          ></canvas>
        </div>
        <div>
          <button onClick={setToDraw}>Draw</button>
          <button onClick={setToErase}>Erase</button>
          <button onClick={setToDontknow}>Clear All</button>
          <button>
            <a
              id="download_image_link"
              href="download_link"
              onClick={saveImageToLocal}
            >
              Download current Image
            </a>
          </button>
          <button onClick={getMapApi}> Download map API</button>
        </div>
      </section>

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop some files here, or click to select files</p>
        )}
        <img src={folder} alt="" />
      </div>
    </>
  );
};

export default ToolBar;
