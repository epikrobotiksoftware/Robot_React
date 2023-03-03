import React, { useState } from "react";

const ImageToBase64 = () => {
  const [base64Image, setBase64Image] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      setBase64Image(reader.result);
      console.log(base64Image);
    };
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      {base64Image && <img src={base64Image} alt="Converted to base64" />}
    </div>
  );
};

export default ImageToBase64;
