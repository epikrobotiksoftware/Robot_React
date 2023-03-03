import "../../components/systemSettingComponents/SystemSetting.css";
import React, { useState } from "react";
import CreatePositionChangePassword from "./CreatePositionChangePassword";
import { PositionContext } from "../../contexts/PositionContext";

const ChangePassword = () => {
const [isOverlayShown, setisoverlayShown] = useState(false);
const [Password, setPassword] = useState(0);
const [NewPassword, setNewPassword] = useState(0);
const [ConfirmPassword, setConfirmPassword] = useState(0);

const data = {
  Password,
  setPassword,
  NewPassword,
  setNewPassword,
  ConfirmPassword,
  setConfirmPassword,
  setisoverlayShown,
};
const onEdit = (record) => {
  setisoverlayShown(true);
};

 
 return (
<PositionContext.Provider value={data}>
  <div>
    <header>
      <button className="butonchangepassword" onClick={onEdit}>Change Password</button>
      {isOverlayShown && <CreatePositionChangePassword></CreatePositionChangePassword>}
    </header>
  </div>
</PositionContext.Provider>
  );
};
export default ChangePassword;
