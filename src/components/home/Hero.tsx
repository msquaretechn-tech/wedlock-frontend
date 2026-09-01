import { Link } from "react-router-dom";
// import heroImg from "../../assets/bg.png";
import heroImg from "../../assets/header-bg.png";


function Hero() {
  return (
    <div
      className="relative hero_section bg-cover bg-no-repeat overflow-hidden min-h-screen 7xl:h-[100vh]   top-0 py-0   sm:py-0 3xl:h-[100vh]  xl:h-[100vh]   5xl:h-[100vh]   4xl:h-[100vh]  "
      style={{
        backgroundImage: `url(${heroImg})`,
        width: "100%",
        // Zoom effect (adjust percentage as needed)
        
      }}
    >
      <div className="absolute inset-0"></div>

      <div className="relative 3xl:pl-30 bg-opacity-40 text-white min-h-screen md:pl-16 md:flex md:px-10 gap-80 ">
        <div className="2xl:px-20 pt-[11rem] md:pt-44 pb-28 max-md:mt-0 mt-5 xl:w-full flex justify-center items-start">
          <div className="text-center container xl:w-[100%]  hero_content xl:space-y-4  md:space-y-4 ">
          
 <p
  className="md:block text-[#059cdc] text-[24px] xl:text-left leading-[1.5] md:leading-[7] xl:text-[30px] xl:pt-5 px-2 mb-[65px] md:mb-0 font-Proxima-Nova-Regular"
  style={{
    letterSpacing: "2%",
    fontWeight: "600",
    fontSize: "18px",
  }}
 >
  TRUSTED MATRIMONIAL PLATFORM FOR SERIOUS RELATIONSHIPS
</p>


            <h1 className="text-[40px] sm:text-[50px] md:text-[50px] lg:text-[60px] xl:text-left xl:text-[55px] text-[#FFFFFF] font-Proxima-Nova-Bold leading-[75px] md:leading-[80px] lg:leading-[150px] xl:leading-[120px] xl:pt-3 xl:-tracking-normal mb-[35px] md:mb-[10px]">
  <p style={{ lineHeight: "0.1" }}>Next-Gen</p>
  <p>Matchmaking</p>
</h1>

           <p
              className="md:block text-[#FFFFFF] text-[18px] xl:text-left xl:text-[23px] font-Proxima-Nova-Regular"
              style={{
                letterSpacing: "2%",
                fontWeight: "400",
              }}
            >
              Advanced AI-powered compatibility matching for
              <br>
              
              </br>
               genuine connections
            </p>

            
            <Link
  to="/questions"
  className="
    relative z-10 flex items-center justify-center
    bg-[#009BDA] rounded-full
    w-[155px] h-[45px]
    mt-6 xl:mt-[80px]
    xl:w-[175px] xl:h-[45px] xl:text-[18px]
    text-black
    mx-auto
    xl:float-left xl:justify-start xl:pl-6
    xl:font-Proxima-Nova-SemiBold
  "
  style={{marginTop: "60px"}}
>
  <span>Get Started Free</span>
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
