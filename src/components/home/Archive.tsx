import { CiHeart } from "react-icons/ci";
import '../../font.css';

const Archive = () => {
  return (
    <div>

      <div className="bg-[#009BDA] text-white md:grid grid-cols-3 font-Proxima-Nova-Bold ">
        <div className="flex flex-col achieve  items-center gap-3 text-center justify-center py-8">
          <CiHeart className="text-4xl" />
          <h1 className="md:text-[40px] text-[30px]  ">100% Verified  <br /> Member Profiles
          </h1>
          <p className="text-md md:text-lg xl:text-xl  font-Proxima-Nova-Light " >
            Digitally Verified and Genuine Community Members
          </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-3 text-center bg-[#007EAF] py-8">
          <CiHeart className="text-4xl" />
          <h1 className="md:text-[40px] text-[30px]  ">99% Member  <br /> Satisfaction</h1>
          <p className="text-md md:text-lg xl:text-xl font-Proxima-Nova-Light " >Secure, Private and Compatibility Focused </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-3 text-center  py-12">
          <CiHeart className="text-4xl" />
          <h1 className="md:text-[40px] text-[30px]  ">95% Match <br /> Accuracy</h1>
          <p className="text-md md:text-lg xl:text-xl font-Proxima-Nova-Light " >
            AI-Powered Compatibility Matching
          </p>
        </div>
      </div>
    </div>
  );
};

export default Archive;
