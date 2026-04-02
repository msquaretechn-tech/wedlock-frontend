import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const WhatsAppButton: React.FC = () => {
    const phoneNumber = "+61478648984"; // Replace with your WhatsApp number
    const message = "Hello! I would like to know more about your services."; // Optional pre-filled message

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
    )}`;

    return (
        <Link
            to={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-5 right-5 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110 z-5"
        >
            <FaWhatsapp size={35} />
        </Link>
    );
};

export default WhatsAppButton;
