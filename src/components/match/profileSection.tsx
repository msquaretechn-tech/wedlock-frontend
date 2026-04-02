import React from "react";

interface ProfileSectionProps {
    title: string;
    data: Record<string, string | undefined>;
    isExclusive?: boolean;
    fieldColors?: Record<string, string>;
    icons?: Record<string, React.ReactNode>;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    title,
    data,
    isExclusive = false,
    fieldColors = {},
    icons = {},
}) => {
    return (
        <div className="h-auto py-4 rounded-xl mb-4 xl:mb-0 bg-white">
            <div
                className={`justify-center border-b border-solid font-Proxima-Nova-Bold border-zinc-300 px-6 py-1 text-lg leading-6 tracking-wide  ${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                    } max-md:max-w-full max-md:px-5 md:text-xl`}
            >
                {title}
            </div>
            <div className="mt-2 flex flex-col px-6 max-md:max-w-full max-md:px-5">
                {Object.entries(data).map(([key, value]) => (
                    <div key={key} className="mt-4 flex justify-between gap-0 max-md:flex-wrap">
                        <div className="text-md flex-1 font-normal leading-8 tracking-wide text-slate-600 md:text-xl flex  items-center gap-2">
                            {icons[key] && <span className={`${isExclusive ? "text-[#60457E]" : "text-[#007EAF]"
                                }`}>{icons[key]}</span>}
                            {key.split(/(?=[A-Z])/).join(" ")} {/* Converts camelCase to readable text */}
                        </div>
                        <div
                            className={`justify-center self-start rounded-[100px] px-3 py-1.5 text-center text-base font-medium capitalize leading-4 tracking-normal ${fieldColors[key] || "bg-blue-50 text-blue-600"
                                }`}
                        >
                            {value || "Not Specified"}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileSection;
