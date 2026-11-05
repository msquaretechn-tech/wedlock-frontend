import { CiHeart } from "react-icons/ci";
import '../../font.css';

const Archive = () => {
  return (
    <div>

      <div className="bg-[#009BDA] text-white md:grid grid-cols-3 font-Proxima-Nova-Bold ">
        <div className="flex flex-col achieve items-center gap-2 md:gap-3 text-center justify-center py-5 md:py-6 px-4">
          <CiHeart className="text-2xl" />
          <h1 className="text-[22px] sm:text-[26px] md:text-[30px] whitespace-nowrap">Verified sign-up</h1>
          <p className="text-[15px] sm:text-base md:text-[1.1rem] font-Proxima-Nova-Light max-w-sm">
            Email and mobile confirmed before your profile goes live.
          </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-2 md:gap-3 text-center bg-[#007EAF] py-5 md:py-6 px-4">
          <CiHeart className="text-2xl" />
          <h1 className="text-[22px] sm:text-[26px] md:text-[30px] whitespace-nowrap">Moderated by people</h1>
          <p className="text-[15px] sm:text-base md:text-[1.1rem] font-Proxima-Nova-Light max-w-sm">
            Profiles and messages are checked. Report anyone in one tap.
          </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-2 md:gap-3 text-center py-5 md:py-6 px-4">
          <CiHeart className="text-2xl" />
          <h1 className="text-[22px] sm:text-[26px] md:text-[30px] whitespace-nowrap">Matched on values</h1>
          <p className="text-[15px] sm:text-base md:text-[1.1rem] font-Proxima-Nova-Light max-w-sm">
            Faith, language, community and life goals. Not a swipe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Archive;
