import "../../font.css";
import { BiLogoPlayStore } from "react-icons/bi";
import{Link } from "react-router-dom";
import { FaApple } from "react-icons/fa";


const Footer = () => {

  const currentYear = new Date().getFullYear();


  return (
    <div>
      <footer>
        <div className="bg-[#2A2A2A] py-10 text-[#FFFFFF]">
          <div className="flex flex-col space-y-10">
            <div className="flex flex-col items-center justify-center space-y-10 px-4 md:flex-row md:justify-between md:space-y-0 md:px-10 ">
              <div className="w-full md:w-auto">
                <ul className="text-md flex flex-wrap items-center justify-center gap-6 md:justify-start">
                 <li><Link to="/mission">Mission</Link></li>
                 <li><Link to="/advice">Advice</Link></li>
                 <li><Link to="/help">Help</Link></li>
                  <li><Link to="/contact-us">Contact</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/faqs">FAQs</Link></li>
                  <li><Link to="/privacy-policy">Privacy</Link></li>
                  <li><Link to="/cookies-policy">Cookies Policy</Link></li>
                </ul>
              </div>

              <div className="flex w-full justify-center md:w-auto md:justify-start">
                <ul className="flex flex-col items-center gap-2 text-lg md:flex-row md:gap-4">
                  <li className="text-[#BDC1CA]">Get the App</li>
                  <li className="flex items-center gap-2">
                    <BiLogoPlayStore size={30} />
                    <FaApple size={30} />
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="h-0.5 w-[95%] rounded-full bg-[#FFFFFF80]"></div>
            </div>

            <div className="flex flex-col items-center justify-between space-y-4 px-4 md:flex-row md:space-y-0 md:px-10 ">
              <div className="text-center md:text-left">
                <h4
                  className="text-lg font-semibold italic tracking-wider text-[#FFFFFF]"
                  style={{
                    fontFamily: "Proxima-Nova-ExtraBold-Italic, sans-serif",
                  }}
                >
              Connecting Hearts Worldwide
            </h4>
                <p className="text-sm">
                This website is strictly for matrimonial purposes only and not a dating website.

</p>
              </div>
              <div className="text-center md:text-right">
                <span className="text-sm">© {currentYear} Wedlock Global Services (Australia) Pty Ltd.   All rights reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
