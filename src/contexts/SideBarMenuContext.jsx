import { createContext, useContext } from 'react';
import { useState } from 'react';

// 1
export const SideBarContext = createContext();

// 3
export const useSideBarContext = () => {
  return useContext(SideBarContext);
};

// 2
const SideBarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

    


  const values = {
    isOpen,
    setIsOpen,
   
  };

  return <SideBarContext.Provider value={values}>
    {children}
    </SideBarContext.Provider>;
};

export default SideBarProvider;