import React from 'react'
import Header from "../components/consociateComponents/Header";
import SideBar from "../components/consociateComponents/SideBar";
import { useSideBarContext } from '../contexts/SideBarMenuContext';
import editmap from "./editMapCss.module.css";

import EditAndPostMap from '../components/editMapComponent/EditAndPostMap';
// import Main from '../components/editMapComponent/Main';
// import ZZZSandbox from '../components/editMapComponent/ZZZSandbox';
// import CropEasy from '../components/editMapComponent/crop/CropEasy';
// import MainFileBased from '../components/editMapComponent/MainFileBased';
// import ZArslan from '../components/editMapComponent/ZArslan';
// import ZChatImageEditor from '../components/editMapComponent/ZChatImageEditor';
// import ZSandboxDeneme from "../components/editMapComponent/ZSandboxDeneme";
const EditMap = () => {
    const { isOpen } = useSideBarContext();


  return (
    <div>
      <Header />
      <SideBar />
      <div
        className={
          isOpen ? editmap["side-bar-Open"] : editmap["side-bar-close"]
        }
      >
        <EditAndPostMap />
        {/* <Main /> */}
        {/* <MainFileBased/> */}
        {/* <ZArslan/> */}
        {/* <ZChatImageEditor/> */}
        {/* <CropEasy/> */}
        {/* <ZZZSandbox/> */}
        {/* <ZSandboxDeneme/> */}
      </div>
    </div>
  );
}

export default EditMap