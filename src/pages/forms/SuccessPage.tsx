
import { Link } from "react-router-dom";
import "../../font.css";
import { useEffect,useState } from "react";


const page = () => {

  const [isExclusive, setExclusive] = useState(false);

  useEffect(()=>{
    const isExclusive = localStorage.getItem("isExclusive");
    if(isExclusive){
      setExclusive(true)
    }
  },[])

  return (
    <div className={`flex min-h-screen flex-col items-center ${isExclusive? 'bg-[#60457E]': 'bg-[#007EAF]'}
 px-5 md:px-20 lg:px-40 3xl:px-60`}>
      <img
        src="/logowhite.png"
        alt="logo"
        className="mb-10 mt-10 h-auto w-40 md:w-36 lg:w-60"
      />

      <div className="flex flex-grow flex-col items-center justify-start text-center md:flex-grow-0 md:justify-center">
        <img
          src="/confirm.png"
          alt="verified"
          className="mb-10 mt-10 h-auto w-10 md:w-20 lg:w-20"
        />

        <div className="text-center">
          <h1
            className="mb-6 text-xl font-semibold text-[#F9F5FFE5] md:text-3xl lg:text-4xl 3xl:text-5xl"
            style={{ fontFamily: "Proxima-Nova-Bold, sans-serif" }}
          >
            Your profile created successfully
          </h1>
          <p className="md:text-md text-sm text-[#F9F5FFE5] 3xl:text-lg">
           Let Your matchmaking journey begin with us
           
          </p>
        </div>
        <div className="mb-5 mt-auto flex w-full justify-end py-8 pb-4 md:mt-0 xl:px-80 2xl:mb-4 2xl:px-0 3xl:mb-20 3xl:px-0">
          <button className={`mt-10 w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'}`}>
            <Link to="/user-dashboard"> Click here to continue</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
