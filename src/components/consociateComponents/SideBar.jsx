import { NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ImUsers, ImParagraphJustify } from "react-icons/im";
import { useState, useEffect } from "react";
import { GiAutoRepair, GiPositionMarker } from "react-icons/gi";
import { AiOutlineDashboard } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SideBarmenu";
import "./sidebarCss.css";
import { useSideBarContext } from "../../contexts/SideBarMenuContext";
import { FiSettings } from "react-icons/fi";
import { FaMapMarked } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import axios from "axios";

const SideBar = ({ children }) => {
  const { isOpen, setIsOpen } = useSideBarContext();
  const navigate = useNavigate();

  const [client, setClient] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
const logout = process.env.REACT_APP_HOSTNAME_LOCAL;
  function handleLogout() {
    axios
      .get(logout+"/api/v1/users/logout")
      .then((res) => {
        console.log("token yasiyor ???");
        // localStorage.clear();
        localStorage.removeItem("token");
        console.log("token öldü ???");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const sett = () => {
    navigate("/setting");
  };

  const routes = [
    {
      path: "/",
      name: "HOME",
      icon: <AiOutlineDashboard style={{ cursor: "pointer" }} size={25} />,
    },

    {
      path: "/setup",
      name: "Setup",
      icon: <GiAutoRepair size={25} />,

      subRoutes: [
        {
          path: "/setup/PositionMarker",
          name: "Position Marker",
          icon: <GiPositionMarker size={25} />,
        },
        {
          path: "/setup/robotparameters",
          name: "Robot Parameters",
          icon: <ImParagraphJustify size={25} />,
        },
        {
          path: "/setup/mappingscreen",
          name: "Mapping Screen",
          icon: <FaMapMarked size={25} />,
        },
        {
          path: "/setup/editmap",
          name: "Edit Map",
          icon: <FaEdit size={25} />,
        },
        {
          path: "/setup/usershome",
          name: "Users",
          icon: <ImUsers size={25} />,
        },
      ],
    },
    {
      path: "/settingmainscreen",
      name: "Setting",
      icon: <FiSettings onClick={sett} size={25} />,
    },

    {
      path: "/",
      name: "Logout",
      icon: (
        <div>
          <HiOutlineLogout onClick={handleLogout} size={25} />
        </div>
      ),
    },
  ];

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  useEffect(() => {
    setClient(JSON.parse(localStorage.getItem("token")));
  }, []);

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "250px" : "60px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 20,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  {client && client.data.user.name}
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              {isOpen ? (
                <FaTimes onClick={toggle} />
              ) : (
                <FaBars onClick={toggle} />
              )}
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activestyle={{
                    borderRight: "0px solid red",
                    backGround: " #9FC1D5",
                    borderRadius: "0 50px",
                    color: "red",
                  }}
                  // activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>
        <main>{children}</main>
      </div>

      {/* <div className="icon">
        <HiOutlineLogout onClick={handleLogout} size={25} />
        logout
      </div> */}
    </>
  );
};

export default SideBar;
