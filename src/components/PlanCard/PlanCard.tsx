import { MdDone } from "react-icons/md";
import { FaBan } from "react-icons/fa6";
interface PlanCardProps {
title: string;
price: string;
duration?: string;
isHighlighted?: boolean;
features: string[];
id: string;
onClick: (id: string) => void;
isDisabled?: boolean;
}
const PlanCard = ({
title,
price,
duration = "Per Month",
isHighlighted = false,
features,
id,
onClick,
isDisabled = false,
}: PlanCardProps) => {
return (
<div
className={`space-y-4 flex flex-col rounded-lg p-6 h-full ${isHighlighted ? "bg-[#60457e] text-white" : "bg-[#007EAF] shadow text-white border"
}`}
>
<div className="space-y-2">
   <h1 className={`font-semibold text-3xl ${isHighlighted ? "" : "text-white"}`}>{title}</h1>
   <h1 className={`text-3xl font-bold ${isHighlighted ? "" : "text-white"}`}>
   {price !== "Free" ? `A$${price}` : price}
    <span
      className={`text-base font-normal text-white/90 ml-1`}
      >{` / ${duration}`}
    </span>
   </h1>
   <p className="text-xs text-white/80 font-medium">Total price, including GST</p>
</div>
{/* Features Section - Flex Grow Ensures It Pushes the Button to Bottom */}
<div className="space-y-3 flex-grow">
   {features.map((feature, idx) => (
   <div key={idx} className="flex items-center gap-3">
      <div
      className={`flex h-5 w-5 items-center justify-center rounded-full ${
      isHighlighted
      ? "bg-[#F0F5FF] text-[#007EAF]"
      : "bg-[#F0F5FF] text-[#007EAF]"
      }`}
      >
      <MdDone />
   </div>
   <h1 className={isHighlighted ? "" : "text-white"}>
   {feature} 
   </h1>
</div>
))}
{/* Footer note */}
<div className="flex items-start gap-3 mt-2">
  {/* {!isHighlighted && (
    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#F0F5FF] text-[#007EAF]">
      <MdDone />
    </div>
  )} */}

  <h1
    className={`text-white italic text-sm ${
      isHighlighted ? "ml-0" : ""
    }`}
  >
    Does not renew. Ends on its own.
  </h1>
</div>
</div>

{/* Button Wrapper - Centered and Fixed at Bottom */}
<div className="mt-auto flex justify-start">
   <button
   className={`flex w-80 items-center justify-center gap-4 rounded-lg border-2 ${isDisabled
   ? "border-gray-400 bg-gray-200 text-gray-600 cursor-not-allowed"
   : "border-[#007EAF] bg-white text-[#007EAF]"
   } p-2`}
   onClick={() => !isDisabled && onClick(id)}
   disabled={isDisabled}
   >
   {isDisabled ? (
   <>
   <FaBan className="text-xl" />
   <p className="font-semibold">Purchased</p>
   </>
   ) : (
   <>
   <p className="font-semibold">Choose this plan</p>
   </>
   )}
   </button>
</div>
</div>
);
}
export default PlanCard;