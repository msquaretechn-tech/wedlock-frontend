import Nav from '../../components/Legal/Nav';

const About = () => {
  const currentDate = new Date().toDateString();

  return (
    <div className="flex flex-col mt-20">
      <div className="bg-[#E6F2F7] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#007EAF] font-semibold text-base">
          Last Updated On : 1st September 2026
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">About Us</h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
          Premier and most trusted matrimony service recognised for its unwavering commitment to helping individuals find their perfect life partners.

        </p>
      </div>
      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"About"} />
        </div>
        <div className=" flex flex-col items-start md:pr-10">
          {/* <h2 className="font-bold text-xl pb-4 "> About Us</h2> */}
          <p>Founded in 2026, Wedlock.com.au is rapidly emerging as one of Australia’s fastest-growing matrimonial and matchmaking platforms across web and mobile. Designed for individuals seeking meaningful, long-term relationships, Wedlock expands opportunities to connect with compatible life partners across diverse communities, cultures, and nationalities. <br />


            <br />Built on extensive research, intelligent technology, and a privacy-first approach, Wedlock delivers a secure, sophisticated, and easy-to-use matchmaking experience. Our advanced AI-powered compatibility system analyses multiple relationship factors to create smarter, more meaningful matches tailored to each individual. <br />

            <br /> At Wedlock, our vision is to build a globally trusted matchmaking platform capable of positively transforming millions of lives worldwide - combining authenticity, innovation, security, and human connection in one premium experience.</p>


        </div>
      </div>
    </div>
  );

}

export default About
