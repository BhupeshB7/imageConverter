import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
  FaHome,
  FaInfoCircle,
  FaImage,
  FaFileImage,
  FaCompressArrowsAlt,
  FaLink,
} from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { RiExchangeFundsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import logo from "../../assets/B.png";

const footerIcons = [
  {
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/bhupesh-kumar-35011224b",
  },
  {
    icon: <FaEnvelope />,
    link: "mailto:bhupeshkr2912@gmail.com",
  },
  {
    icon: <FaInstagram />,
    link: "https://www.instagram.com/bhupeshb7?igsh=ODVvMWd0bmQ0ZG10",
  },
  {
    icon: <FaTwitter />,
    link: "https://x.com/Bhupeshb7?t=F49fYUEO8Wj5I-jPaXL6CQ&s=09",
  },
  {
    icon: <FaWhatsapp />,
    link: "https://wa.me/918581869783",
  },
];

const Footer = () => {
  const handleIconClick = (link) => {
    if (link.startsWith("https://wa.me")) {
      window.open(link, "_blank");
    } else {
      window.location.href = link;
    }
  };

  return (
    <footer className="bg-[#101010] py-8 mt-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex items-center justify-center">
            <RiExchangeFundsFill size={50} className="text-amber-200" />
          </div>
          <div>
            <h6 className="text-white text-lg mb-2">Quick Links</h6>
            <div className="flex flex-col space-y-2">
              <a href="/" className="text-gray-400 flex items-center">
                <FaHome className="mr-2" /> Home
              </a>
              <a href="/contact" className="text-gray-400 flex items-center">
                <FaEnvelope className="mr-2" /> Contact Us
              </a>
              <a href="/about" className="text-gray-400 flex items-center">
                <FaInfoCircle className="mr-2" /> About Us
              </a>
              <a href="/about" className="text-gray-400 flex items-center">
                <MdFeedback className="mr-2" /> FeedBack
              </a>
            </div>
          </div>
          {/* part-3 */}
          <div>
            <h6 className="text-white text-lg mb-2">Products Links</h6>
            <div className="flex flex-col space-y-2">
              <Link to="/jpg-to-png" className="text-gray-400 flex items-center">
                <FaImage className="mr-2" /> JPG to PNG
              </Link>
              <Link to="/png-to-jpg" className="text-gray-400 flex items-center">
                <FaFileImage className="mr-2" /> PNG to JPG
              </Link>
              <Link to="/url-to-image" className="text-gray-400 flex items-center">
                <FaCompressArrowsAlt className="mr-2" /> Image Resize
              </Link>
              <Link to="/url-to-image" className="text-gray-400 flex items-center">
                <FaLink className="mr-2" /> URL to Image
              </Link>
            </div>
          </div>
          {/* part-4 */}
          <div>
            <h6 className="text-white text-lg mb-2">Contact Us</h6>
            <p className="text-gray-400 text-sm">Email: support@gmail.com</p>
            <p className="text-gray-400 text-sm">
              Phone:{" "}
              <a href="tel:+1234567890" className="text-gray-400">
                +123 456 7890
              </a>
            </p>
            <div className="flex mt-4 space-x-4">
              {footerIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  className="text-gray-400 text-xl"
                  onClick={() => handleIconClick(item.link)}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bhupesh Kumar.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
