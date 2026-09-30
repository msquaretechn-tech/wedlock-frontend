
function Pre() {
  return (
    <div className="w-100 h-auto bg-[#E6F2F7]  ">
      <div className="  bg-[#E6F2F7] relative overflow-hidden px-5 sm:px-20  container m-auto  py-5 md:py-9">
        <img
          src="/Vector.png"
          alt="arw"
          className="absolute  w-[38rem] right-1 -top-40"
        />
        <div className="">
          <h1 className="font-Proxima-Nova-Bold text-[40px] md:text-[48px] text-[#007EAF]">
            The premier matrimony platform{" "}
          </h1>
          <p className="text-[#475467] text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]     xl:text-[28px] pt-[8px] pb-[21px]  leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1">
            Built for marriage, moderated by people.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 ">
          <div className=" flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]">
            <div className="bg-[#1EDC8B] rounded-full w-20 h-20 flex justify-center items-center">
              <img src="/lock2.png" alt="lock2" className="w-10 h-10" />
            </div>
            <h1 className="text-xl text-[#00597C] font-[Proxima-Nova-Bold]">
              Your privacy
            </h1>
            <p className="text-[#00739F] text-xl  text-center font-[Proxima-Nova-Regular] ">
              You choose what shows on your profile and who can see it. We never sell your information, and we will never call you to sell you anything.{" "}
            </p>
          </div>
          <div className=" flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]">
            <div className="bg-[#2D95BD] rounded-full w-20 h-20 flex items-center justify-center">
              <img src="/guard.png" alt="guard" className="w-10 h-10" />
            </div>
            <h1 className="text-xl font-extrabold text-[#00597C] font-[Proxima-Nova-Bold]">
              Real accounts
            </h1>
            <p className="text-[#00739F] text-xl text-center font-[Proxima-Nova-Regular]">
              Accounts confirm an email address and a mobile number. Profiles are moderated, reports are reviewed by a person, and accounts that break the Community Guidelines are removed.
            </p>
          </div>
          <div className=" flex flex-col items-center gap-3 p-5 rounded-3xl bg-[#B0D7E680]">
            <div className="bg-[#FFB42C] rounded-full w-20 h-20 flex justify-center items-center">
              <img src="/user.png" alt="user" className="w-10 h-10" />
            </div>
            <h1 className="text-xl font-extrabold text-[#00597C] font-[Proxima-Nova-Bold]">
              Matches that fit
            </h1>
            <p className="text-[#00739F] text-xl text-center font-[Proxima-Nova-Regular] ">
              Our matching combines what you tell us about faith, language, community and life goals with how you use the platform, and a person reviews the decisions that matter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pre;
