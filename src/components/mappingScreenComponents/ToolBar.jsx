// import CreateMapping from "./CreateMapping";
// // import "./toolbarCss.css";
// import React, { useState } from "react";

// import { RiPauseFill } from "react-icons/ri";
// import { VscDebugContinue } from "react-icons/vsc";
// import { AiFillSave } from "react-icons/ai";
// import { MdOutlineNotStarted } from "react-icons/md";
// import { FaRegStopCircle } from "react-icons/fa";

// const ToolBar = () => {
//   const [active, setActive] = useState(null);
//   const [playpause, setPlaypause] = useState(true);
//   const [isAllowed, setIsAllowed] = useState(false);
//   const [modal, setModal] = useState(false);
//   const [area_width, setArea_width] = useState(333);
//   const [area_height, setArea_height] = useState(333);

//   const handleStart = (index) => {
//     setActive(index);
//     setModal(true);
//   };
//   const handlePause = (index) => {
//     setActive(index);
//     setPlaypause(!playpause);
//   };
//   const handleClick = (index) => {
//     setActive(index);
//   };
//   const handleSave = (index) => {
//     setActive(index);
//      setIsAllowed(!isAllowed);
//   };

//   return (
//     <>
//       <nav className="mappingScreen_toolbar_container">
//         <button
//           className={`navbar-item ${active === 0 ? "active" : ""}`}
//           onClick={() => handleStart(0)}
//         >
//           START
//           <MdOutlineNotStarted className="toolbar_icons" size={25} />
//         </button>
//         {modal && (
//           <CreateMapping
//             {...{
//               isAllowed,
//               setIsAllowed,
//               modal,
//               setModal,
//               area_width,
//               setArea_width,
//               area_height,
//               setArea_height,
//             }}
//           />
//         )}
//         {playpause && (
//           <button
//             className={`navbar-item_pause ${
//               active === 1 ? "active_pause" : ""
//             }`}
//             onClick={() => handlePause(1)}
//             disabled={!isAllowed}
//           >
//             PAUSE
//             <RiPauseFill className="toolbar_icons" size={25} />
//           </button>
//         )}
//         {!playpause && (
//           <button
//             className={`navbar-item ${active === 1 ? "active" : ""}`}
//             onClick={() => handlePause(1)}
//             disabled={!isAllowed}
//           >
//             RESUME
//             <VscDebugContinue className="toolbar_icons" size={20} />
//           </button>
//         )}

//         <button
//           className={`navbar-item ${active === 2 ? "active" : ""}`}
//           onClick={() => handleClick(2)}
//           disabled={!isAllowed}
//         >
//           STOP
//           <FaRegStopCircle className="toolbar_icons" size={25} />
//         </button>

//         <button
//           className={`navbar-item ${active === 3 ? "active" : ""}`}
//           onClick={() => handleSave(3)}
//           disabled={!isAllowed}
//         >
//           SAVE
//           <AiFillSave className="toolbar_icons" size={25} />
//         </button>
//         <button
//           className={`navbar-item ${active === 4 ? "active" : ""}`}
//           onClick={() => handleClick(4)}
//         >
//           FUTURE BUTTON
//         </button>
//         <button
//           className={`navbar-item ${active === 5 ? "active" : ""}`}
//           onClick={() => handleClick(5)}
//         >
//           FUTURE BUTTON
//         </button>
//         <button
//           className={`navbar-item ${active === 6 ? "active" : ""}`}
//           onClick={() => handleClick(6)}
//         >
//           FUTURE BUTTON
//         </button>
//       </nav>
//     </>
//   );
// };

// export default ToolBar;
