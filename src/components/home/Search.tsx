import { useState } from "react";
import "../../font.css";

type CategoryKey = "Mother Tongue" | "Religion" | "Community" | "Nationality";
type CategoryItem = { img: string; ct: string };

const Search = () => {
  const [selectedTab, setSelectedTab] = useState<CategoryKey>("Nationality");

  const categories: Record<CategoryKey, CategoryItem[]> = {
    "Nationality": [
      { img: "/Avatar-2.png", ct: "Australia" },
      { img: "/Avatar-1.png", ct: "India" },
    
      { img: "/Avatar-3.png", ct: "Canada" },
      { img: "/Avatar-4.png", ct: "United Kingdom" },
      { img: "/Avatar-5.png", ct: "United States of America" },
      { img: "/Avatar-3.png", ct: "Netherlands" },
      { img: "/Avatar-4.png", ct: "South Africa" },
      { img: "/Avatar-5.png", ct: "New Zealand" },
      { img: "/Avatar-6.png", ct: "Singapore" },
      { img: "/Avatar-7.png", ct: "Malaysia" },
    ],
    "Mother Tongue": [
      { img: "/Avatar-1.png", ct: "Bengali" },
      { img: "/Avatar-2.png", ct: "Gujarati" },
      { img: "/Avatar-3.png", ct: "Hindi" },
      { img: "/Avatar-4.png", ct: "Kannada" },
      { img: "/Avatar-5.png", ct: "Malayalam" },
      { img: "/Avatar-6.png", ct: "Marathi" },
      { img: "/Avatar-7.png", ct: "Odia" },
      { img: "/Avatar-8.png", ct: "Punjabi" },
      { img: "/Avatar-2.png", ct: "Urdu" },
      { img: "/Avatar-4.png", ct: "English" },
    ],
    "Religion": [
      { img: "/Avatar-1.png", ct: "Hindu" },
      { img: "/Avatar-2.png", ct: "Muslim" },
      { img: "/Avatar-3.png", ct: "Christian" },
      { img: "/Avatar-4.png", ct: "Sikh" },
      { img: "/Avatar-5.png", ct: "Jain" },
      { img: "/Avatar-6.png", ct: "Buddhist" },
      { img: "/Avatar-7.png", ct: "Judaism" },
      { img: "/Avatar-8.png", ct: "Jewish" },
      { img: "/Avatar-2.png", ct: "Catholic" },
      { img: "/Avatar-7.png", ct: "Orthodox" },
    ],
    "Community": [
      { img: "/Avatar-1.png", ct: "Brahmin" },
      { img: "/Avatar-2.png", ct: "Kshatriya" },
      { img: "/Avatar-3.png", ct: "Vaishya" },
      { img: "/Avatar-4.png", ct: "Shudra" },
      { img: "/Avatar-5.png", ct: "Kayastha" },
      { img: "/Avatar-6.png", ct: "Maratha" },
      { img: "/Avatar-7.png", ct: "Shetty" },
      { img: "/Avatar-8.png", ct: "Jain" },
      { img: "/Avatar-1.png", ct: "Vaishya" },
      { img: "/Avatar-7.png", ct: "Shudra" },
    ],

  };

  return (
    <div className="w-100  bg-[#E6F2F7] ">
  <div className="relative z-0 overflow-hidden px-5 sm:px-20 container m-auto space-y-6 py-5 md:py-12">
  <img
    src="/curvesm.svg"
    alt="arw"
    className="absolute w-[48rem] -right-60 top-2 z-[-1]"
  />


        <div className="">
          <div className="flex items-center justify-between w-[100%] browse">
            <h1 className="text-h2-mobile md:text-h2-desktop  font-[Proxima-Nova-Bold]  text-[#007EAF]">
              Find Your Perfect Match
            </h1>
          </div>
          <p className="text-[#101828E5] text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]     xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1">
            Because meaningful relationships start with the right connection,   we make it easy to find someone who  truly complements your matrimonial 
            journey.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex justify-start gap-10 items-center my-10 overflow-x-auto whitespace-nowrap  ">
          {(Object.keys(categories) as CategoryKey[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`rounded-full text-nowrap text-[16px] z-50 cursor-pointer p-4 md:text-[24px] transition-colors ${selectedTab === tab
                  ? "bg-[#009BDA] text-white"
                  : "text-[#838E9E] hover:bg-[#009BDA] hover:text-white"
                }`}
              style={{
                fontFamily: "Proxima-Nova-Regular, sans-serif",
                lineHeight: "36px",
                letterSpacing: "3%",
              }}
            >
              {tab}
            </button>
          ))}
        </div>


        {/* Content Grid */}
        <div className="flex flex-col items-left gap-10">
          <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-3 ">
            {categories[selectedTab].map((item, index) => (
              <div
                key={index}
                className="flex flex-col  items-center gap-2 hover:shadow-2xl hover:rounded-xl p-2 transition-shadow"
              >
                <img
                  src={item.img}
                  alt={item.ct}
                  className="rounded-full w-24 h-24 md:w-40 md:h-40 object-cover"
                />
                <h1 className="text-center text-[18px] font-Proxima-Nova-Regular">
                  {item.ct}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;