import React from "react";
import { CiMap } from "react-icons/ci";
import { IoLanguage } from "react-icons/io5";
import { FaSmoking, FaWineGlassAlt } from "react-icons/fa";

type PersonalBackgroundProps = {
  profileData: {
    personal_background: {
      height: string;
      weight: string;
      bodyType: string;
      language: string;
      smokingHabbit: string;
      drinkingHabbit: string;
      diet: string;
      complexion: string;
    };
  };
  isExclusive: boolean;
};

const PersonalBackground: React.FC<PersonalBackgroundProps> = ({ profileData, isExclusive }) => {
  const textColor = isExclusive ? "text-[#60457E]" : "text-[#007EAF]";

  const attributes = [
    { label: "Height", value: profileData.personal_background.height, icon: <CiMap /> },
    { label: "Weight", value: profileData.personal_background.weight, icon: <CiMap /> },
    { label: "Body Type", value: profileData.personal_background.bodyType, icon: <CiMap /> },
    { label: "Language", value: profileData.personal_background.language, icon: <IoLanguage /> },
    { label: "Smoking Habits", value: profileData.personal_background.smokingHabbit, icon: <FaSmoking /> },
    { label: "Drinking Habits", value: profileData.personal_background.drinkingHabbit, icon: <FaWineGlassAlt /> },
    { label: "Diet", value: profileData.personal_background.diet, icon: <CiMap /> },
    { label: "Complexion", value: profileData.personal_background.complexion, icon: <CiMap /> },
  ];

  return (
    <div className="row-span-3 lg:row-span-3 mb-4 xl:mb-0 rounded-xl bg-white">
      <div className="flex flex-col rounded-xl bg-white pb-6 shadow-sm">
        <div className={`justify-center border-b font-Proxima-Nova-Bold border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide ${textColor} max-md:px-5 md:text-xl`}>
          Personal Background
        </div>
        <div className="mt-6 flex flex-col px-6 gap-4 max-md:px-5">
          {attributes.map((attr, index) => (
            <div key={index}>
              <div className="flex items-center gap-1 whitespace-nowrap">
                <div className={`text-xl leading-8 ${textColor} md:text-3xl`}>{attr.icon}</div>
                <div className="text-lg leading-8 text-slate-600 md:text-xl">{attr.label}</div>
              </div>
              <div className="text-md ml-8 mt-2 justify-center self-start rounded-[100px] bg-blue-50 px-3 py-1.5 text-center font-medium capitalize leading-7 text-cyan-600 max-md:ml-2.5 md:text-xl">
                {attr.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalBackground;