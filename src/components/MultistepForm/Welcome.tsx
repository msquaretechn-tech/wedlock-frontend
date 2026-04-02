import { useEffect, useState } from "react";

const Welcome = ({ handleNext }: { handleNext: () => void }) => {
  const [isExclusive, setExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive) {
      setExclusive(true);
    }
  });

  return (
    <div
      className={`min-w-screen relative  flex-col ${
        isExclusive ? "bg-[#60457E]" : "bg-[#007EAF]"
      } px-2 text-white md:px-28 lg:px-40 3xl:px-60`}
    >
      {/* Main Content */}
      <div className="flex mt-40 flex-col items-center justify-center text-center gap-5">
        <h1 className=" text-3xl md:text-4xl font-bold">Welcome to Wedlock</h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center">
          Congratulations! You are now one step closer to find your preferred
          partner.
        </p>

        <button
          type="button"
          className={`flex h-[48px] w-full items-center justify-center gap-2 rounded-md bg-white md:px-40 py-2 ${
            isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
          } md:w-auto xl:mt-20 md:mt-0`}
          onClick={handleNext}
        >
          Click to continue
        </button>
      </div>
    </div>
  );
};

export default Welcome;
