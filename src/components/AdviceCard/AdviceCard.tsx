import { useState } from "react";

interface AdviceCardProps {
  imageSrc: string;
  title: string;
  hoverContent: React.ReactNode;
}

const AdviceCard = ({ imageSrc, title, hoverContent }: AdviceCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative rounded-lg border-2 border-[#E6E8EC] p-4 space-y-3 transition-all duration-300 ${
        isHovered ? "shadow-2xl border-transparent" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px] xl:h-[280px]">
        <img
          src={imageSrc}
          alt="Advice"
          className="w-full h-full object-cover rounded-md transition-transform duration-300 scale-100 hover:scale-105 "
        />
      </div>
      <h1
        className="text-[#061C3D] text-lg sm:text-xl md:text-2xl font-medium"
        style={{ fontFamily: "Proxima-Nova-Regular" }}
      >
        {title}
      </h1>

      {/* Hover Content */}
      {isHovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 p-4 rounded-lg transition-opacity duration-300">
          <div className="text-[#061C3D] text-center text-sm sm:text-base md:text-lg">
            {hoverContent}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviceCard;
