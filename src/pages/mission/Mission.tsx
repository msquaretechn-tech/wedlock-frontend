import MissionImg from '../../assets/Mission.jpg'

const Mission = () => {
  return (
    <div className="pt-[83.5px] ">
      <div className=" pt-5 mb-4 md:mb-0 md:pt-16 space-y-14">
        <div className=" flex flex-col md:flex-row justify-between items-center w-[79%] m-auto ">
          <h1 className="text-[#101828E5] text-5xl font-bold xl:text-7xl ">
            Redefining Matrimony,
            <br /> One Match at a Time
          </h1>
          <p className="text-[#42526B] text-md md:text-lg    md:w-[56%] py-4 w-full ">
            At Wedlock Australia, our mission is to help you find meaningful
            connections that lead to lifelong happiness. We’re committed to
            fostering a safe, respectful, and inclusive platform where users can
            explore relationships that align with their personal values,
            preferences, and cultural backgrounds. By leveraging advanced
            technology and compassionate support, we strive to redefine the
            matchmaking experience, making it easier for everyone to find
            companionship and create lasting memories. We are here to support
            you every step of the way as you embark on this important journey.
          </p>
        </div>
        <div className="w-full">
          <img
            src={MissionImg}
            alt="mission"
            className="w-full h-auto sm:h-[30rem] md:h-[35rem] lg:h-[40rem] xl:h-auto  object-center "
          />
        </div>
      </div>

      <div className="bg-[#007EAF] text-white px-4 md:px-28 lg:px-40 3xl:px-60 py-16">
        <div className="container mx-auto text-center lg:px-10">
          <h1 className="text-4xl font-bold mb-6">
            Relationships are at the core of everything we do.
          </h1>
          <p className="text-lg mb-12">
            At Wedlock Australia, relationships are more than just
            connections—they’re the heart of our mission and the foundation of
            our platform. We believe in fostering partnerships built on mutual
            respect, shared values, and long-term compatibility. Every feature
            we offer, every match we suggest, and every step of the journey is
            crafted to support you in finding a meaningful relationship that
            stands the test of time.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white  rounded-lg p-6 shadow-lg flex justify-center items-center flex-col">
              <h2 className="text-2xl font-semibold mb-4 text-[#007EAF]">
                Authenticity
              </h2>
              <p className="mb-4 text-[#42526B]">
                Wedlock values genuine connections by encouraging members to
                bring their true selves to every interaction
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg h-[350px] flex justify-center items-center flex-col">
              <h2 className="text-2xl font-semibold mb-4 text-[#007EAF]">
                Courage
              </h2>
              <p className="mb-4 text-[#42526B]">
                We honor the courage it takes to pursue a lifelong partnership,
                supporting each step with confidence.
              </p>
            </div>
            <div className="bg-white text-[#007EAF] rounded-lg p-4 sm:p-6 md:p-8 shadow-lg min-h-[300px] w-full max-w-xl mx-auto flex flex-col justify-start items-center">
  <h2 className="text-xl sm:text-2xl font-semibold mt-12 sm:mt-20 text-[#007EAF] text-center">
    Inclusivity
  </h2>
  <p className="text-[#42526B] mt-3 sm:mt-4 text-sm sm:text-base text-center px-2 sm:px-4">
    We are committed to inclusivity, creating a space where all individuals can find their perfect match, regardless of their cultural background or personal preferences.
  </p>
</div>

          </div>
        </div>
      </div>

      {/* relationship end */}

      {/* value in action  */}

      <div className="bg-[#F5F4F4] text-[#061C3D] font-lato px-4 md:px-28 lg:px-40 3xl:px-60 py-16">
        <div className="container mx-auto ">
          <h1 className="text-4xl font-bold mb-4">
            Learn More About Our Commitments{" "}
          </h1>
          <p className="text-lg mb-12">
            We are dedicated to innovation in matchmaking, fostering
            inclusivity, ensuring privacy and security, and providing dedicated
            support to create a meaningful and enriching experience for all our
            members.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center ">
            <div className="bg-white  rounded-lg p-6 shadow-lg   lg:w-[23%] lg:h-[20rem]">
              <h2 className="text-2xl font-semibold mb-4">
                Innovation in Matchmaking
              </h2>
              <p>
                We leverage cutting-edge technology and AI-driven algorithms to
                continually enhance our matchmaking process, ensuring meaningful
                connections for our members.
              </p>
            </div>
            <div className="bg-white  rounded-lg p-6 shadow-lg lg:w-[23%] lg:h-[20rem]">
              <h2 className="text-2xl font-semibold mb-4">
                Cultivating Inclusivity
              </h2>
              <p>
                We are committed to creating an inclusive platform that welcomes
                individuals from diverse backgrounds, fostering a sense of
                belonging for all users.
              </p>
            </div>
            <div className="bg-white  rounded-lg p-6 shadow-lg lg:w-[23%] lg:h-[20rem]">
              <h2 className="text-2xl font-semibold mb-4 ">
                Upholding Privacy and Security
              </h2>
              <p>
                Your privacy is our priority; we implement robust security
                measures to protect your personal information and ensure a safe
                online experience.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg lg:w-[23%] lg:h-[20rem]">
              <h2 className="text-2xl font-semibold mb-4">
                Offering Dedicated Support
              </h2>
              <p>
                Our dedicated support team is always available to assist you,
                providing guidance and assistance throughout your journey on our
                platform.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* value in action end */}

      {/* wedlock difference */}

      <div className="bg-white text-[#061C3D] py-12 px-4 md:px-28 lg:px-40 3xl:px-60 py-16">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-bold mb-4 lg:px-[5%]">
            The Wedlock Difference
          </h2>
          <p className="text-lg mb-12 text-gray-600 lg:px-[5%]">
            Our unique combination of features work together to foster long term
            genuine connections.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8  lg:px-12">
            <div className="bg-white  rounded-lg p-6 border shadow-md ">
              <h3 className="text-2xl font-semibold mb-4">Detailed Profiles</h3>
              <p className="mb-4">
                Our detailed profiles provide comprehensive insights into each
                member's personality, interests, and values, facilitating more
                meaningful connections.
              </p>
            </div>
            <div className="bg-white  rounded-lg p-6 border shadow-md ">
              <h3 className="text-2xl font-semibold mb-4">Proven Prompts</h3>
              <p className="mb-4">
                We offer proven prompts that encourage engaging conversations,
                helping users break the ice and foster genuine interactions.
              </p>
            </div>
            <div className="bg-white  rounded-lg p-6 border shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Conversation Starters
              </h3>
              <p className="mb-4">
                Our platform includes tailored conversation starters designed to
                spark interesting discussions and enhance compatibility for
                matrimony.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border shadow-md">
              <h3 className="text-2xl font-semibold mb-4">
                Matchmaking Algorithm
              </h3>
              <p className="mb-4">
                Our advanced matchmaking algorithm analyses user preferences and
                behaviours to deliver highly compatible matches, ensuring a
                personalised experience.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6 border shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Meaningful Likes</h3>
              <p className="mb-4">
                This feature allows users to express genuine interest in
                potential matches, promoting deeper connections based on shared
                values and preferences.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6  border shadow-md ">
              <h3 className="text-2xl font-semibold mb-4">Transparent Likes</h3>
              <p className="mb-4">
                Our platform ensures users are able to see who has shown
                interest in their profiles, fostering openness and trust.
              </p>
            </div>
            <div className="bg-white  rounded-lg p-6  border shadow-md">
              <h3 className="text-2xl font-semibold mb-4">Reply Reminders</h3>
              <p className="mb-4">
                Our reply reminders help keep conversations active by notifying
                users when it's time to respond, ensuring engagement and
                connection continuity.
              </p>
            </div>
            <div className="bg-white  rounded-lg p-6 border shadow-md ">
              <h3 className="text-2xl font-semibold mb-4">Smart Matches</h3>
              <p className="mb-4">
                Smart matches leverage AI technology to pair users with the most
                compatible partners, enhancing the likelihood of successful long
                term relationships.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mission;
