import { CiHeart } from "react-icons/ci";
import '../../font.css';

const Archive = () => {
  return (
    <div>

      <div className="bg-[#009BDA] text-white md:grid grid-cols-3 font-Proxima-Nova-Bold ">
        <div className="flex flex-col achieve  items-center gap-3 text-center justify-center py-6">
          <CiHeart className="text-2xl" />
          <h1 className="md:text-[30px] text-[30px] ">Email verified
          </h1>
          <p className="text-md md:text-lg text-[1.1rem] font-Proxima-Nova-Light " >
            Every account confirms a real email address before it can be published.
          </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-3 text-center bg-[#007EAF] py-6">
          <CiHeart className="text-2xl" />
          <h1 className="md:text-[30px] text-[30px]">Moderated, and easy to report</h1>
          <p className="text-md md:text-lg text-[1.1rem] font-Proxima-Nova-Light " >Profiles and messages are monitored, and any member can report another in one tap. </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-3 text-center  py-6">
          <CiHeart className="text-2xl" />
          <h1 className="md:text-[30px] text-[30px] ">Matched on what matters</h1>
          <p className="text-md md:text-lg text-[1.1rem] font-Proxima-Nova-Light " >
            Faith, language, community and life goals - the things you actually filter on, not a swipe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Archive;
