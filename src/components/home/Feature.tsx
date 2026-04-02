import {
  PiVideoCameraDuotone,
  PiChatsDuotone,
  PiMicrophoneDuotone,
} from "react-icons/pi";

const Feature = () => {
  return (
    <div className="w-full h-auto bg-[#007EAF]">
  <div className="relative overflow-hidden px-5 sm:px-20 container mx-auto space-y-6 py-5 md:py-12">
    <img
      src="/curvewhite.svg"
      alt="arw"
      className="absolute w-[42rem] left-1 -top-10 -rotate-[128deg]"
    />

    <div className="relative space-y-6 xl:hidden block">
          <h1 className="font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop text-white">
            Connect with matches <br className="hidden xl:block" /> the way you like
          </h1>
          <p className="text-p-mobile md:text-p-desktop font-Proxima-Nova-Regular text-white">
            At Wedlock Australia, we understand that building a meaningful connection happens at your own pace.
          </p>
        </div>

    <div className="flex flex-col container lg:flex-row gap-8 justify-between">
      {/* Text and Features Column - Takes half width on lg screens */}
      <div className="w-full lg:w-1/2 space-y-6">

      <div className="relative space-y-6 xl:block hidden">
          <h1 className="font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop text-white">
            Connect with matches <br className="hidden xl:block" /> the way you like
          </h1>
          <p className="text-p-mobile md:text-p-desktop font-Proxima-Nova-Regular text-white">
            At Wedlock Australia, we understand that building a meaningful connection happens at your own pace.
          </p>
        </div>

       

        <div className="w-full">
          <div className="mt-5 flex w-full lg:max-w-lg items-center flex-col rounded-3xl bg-white bg-opacity-80 px-8 py-7 backdrop-blur-[4.6px] lg:mr-20">
            <div className="flex gap-6">
              <span className="text-4xl text-[#B249F2]">
                <PiVideoCameraDuotone />
              </span>
              <div className="flex flex-col max-md:max-w-full">
                <div className="max-w-full text-2xl text-gray-900 text-opacity-90 xl:text-3xl font-Proxima-Nova-Bold">
                  Video call
                </div>
                <div className="text-md mt-1 leading-7 text-slate-600 max-md:max-w-full lg:text-xl font-Proxima-Nova-Regular">
                  Our platform ensures a safe and private video experience, allowing you to build rapport and gauge compatibility in a more interactive way.
                </div>
              </div>
            </div>
            <div className="mt-6 h-px shrink-0 border border-solid border-[#061C3D] bg-[#061C3D] opacity-15 max-md:max-w-full" />
            <div className="mt-6 flex gap-6">
              <span className="text-4xl text-[#008435]">
                <PiChatsDuotone />
              </span>
              <div className="flex flex-col max-md:max-w-full">
                <div className="text-2xl text-gray-900 text-opacity-90 max-md:max-w-full md:leading-7 xl:text-3xl font-Proxima-Nova-Bold">
                  Message
                </div>
                <div className="text-md mt-1 leading-7 text-slate-600 max-md:max-w-full lg:text-xl font-Proxima-Nova-Regular">
                  Begin your conversations comfortably with our instant messaging feature, designed for natural, meaningful exchanges at your pace.
                </div>
              </div>
            </div>
            <div className="mt-6 h-px shrink-0 border border-solid border-[#061C3D] bg-[#061C3D] opacity-15 max-md:max-w-full" />
            <div className="mt-6 flex gap-6">
              <span className="text-4xl text-[#007EAF]">
                <PiMicrophoneDuotone />
              </span>
              <div className="flex flex-col max-md:max-w-full">
                <div className="text-2xl text-gray-900 text-opacity-90 max-md:max-w-full xl:text-3xl font-Proxima-Nova-Bold">
                  Voice call
                </div>
                <div className="text-md mt-1 leading-7 text-slate-600 max-md:max-w-full lg:text-xl font-Proxima-Nova-Regular">
                  Our voice call feature gives you the opportunity to connect more intimately and engage in conversations that feel authentic.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Column - Takes half width on lg screens */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <img
          src="/main.svg"
          alt="Main visual"
          className="w-full h-auto object-contain max-h-[64rem] lg:max-h-[50rem] xl:max-h-[56rem]"
        />
      </div>
    </div>
  </div>
</div>
  );
};

export default Feature;