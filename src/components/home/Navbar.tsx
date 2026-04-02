import React, { useState } from "react";
import { RiArrowDropDownLine, RiCloseLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import Login from "../model/Login";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import WhatsAppButton from "./Whatsapp";

const Navbar: React.FC = () => {
  const { accessToken } = useSelector((state: RootState) => state.userReducer);

  const location = useLocation(); // Use useLocation to get the current path
  const pathname = location.pathname;

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const openLogin = () => setLoginOpen(true);
  const closeLogin = () => setLoginOpen(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const isBlueBgRoute = [
    "/mission",
    "/advice",
    "/help",
    "/legal",
    "/security",
    "/faqs",
    "/contact-us",
    "/cookies-policy",
    "/community-guidelines",
    "/privacy-policy",
    "/terms-conditions",
    "/child-safety-policy",
    "/about-us",
    "/plan",
    "/services",
    "/subscription-tiers",
    "/delete-account"

  ].includes(pathname);

  const hiddenRoutes = [
    "/verification",
    "/register",
    "/questions",
    "/login",
    "/forgot-password",
    "/create-password",
    "/change-password",
    "/other-details",
    "/personal-details",
    "/test",
    "/qualification-details",
    "/location-details",
    "/photoupload",
    "/user-dashboard",
    "/verify-otp",
    "/profile",
    "/success",
    "/Payment-Success",
    "/cancel",
    "/exclusive",
  ];

  const isHiddenRoute = hiddenRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isHiddenRoute) {
    return null;
  }

  return (
    <>
      <div
        className={`absolute navbar z-50 w-full h-auto 3xl:px-32 7xl:px-32 8xl:px-32 xl:px-10 text-white ${isBlueBgRoute ? "bg-[#007eb0] h-20" : " "
          }`}
      >
        <WhatsAppButton />
        <div className={`${isBlueBgRoute ? " " : " bg-[#007eb0] "}`}></div>
        <div className="flex justify-between items-center container w-full m-auto">
          <div className="flex items-center justify-between w-full">
            <div className="text-white hidden md:flex flex-1 pt-20 lg:pt-0  justify-start ml-12">
              <ul className="flex gap-5 text-[22px] font-Proxima-Nova-SemiBold">
                <li>
                  <Link to="/mission">Mission</Link>
                </li>
                <li>
                  <Link to="/advice">Advice</Link>
                </li>
                <li>
                  <Link to="/help">Help</Link>
                </li>

              </ul>
            </div>
            <div className="flex justify-center ">
              <Link to={"/"}>
                <img
                  src="/newlogo.png"
                  alt="logo"
                  className="w-[11rem] h-[4rem] xl:w-[18rem] xl:h-[6rem]"
                />
              </Link>
            </div>
            <div className="flex gap-5 items-center justify-end flex-1 pt-2">
              {accessToken ? (
                <button className="flex items-center justify-center md:gap-3 md:text-[24px] text-white md:rounded-full rounded-3xl border-white font-bold border md:w-[170px] md:h-[69px] px-3 hidden">
                  Dashboard
                </button>
              ) : (
                <button
                  className={`flex items-center justify-center ${isBlueBgRoute ? "hidden" : "block"
                    } md:gap-3 md:text-[24px] text-white font-Proxima-Nova-SemiBold  md:rounded-full rounded-3xl border-white font-bold border md:w-[170px] md:h-[69px] px-3`}
                  onClick={openLogin}
                >
                  Login
                  <RiArrowDropDownLine className="text-5xl" />
                </button>
              )}
              <img
                src="/Aus.svg"
                alt="lang"
                className={`hidden md:block w-10 h-12`}
              />
              <button className="md:hidden text-3xl" onClick={toggleSidebar}>
                <GiHamburgerMenu />
              </button>
            </div>
          </div>
          <Login isOpen={isLoginOpen} onClose={closeLogin} />
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#007eb0] z-20 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex justify-between items-center p-4">
            <Link to={"/"}>
              <img src="/Logo.png" alt="logo" className="w-36 h-10" />
            </Link>
            <button className="text-3xl text-white" onClick={toggleSidebar}>
              <RiCloseLine />
            </button>
          </div>
          <nav className="flex flex-col p-4 text-[20px] items-center">
            <Link
              to="/mission"
              className="py-1 text-white"
              onClick={toggleSidebar}
            >
              Mission
            </Link>
            <Link
              to="/advice"
              className="py-1 text-white"
              onClick={toggleSidebar}
            >
              Advice
            </Link>
            <Link
              to="/help"
              className="py-1 text-white"
              onClick={toggleSidebar}
            >
              Help
            </Link>


            <Link to="/services" className="py-1 text-white"
              onClick={toggleSidebar}>Services</Link>


            <Link to="/subscription-tiers" className="py-1 text-white"
              onClick={toggleSidebar}>Subscription Tiers</Link>


            <Link to="/faqs" className="py-1 text-white"
              onClick={toggleSidebar}>FAQs</Link>


            <Link to="/contact-us" className="py-1 text-white"
              onClick={toggleSidebar}>Contact Us</Link>

          </nav>
        </div>

        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-10 ${isSidebarOpen ? "block" : "hidden"
            }`}
          onClick={toggleSidebar}
        ></div>
      </div>
    </>
  );
};

export default Navbar;