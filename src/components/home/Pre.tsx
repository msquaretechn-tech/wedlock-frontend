
function Pre() {
  return (
    <div className="w-100 h-auto bg-[#E6F2F7]  ">
      <div className="  bg-[#E6F2F7] relative overflow-hidden px-5 sm:px-20  container m-auto space-y-6  py-5 md:py-12">
        <img
          src="/Vector.png"
          alt="arw"
          className="absolute  w-[38rem] right-1 -top-40"
        />
        <div className=" ">
          <h1 className="text-[#007EAF]  font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop">
            The premier matrimony platform{" "}
          </h1>
          <p className="text-[#475467] text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]     xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1">
            Trusted matchmaking, delivered by our professional team.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          <div className=" flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]">
            <div className="bg-[#1EDC8B] rounded-full w-20 h-20 flex justify-center items-center">
              <img src="/lock2.png" alt="lock2" className="w-10 h-10" />
            </div>
            <h1 className="text-xl text-[#00597C] font-[Proxima-Nova-Bold]">
              100% Privacy
            </h1>
            <p className="text-[#00739F] text-xl  text-center font-[Proxima-Nova-Regular] ">
              Wedlock leads the way in trusted compatibility and guarantees your
              privacy ensuring that you connect with confidence.{" "}
            </p>
          </div>
          <div className=" flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]">
            <div className="bg-[#2D95BD] rounded-full w-20 h-20 flex items-center justify-center">
              <img src="/guard.png" alt="guard" className="w-10 h-10" />
            </div>
            <h1 className="text-xl font-extrabold text-[#00597C] font-[Proxima-Nova-Bold]">
              Verified Profiles
            </h1>
            <p className="text-[#00739F] text-xl text-center font-[Proxima-Nova-Regular]">
              All profiles are thoroughly vetted by our team to ensure you only
              connect with genuine individuals.
            </p>
          </div>
          <div className=" flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]">
            <div className="bg-[#FFB42C] rounded-full w-20 h-20 flex justify-center items-center">
              <img src="/user.png" alt="user" className="w-10 h-10" />
            </div>
            <h1 className="text-xl font-extrabold text-[#00597C] font-[Proxima-Nova-Bold]">
              Best Matches
            </h1>
            <p className="text-[#00739F] text-xl text-center font-[Proxima-Nova-Regular] ">
              Our AI technology and human-centric approach work together to
              deliver tailored suggestions based on your values, lifestyle, and
              relationship goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pre;
