import React, { useState, useRef } from "react";
import mapLayout from "../../assets/my_map.png";
const ZmapRotate = () => {
  const [degree, setDegree] = useState(0);

  const handleLeftClick = () => {
    setDegree((prevDegree) => prevDegree - 10);
  };

  const handleRightClick = () => {
    setDegree((prevDegree) => prevDegree + 10);
  };


  return (
    <div>
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
      <div style={{ transform: `rotate(${degree}deg)` }}>
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png"
          alt="Rotated"
        />
      </div>
    </div>
  );
};

export default ZmapRotate;

//!aişağısı MouseMove ile çalışıyor
// import React, { useState, useRef } from "react";
// import mapLayout from "../../assets/my_map.png";
// const ZmapRotate = () => {
//   const [degree, setDegree] = useState(0);
//   const wrapperRef = useRef(null);

//   const handleMouseMove = (event) => {
//     const { clientX, clientY } = event;
//     const { top, left, width, height } =
//       wrapperRef.current.getBoundingClientRect();
//     const centerX = left + width / 2;
//     const centerY = top + height / 2;
//     const radian = Math.atan2(clientY - centerY, clientX - centerX);
//     const angle = (radian * 180) / Math.PI;
//     setDegree(angle);
//   };

//   return (
//     <div ref={wrapperRef} onMouseMove={handleMouseMove}>
//       <div style={{ transform: `rotate(${degree}deg)` }}>
//         <img src={mapLayout} alt="rotate" />
//       </div>
//     </div>
//   );
// };

// export default ZmapRotate;
