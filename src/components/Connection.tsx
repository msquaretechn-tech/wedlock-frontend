import React from "react";

interface ConnectionProps {
  senderImage: string;
  senderName: string;
  AcceptButton: React.ReactNode;
  RejectButton: React.ReactNode;
}

const Connection = ({
  senderImage,
  senderName,
  AcceptButton,
  RejectButton,
}: ConnectionProps) => {
  return (
    <div className="flex items-center max-md:flex-col bg-white space-y-2 space-x-4">
      
      {/* Sender Image */}
      <img
        src={senderImage}
        alt={senderName}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Sender Details */}
      <div className="flex-1 max-md:text-center">
        <h4 className="text-lg font-medium text-gray-800">{senderName}</h4>
        <p className="text-sm text-gray-500">sent you a connection request</p>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {AcceptButton}
        {RejectButton}
      </div>
    </div>
  );
};

export default Connection;
