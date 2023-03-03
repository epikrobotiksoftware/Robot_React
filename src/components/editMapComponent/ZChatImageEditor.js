import React, { useState, useEffect } from "react";

function ZChatImageEditor() {
  const [photoUrl, setPhotoUrl] = useState("");
  const [rotatedPhotoUrl, setRotatedPhotoUrl] = useState("");
  const [croppedPhotoUrl, setCroppedPhotoUrl] = useState("");
  const [rotateAngle, setRotateAngle] = useState(0);
  const [crop, setCrop] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const hostName = process.env.REACT_APP_HOSTNAME_LOCAL;

  useEffect(() => {
    // API'den fotoğraf alınması
    const fetchData = async () => {
      const response = await fetch(hostName + "/api/v1/map/getMap");
      const data = await response.json();
      setPhotoUrl(data.link);
    };
    fetchData();
  }, []);

  const handleRotate = () => {
    // Fotoğrafın döndürülmesi
    setRotateAngle(rotateAngle - 10);
    setRotatedPhotoUrl(photoUrl);
    console.log(rotatedPhotoUrl);
  };

  const handleCrop = () => {
    // Fotoğrafın kırpılması
    setCrop({ x: 100, y: 100, width: 200, height: 200 }); 
    setCroppedPhotoUrl(photoUrl);
    console.log(croppedPhotoUrl);
  };

  const handleSave = () => {
    // Son halin API'ye gönderilmesi
    const formData = new FormData();
    formData.append("rotate", rotateAngle);
    formData.append("cropped", crop);
    // formData.append("crop", JSON.stringify(crop));

    fetch(hostName + "/api/v1/map/test", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
      console.log(formData);
  };

  return (
    <div>
      {photoUrl && (
        <div>
          <img
            src={photoUrl}
            alt="Photo"
            style={{ transform: `rotate(${rotateAngle}deg)` }}
          />
          <button onClick={handleRotate}>Rotate</button>
          <button onClick={handleCrop}>Crop</button>
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default ZChatImageEditor;
