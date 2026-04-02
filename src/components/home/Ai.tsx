
import Aicard from './Aicard';

const Ai = () => {
  return (
    <div className="w-full   bg-[#009BDA] overflow-hidden " >
      <div className="relative overflow-hidden px-5 sm:px-20  container m-auto space-y-6  pt-5 md:pt-12">
        <img
          src="/curvewhite.svg"
          alt="Curve"
          className="absolute w-[40rem] rotate-12 -right-10 -top-32"
        />
        <div className="relative  space-y-20 md:space-y-28 text-white ">
          <div className="relative  space-y-6">
            <h1
              className=" font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop "
            >
              Smarter connections with <br className='block max-md:hidden text-pretty' />AI-Powered match suggestions
            </h1>
            <p className="text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]  xl:text-[28px] pt-[16px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1">
              Match recommendations to suit your preferences and interests. Our AI-powered algorithm ensures you connect with the right people.
            </p>

            <img
              src="/thunder.svg"
              alt="Thunder"
              className="absolute md:top-0 top-[-2.5rem] right-0 w-16 md:w-auto lg:block hidden"
            />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-[#D3D3D380] mt-0 md:mt-20 lg:mt-0  border-[#FFFFFF] border rounded-t-3xl   lg:w-[55rem] md:h-[28.5rem] h-[28rem] lg:h-[37.5rem] xl:h-[38.5rem]  relative mx-auto">
              <div className="relative  md:bottom-44 lg:bottom-10   bottom-14  max-md:left-7 md:h-[40rem]   left-12 h-[44rem] w-[85%] lg:left-40 md:w-[85%] xl:h-[41rem]">
                <Aicard
                  name="Utkarsh Sinha"
                  description="Hi, I’m Utkarsh Sinha, a software developer based in Melbourne. I’ve joined Wedlock Australia to find a meaningful and lasting relationship. Outside of work, I love traveling, cooking, and staying active with fitness. I’m looking for a partner who values open communication, kindness, and the journey of growing together through life’s adventures. I believe that cultural harmony and mutual respect are the foundations of a strong and happy relationship.
"
                  imageSrc="/utkarsh.svg"
                />
              </div>


              <div className="absolute top-1/6  right-[1.4rem] top-6 md:-top-20   lg:top-20 lg:right-5 w-32 md:w-60  lg:w-80">
                <img
                  src="/recomended.png"
                  alt="Recommended"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Ai;
