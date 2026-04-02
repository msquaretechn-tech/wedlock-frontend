import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { MdKeyboardArrowUp } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import "../../font.css";

const Footer = () => {
  const { pathname } = useLocation();
  // Determine if the footer should be hidden
  const hiddenRoutes = [
    "/verification",
    "/register",
    "/questions",
    "/login",
    "/forgot-password",
    "/discover",
    "/change-password",
    "/verification",
    "/user",
    "/register",
    "/create-password",
    "/personal",
    "/location",
    "/profile",
    "/other-details",
    "/qualification",
    "/successfully",
    "/photoupload",
    "/forgotpassword",
    "/login",
    "/verify-otp",
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-auto bg-[#2A2A2A]">
      <div className="px-6 sm:px-14 text-white space-y-8 sm:py-16 py-10 container mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Section */}
          <div className="space-y-5 lg:col-span-2">
            <div className="flex items-center">
              <img src="/newlogo.png" alt="logo" className="w-42 h-16" />
            </div>
            <p className="font-Proxima-Nova-Regular text-pretty">
              In the spirit of reconciliation, Wedlock acknowledges the
              Traditional Custodians of country throughout Australia and their
              connections to land, sea and community. We pay our respect to
              their elders past and present and extend that respect to all
              Aboriginal and Torres Strait Islander peoples today.
            </p>
          </div>

          {/* Mission Links */}
          <div>
            
           
            <ul className="font-Proxima-Nova-Regular space-y-2">
            <li>
                <Link to="/mission" className="hover:text-[#007EAF]">
                Mission
                </Link>
              </li>
              <li>
                <Link to="/advice" className="hover:text-[#007EAF]">
                  Advice
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#007EAF]">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/subscription-tiers" className="hover:text-[#007EAF]">
                  Subscription Tiers
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-[#007EAF]">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-[#007EAF]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-[#007EAF]">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us Links */}
          <div>
            
            <ul className="font-Proxima-Nova-Regular space-y-2">
            <li>
                <Link
                  to="/about-us"
                  className="hover:text-[#007EAF]"
                >
                  About Us 
                </Link>
              </li>
              <li>
                <Link
                  to="/community-guidelines"
                  className="hover:text-[#007EAF]"
                >
                  Community Guidelines
                </Link>
              </li>
             
              <li>
                <Link to="/terms-conditions" className="hover:text-[#007EAF]">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#007EAF]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies-policy" className="hover:text-[#007EAF]">
                  Cookies Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links - Now appears after Mission on tablet */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="font-Proxima-Nova-Bold text-lg mb-4">Social</h3>
            <div className="flex gap-5 text-2xl">
              <a
                href="https://www.facebook.com/profile.php?id=61569605309016"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#007EAF]"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/wedlockglobal?s=11"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#007EAF]"
              >
                <FaSquareXTwitter />
              </a>
              <a
                href="http://www.youtube.com/@Wedlock_Global"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#007EAF]"
              >
                <FaYoutube />
              </a>
              <a
                href="https://www.instagram.com/wedlock_global?igsh=MWF5NWU0M2sxeXdlMQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#007EAF]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/wedlock-global"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#007EAF]"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Divider and Back to Top */}
        <div className="flex items-center justify-between pt-4">
          <div className="rounded-full bg-[#a5a4a480] h-[2px] w-[95%]"></div>
          <button
            onClick={scrollToTop}
            className="text-white rounded-full ml-4 bg-[#007EAF] w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-2xl md:text-3xl hover:bg-[#006494] transition-colors"
            aria-label="Scroll to top"
          >
            <MdKeyboardArrowUp />
          </button>
        </div>

        {/* Copyright and Legal */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mt-6">
          <div className="font-Proxima-Nova-Regular">
            <h1 className="font-semibold text-base md:text-lg italic">
              Connecting Hearts Worldwide
            </h1>
            <p className="text-xs md:text-sm">
              This website is strictly for matrimonial purposes only and not a
              dating website.
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-xs sm:text-sm md:text-base font-Proxima-Nova-Regular">
              © {currentYear} Wedlock Global Services (Australia) Pty Ltd. All
              rights reserved.
            </p>
            <p className="text-xs sm:text-sm md:text-base font-Proxima-Nova-Regular">
              ABN: 36 679 422 738
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
