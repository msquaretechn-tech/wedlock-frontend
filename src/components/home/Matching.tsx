import {FaStar} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import '../../font.css';

const Matching = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-[#DCD1E8] bg-gradient-to-bl from-[white] to-[#DCD1E8]     relative w-100   ">

            <div className="relative overflow-hidden px-5 sm:px-20   container m-auto space-y-6  py-5 md:py-12">
            <div className="bg-[url('/shadow.png')] -rotate-342 absolute w-[80rem] h-[100%]  top-0 right-0  sm:hidden hidden  "></div>
            <img
                src="/curve.png"
                alt="arw"
                className="absolute w-[50%] left-[50%] "
            
            />
            <div className=" flex   flex-col  justify-between w-full">

            <div
                className="text-[#60457E] w-100  ">
                <h1 className="font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop text-[#4E3A63] ">Exclusive
                    matchmaking</h1>
                <p className="text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]     xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1 ">
                Our Exclusive Matchmaking service is designed for exceptional individuals who prioritise meaningful, long-term relationships. Whether you're ready to find your life partner or are looking for someone who shares your vision of a future together, our approach is tailored to your unique needs.
                </p>
            </div>


            <div className="lg:flex m-auto mt-9 justify-between items-center w-full max-w-[1200px] gap-12 bg-[#60457E] rounded-3xl px-4 lg:px-12 py-5 md:py-10 opacity-95">
 
                <div className="relative  h-full flex justify-center items-center lg:w-1/2 ">
                    <div className="">
                        <img
                            src="/matching.svg"
                            alt="couple"
                            className="max-w-full max-h-full  object-contain"
                        />
                    </div>
                </div>
                <div className="space-y-10 relative  top_rating lg:w-1/2">
                  <h2 className="w-[100%] text-white pt-6 md:pt-10 sm:pt-0 text-[24px] font-Proxima-Nova-SemiBold max-md:text-[16px] text-center  lg:text-start">
                    Key Features
                  </h2>
                  <div className="space-y-2 ">
                        <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] lg:w-96 h-10 px-2 md:px-5">
                            <FaStar className="text-2xl text-yellow-400 "/>
                            <h1 className="lg:text-xl text-sm font-[Proxima-Nova-semiBold] ">Get access to Exclusive profiles</h1>
                        </div>
                        <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] lg:w-96 h-10 px-2 md:px-5">
                        <FaStar className="text-2xl text-yellow-400 "/>
                            <h1 className="lg:text-xl text-sm font-[Proxima-Nova-semiBold] ">Personalised matchmaking</h1>
                        </div>
                        <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] lg:w-96 h-10 px-2 md:px-5">
                        <FaStar className="text-2xl text-yellow-400 "/>
                            <h1 className="lg:text-xl text-sm font-[Proxima-Nova-semiBold] ">
                         Control over privacy and visibility
                         </h1>
                        </div>
                        <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] lg:w-96 h-10 px-2  md:px-5">
                        <FaStar className="text-2xl text-yellow-400 "/>
                            <h1 className="lg:text-xl text-sm font-[Proxima-Nova-semiBold] ">
                            Personality assessments
                             </h1>
                        </div>
                        <div className="flex items-center gap-5 rounded-xl bg-[#FFFFFF80] lg:w-96 h-10 px-2 md:px-5">
                        <FaStar className="text-2xl text-yellow-400 "/>
                            <h1 className="lg:text-xl text-sm font-[Proxima-Nova-semiBold] ">
                            Top-tier profile visibility
                            </h1>
                        </div>

                    </div>
                    <div className="flex items-center justify-center md:justify-between  gap-2">
                        <button
                            onClick={ ()=>{navigate("/exclusive")} }
                            className="flex items-center justify-center px-4 text-[#3C2C4C] bg-[white] rounded-full md:w-60 lg:h-16 h-10  ">
                            <p className="text-sm md:text-lg font-[Proxima-Nova-SemiBold]">Check your eligibility
                            </p>
                        </button>
                        {/* <p className="text-white text-[0.7rem] lg:text-lg cursor-pointer   ">Read more</p> */}
                    </div>
                </div>
                </div>

                </div>
            </div>
        </div>
    );
};

export default Matching;
