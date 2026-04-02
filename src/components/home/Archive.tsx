import { CiHeart } from "react-icons/ci";
import '../../font.css';

const Archive = () => {
  return (
    <div>
      
    <div className="bg-[#009BDA] text-white md:grid grid-cols-3 font-Proxima-Nova-Bold ">
        <div className="flex flex-col achieve  items-center gap-3 text-center justify-center py-8">
          <CiHeart className="text-4xl" />
          <h1 className="md:text-[40px] text-[30px]  ">99% User  <br /> Satisfaction Rate</h1>
          <p className="text-md md:text-lg xl:text-lg  font-Proxima-Nova-Light " >
              Bringing People Together
          </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-3 text-center bg-[#007EAF] py-8">
          <CiHeart className="text-4xl" />
          <h1 className="md:text-[40px] text-[30px]  ">The #1 Trusted <br /> Matrimonial App</h1>
          <p className="text-md md:text-lg xl:text-lg font-Proxima-Nova-Light " >Leading the Way in Trusted Matchmaking </p>
        </div>
        <div className="flex flex-col items-center achieve justify-center gap-3 text-center  py-12">
          <CiHeart className="text-4xl" />
          <h1 className="md:text-[40px] text-[30px]  ">95% Match <br /> Accuracy</h1>
          <p className="text-md md:text-lg xl:text-lg font-Proxima-Nova-Light " >
          Personalised Communication Options to Suit Your Style
          </p>
        </div>
      </div>
    </div>
  );
};

export default Archive;
