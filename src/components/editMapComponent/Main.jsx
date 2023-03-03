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
  //-------------------------------------------
  useEffect(() => {
    getImage();
  }, []);
  //!below is get  map as a link from API, for edit  *
  // let ali ="";
  // const getImage = async () => {
  //   try {
  //     console.log("before await");
  //     const response = await fetch(hostName + "/api/v1/map/getMap");
  //     const data = await response.json();
  //     ali=data.base64
  //     // console.log(data);
  //     // setFirstGet(data.base64);
  //     // console.log(ali);
  //     //---------------
  //     // setState({
  //     //   ...state,
  //     //   image: data.link,
  //     // });
  //     //--------------------------
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setState({
  //         ...state,
  //         image: ali,
  //       });
  //       console.log("aliveli");
  //       const stateData = {
  //         image: ali,
  //         brightness: 100,
  //         grayscale: 0,
  //         sepia: 0,
  //         saturate: 100,
  //         contrast: 100,
  //         hueRotate: 0,
  //         rotate: 0,
  //         vartical: 1,
  //         horizental: 1,
  //       };
  //       storeData.insert(stateData);
  //     };
  //     // reader.readAsDataURL(data); // okuma işlemini başlat
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //-----------------------------------------
  // console.log(firstGet);
  // console.log(state.image);
  const getImage = async () => {
    try {
      const response = await fetch(hostName + "/api/v1/map/getMap");
      const data = await response.json();
      console.log(data);
      setState({
        ...state,
        image: data.base64,
      });
      depoData()
      //---------------
      // setState({
      //   ...state,
      //   image: data.link,
      // });
      //--------------------------
    } catch (error) {
      console.error(error);
    }
  };
  console.log(state.image);
  
  const depoData=()=>{
    const stateData = {
      image: state.image,
      rotate: 0,
      brightness: 100,
      grayscale: 0,
      sepia: 0,
      saturate: 100,
      contrast: 100,
      hueRotate: 0,
      vartical: 1,
      horizental: 1,
    };
    console.log(stateData.image);
    storeData.insert(stateData);

  }
  //! axios ile get process
  // function getMapApi() {
  //   axios
  //     .get("YOUR_API_END_POINT")
  //     .then((res) => {
  //       setImageData(res.data.link);
  //       setState({
  //         ...state,
  //         image: res.data.link,
  //       });
  //       console.log(res.data.link);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  // console.log(state.image);
  //-----------------------------------------------------
  //!post object toward API  ***
  //below upload image button
  const handleUpload = async () => {
    const deta = {
      imageBase64: state.image,
      rotationValue: state.rotate,
    };
    await sentMap(deta);
  };
console.log(state.rotate);
  const sentMap = async (imageBase64) => {
    try {
      let result = await axios.post(
        hostName + "/api/v1/map/mapConvert",
        imageBase64,
        {}
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------
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
    // canvas.width = 200;

    canvas.height = crop.height;
    // canvas.height = 200;

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
  const saveImage = async () => {
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

    const base64Url = canvas.toDataURL("image/jpg");
    console.log(base64Url);
    setState({
      ...state,
      image: base64Url,
    });
    await handleUpload();

    const link = document.createElement("a");
    link.download = "image_edit" + Date.now();
    link.href = canvas.toDataURL("image/png");
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
            {/* <div onClick={getMapApi}>
              Map Image
              <AiOutlineDownload />
            </div> */}
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
            <div onClick={saveImage} className="save">
              Save Image
              <FiSave />
            </div>
            <div onClick={handleUpload} className="save">
              Upload Image
              <AiOutlineUpload />
            </div>
            {/* <form onSubmit={handleSubmit} style={{ display: "flex" }}>
              <div>
                <input type="file" onChange={handlePostFile} />
              </div>
              <div>
                <button type="submit">Upload</button>
              </div>
            </form> */}
          </div>
        </div>
      </div>
      <div className="card_body">
        {/* <div className="card_body_sidebar">
            <div className="side_body">
              <div className="filter_section">
                <span>Filters</span>
                <div className="filter_key">
                  {filterElement.map((v, i) => (
                    <button
                      className={property.name === v.name ? "active" : ""}
                      onClick={() => setProperty(v)}
                      key={i}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="filter_slider">
                <div className="label_bar">
                  <label htmlFor="range">Rotate</label>
                  <span>100%</span>
                </div>
                <input
                  name={property.name}
                  onChange={inputHandle}
                  value={state[property.name]}
                  max={property.maxValue}
                  type="range"
                />
              </div>
            </div>
          </div> */}
        <div className="image_section">
          <div
            className="image"
            style={{
              transform: `rotate(${state.rotate}deg) scale(${state.vartical},${state.horizental})`,
            }}
          >
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
            {/* <label htmlFor="choose">Choose Image</label>
            <input onChange={imageHandle} type="file" id="choose" /> */}
            <button onClick={getImage} className="crop">
              Get Image
            </button>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Main;
