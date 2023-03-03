import React, { useRef, useState, useEffect } from "react";
import axios from "axios";


function MapEditor() {
  // Haritanın görüntüsünü yöneten state
  const [mapImage, setMapImage] = useState(null);
const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;
  // Haritanın Canvas elementini tutan ref
  const mapCanvasRef = useRef(null);

  // Çizgi eklenen noktaları ve haritanın döndürülen açısını tutan veri yapısı
  const [data, setData] = useState({ points: [], angle: 0 });


 useEffect(() => {
   fetchMapImage();
   addLine();
   render_elements();
 }, []);

function render_elements(){
  const canvas = mapCanvasRef.current;
  const ctx = canvas.getContext("2d");
  const mapFoto = new Image();
    mapFoto.src = mapImage;
    mapFoto.onload = function () {
      ctx.drawImage(mapFoto, 0, 0);
}
}


  // Haritanın görüntüsünü API'den çeken fonksiyon
  function fetchMapImage() {
    axios
      // API çağrısı yapılır ve sonucu mapImage state'ine atanır
      .get(hostName + "/api/v1/ros/saveMap")
      .then((res) => {
        setMapImage(res.data.link);
        console.log(res.data.link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Haritanın Canvas elementine çizgi ekleme işlemini gerçekleştiren fonksiyon
  const addLine = (x, y) => {
    // Canvas elementine erişim
    const canvas = mapCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // Çizgi ekleme işlemi
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y + 50);
    ctx.stroke();

    // Çizgi eklenen noktayı veri yapısına ekleme
    setData((prevData) => ({
      ...prevData,
      points: [...prevData.points, { x, y }],
    }));
  };

  // Haritanın Canvas elementinden çizgi çıkarma işlemini gerçekleştiren fonksiyon
  const removeLine = (x, y) => {
    // Canvas elementine erişim
    const canvas = mapCanvasRef.current;
    const ctx = canvas.getContext("2d");

    // Çizgi üzerindeki alanı silme işlemi
    ctx.clearRect(x - 5, y - 5, 60, 60);

    // Çizgi çıkarılan noktayı veri yapısından çıkarma
    setData((prevData) => ({
      ...prevData,
      points: prevData.points.filter((point) => point.x !== x && point.y !== y),
    }));
  };

  return (
    <div>
      {/* <button onClick={fetchMapImage}></button> */}
      {/* <button onClick={handleRotate}>Rotate</button> */}
      {/* <img src={mapImage} alt="" /> */}
      {/* <div ref={mapCanvasRef} id="mapCanvasRef"></div> */}
      <canvas ref={mapCanvasRef} id="mapCanvasRef" width="900" height="600" border="red"></canvas>
    </div>
  );
}
export default MapEditor;