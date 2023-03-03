import "./zymapCss.css";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import table from "../../assets/table_image1.png";

function ImageModificationComponent() {
  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  //   const contextRef = useRef(null);
  const [koor, setKoor] = useState([]);
  const [imageData, setImageData] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
 const [isDrawing, setIsDrawing] = useState(false);

   const canvasRef = useRef(null);
   
  useEffect(() => {
    getTable();
    getMapApi();
    first_render();
  }, [imageData]);

  function first_render() {
    const canvas = canvasRef.current;
    console.log(canvas);

    const context = canvas.getContext("2d");
    const mapFoto = new Image();
    mapFoto.src = imageData;
    mapFoto.onload = function () {
      context.drawImage(mapFoto, 0, 200);
   
      if (koor) {
        for (let index = 0; index < koor.length; index++) {
          console.log(koor[index].x.$numberDecimal);
          console.log(koor[index].y.$numberDecimal);
          const avatar = new Image();
          avatar.src = table;

          avatar.onload = function () {
            context.drawImage(
              avatar,
              koor[index].x.$numberDecimal,
              koor[index].y.$numberDecimal
            );
          };
        }
      }
     }  
  }

  function getTable() {
    axios
      .get(hostName+"/api/v1/ros/positionMarker")
      .then((res) => {
        setKoor(res.data.data.Position);
        console.log(res.data.data);
       


      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getMapApi() {
    axios
      .get(hostName+"/api/v1/map/getMap")
      .then((res) => {
        setImageData(res.data.link);
        console.log(res);
        
       
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function startDrawing({nativeEvent}) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = nativeEvent;
    ctx.current.beginPath();
    ctx.current.moveTo(offsetX, offsetY);
    ctx.current.lineTo(offsetX, offsetY);
    // contextRef.current.moveTo(40, 40);
    // contextRef.current.lineTo(500, 500);
    ctx.current.stroke();
    // setIsDrawing(true);
    nativeEvent.preventDefault();

    // setDrawing(true);
    // setCurrentLine([event.clientX, event.clientY]);

    // ctx.beginPath();
    // ctx.moveTo(event.clientX, event.clientY);
  }
  
 const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
    const { offsetX, offsetY } = nativeEvent;
    ctx.current.lineTo(offsetX, offsetY);
    ctx.current.stroke();
    nativeEvent.preventDefault();
  };

 const setToDraw = () => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
   ctx.current.globalCompositeOperation = "source-over";
 };
 
  
  function continueDrawing(event) {
    if (!drawing) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    setCurrentLine([...currentLine, event.clientX, event.clientY]);

    ctx.lineTo(event.clientX, event.clientY);
    ctx.stroke();
  }

  function stopDrawing() {
    setDrawing(false);
    setCurrentLine(null);
  }

  function addIcon(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const icon = new Image();
    icon.src = "/path/to/icon.png";
    icon.onload = () => {
      ctx.drawImage(icon, event.clientX, event.clientY, 50, 50);
    };
  }

  function removeIcon(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(event.clientX, event.clientY, 50, 50);
  }

  function rotateIcon(event) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.translate(event.clientX + 25, event.clientY + 25);
    ctx.rotate(Math.PI / 2);
    ctx.translate(-event.clientX - 25, -event.clientY - 25);
  }

  function saveCanvas() {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    const file = new Blob([dataURL], { type: "image/png" });
    saveAs(file, "image.png");
  }

  function postImage() {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL();
    const body = { image: dataURL };

    fetch("/api/upload-image", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div className="canvas_container">
      <canvas
        className="canvas"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        width={800}
        height={600}
      ></canvas>
      <div className="button_container">
        <button className="canvas_buttons" onClick={setToDraw}>
          Draw
        </button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
        <button className="canvas_buttons">add</button>
      </div>
    </div>
  );
}
export default ImageModificationComponent;
