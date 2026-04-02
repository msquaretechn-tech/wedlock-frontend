import Nav from '../../components/Legal/Nav';

const About = () => {
  const currentDate = new Date().toDateString();
   
  return (
    <div className="flex flex-col mt-20">
      <div className="bg-[#E6F2F7] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#007EAF] font-semibold text-base">
         Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">About</h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
        Premier and most trusted matrimony service recognised for its unwavering commitment to helping individuals find their perfect life partners.

        </p>
      </div>
      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"About"} /> 
        </div>
        <div className=" flex flex-col items-start md:pr-10">
          <h2 className="font-bold text-xl pb-4 "> About us</h2>
          <p>Wedlock is introduced in 2024, and is becoming Australia’s fastest growing mobile application and website to provide an exceptional matchmaking experience by expanding the opportunities available to meet potential life partners from diverse communities and nationalities. Our aim is to create a world-renowned matchmaking service that is capable to touch the lives of millions of people all over the world. Wedlock is built based on thorough research and analysis, protecting user privacy & security and providing simple, fun and easy to navigate features, to introduce our users to most advanced AI based matchmaking service.</p>
          

        </div>
      </div>
    </div>
  );
  
}

export default About
