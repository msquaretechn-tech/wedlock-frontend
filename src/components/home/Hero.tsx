import { Link } from "react-router-dom";
// import heroImg from "../../assets/bg.png";
import heroImg from "../../assets/header-bg.png";


function Hero() {
  return (
    <div
      className="relative hero_section bg-cover bg-no-repeat bg-black  overflow-hidden min-h-screen 7xl:h-[100vh]   top-0 py-0   sm:py-0 3xl:h-[100vh]  xl:h-[100vh]   5xl:h-[100vh]   4xl:h-[100vh]  "
      style={{
        backgroundImage: `url(${heroImg})`,
        width: "100%",
        // Zoom effect (adjust percentage as needed)
        
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative 3xl:pl-30 bg-black bg-opacity-40 text-white min-h-screen md:pl-16 md:flex md:px-10 gap-80 ">
        <div className="2xl:px-20 pt-[15rem] md:pt-44 pb-28 max-md:mt-0 mt-36 xl:w-full flex justify-center items-start">
          <div className="text-center container xl:w-[100%]  hero_content xl:space-y-4  md:space-y-4 ">
            <p
              className="hidden md:block text-[#059cdc] text-[24px] xl:text-[30px] xl:pt-5 px-2 font-Proxima-Nova-Regular"
              style={{
                lineHeight: "24px",
                letterSpacing: "2%",
                fontWeight: "600",
                textAlign: "left",
                fontSize: "22px",
              }}
            >
              TRUSTED MATRIMONIAL PLATFORM FOR SERIOUS RELATIONSHIPS
            </p>

            <h1 className="text-[3rem] sm:text-[50px] md:text-[50px] lg:text-[60px] xl:text-[60px] text-[#FFFFFF] font-Proxima-Nova-Bold leading-[48px] md:leading-[80px] lg:leading-[150px] xl:leading-[120px] xl:pt-3 xl:-tracking-normal mb-[35px] md:mb-[10px]"
            style={{
              textAlign: "left",
            }}    
            >
              Next-Gen Matchmaking
            </h1>

           <p
              className="md:block text-[#FFFFFF] pb-8 text-[18px] xl:text-[26px] leading-[1.4] xl:leading-normal xl:pt-4 px-2 font-Proxima-Nova-Regular"
              style={{
                lineHeight: "24px",
                letterSpacing: "2%",
                fontWeight: "400",
                textAlign: "left",
              }}
            >
              Advanced AI-powered compatibility matching for genuine connections
            </p>

            <Link
                to="/questions"
                className="relative z-10 flex items-center justify-center bg-[#009BDA] rounded-full
                mt-6 xl:mt-8
                xl:w-[250px] xl:h-[64px] xl:text-[22px]
                w-[145px] h-[50px]  text-white mx-auto xl:font-Proxima-Nova-SemiBold"
                style={{
                  float: "left",
                  marginTop: "35px",
                }}  
              >
                <span className="text-semibold">Get Started Free</span>
              </Link>
          </div>

          {/* mobile card in hero section 
          <div className="absolute top-[60px] right-[130px] backdrop-blur backdrop-brightness-125 rounded-3xl w-[25%] h-[73%]   border-8 border-white-2 flex items-center justify-center hidden  md:block 3xl:mr-[5%] lg:hidden" ></div>
         */}
        </div>
        {/* <div
          className="absolute  bottom-36 -right-7 sm:pt-40  md:bottom-[15rem] md:right-[4rem] xl:bottom-60   xl:right-[4rem] 2xl:rigth-[4rem]  3xl:ml-[18%]  "
          style={{ transform: "translateY(50%)" }}
        >
          <div className="hidden md:flex flex-col items-center gap-2 w-[24rem]">
            <p className="text-[18px] mt-[14rem] italic font-Proxima-Nova-Light">
              All photos are used for illustrative purposes only.
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Hero;
