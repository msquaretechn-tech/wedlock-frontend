import React from "react";

interface ReligiousBackgroundProps {
  profileData: {
    religious_background?: {
      religion?: string;
      subCommunity?: string;
      community?: string;
      gotra?: string;
      dateOfBirth?: string;
      timeOfBirth?: string;
      placeOfBirth?: string;
      motherTongue?: string;
    };
  };
  isExclusive: boolean;
}

const ReligiousBackground: React.FC<ReligiousBackgroundProps> = ({ profileData, isExclusive }) => {
  const religiousInfo = [
    { label: "Religion", value: profileData?.religious_background?.religion, bg: "bg-blue-50", text: "text-blue-600" },
    { label: "Sub community", value: profileData?.religious_background?.subCommunity, bg: "bg-orange-100", text: "text-slate-900" },
    { label: "Community", value: profileData?.religious_background?.community, bg: "bg-purple-100", text: "text-violet-600" },
    { label: "Gothra / Gothram", value: profileData?.religious_background?.gotra, bg: "bg-pink-50", text: "text-pink-400" },
    { label: "Date of Birth", value: profileData?.religious_background?.dateOfBirth, bg: "bg-green-100", text: "text-green-700" },
    { label: "Time of Birth", value: profileData?.religious_background?.timeOfBirth, bg: "bg-green-100", text: "text-green-700" },
    { label: "Place of Birth", value: profileData?.religious_background?.placeOfBirth, bg: "bg-green-100", text: "text-green-700" },
    { label: "Mother Tongue", value: profileData?.religious_background?.motherTongue, bg: "bg-green-100", text: "text-green-700" },
  ];

  return (
    <div className="h-[31rem] md:h-[28rem] mb-4 xl:mb-0 rounded-xl bg-white">
      <div className="flex h-[28rem] flex-col rounded-xl bg-white pb-6 shadow-sm max-md:max-w-full">
        <div
          className={`justify-center border-b font-Proxima-Nova-Bold border-solid border-zinc-300 px-6 py-4 text-lg leading-6 tracking-wide  ${
            isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
          } max-md:max-w-full max-md:px-5 md:text-xl`}
        >
          Religious Background
        </div>
        <div className="mt-6 flex flex-col px-6 max-md:max-w-full max-md:px-5">
          {religiousInfo.map((item, index) => (
            <div key={index} className="mt-4 flex justify-between gap-4 max-md:max-w-full max-md:flex-wrap">
              <div className="text-md font-normal leading-8 tracking-wide text-slate-600 md:text-xl">
                {item.label}
              </div>
              <div className={`justify-center self-start whitespace-nowrap rounded-[100px] px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal ${item.bg} ${item.text}`}>
                {item.value || "N/A"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReligiousBackground;
