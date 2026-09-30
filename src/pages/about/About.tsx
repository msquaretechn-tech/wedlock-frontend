import Nav from '../../components/Legal/Nav';


const About = () => {
  
  return (
    <div className="flex flex-col mt-10">
      <div className="bg-[#E6F2F7] text-center px-6 py-10 md:p-24 space-y-8">
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
          <p>
            Wedlock is an Australian matrimonial platform, built for people looking for a life partner - not a date. <br /><br />
            We started from a simple observation: the people most serious about marriage were being handed tools designed for something else entirely. Swiping is built to hold your attention. Marriage asks a different question, and it deserves a different platform.<br /><br />
            Wedlock lets you search on what actually matters to you - faith, language, community, family expectations and life goals - across cultures, nationalities and communities, whether your match is in Melbourne or on the other side of the world. Every account confirms a real email address before it can be published. Profiles and messages are moderated, and any member can report another in one tap.<br /><br />
            
            We are building Wedlock to be the platform Australian families can trust with something this important: careful with your privacy, clear about what we do with your information, and serious about the outcome our members are actually seeking.<br /><br />

            Wedlock is operated by Wedlock Global Services (Australia) Pty Ltd, ABN 36 679 422 738, from Melbourne, Victoria.

            
          </p>
        </div>
      </div>
    </div>
  );

}

export default About
