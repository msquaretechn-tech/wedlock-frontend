import Nav from "../../components/Legal/Nav";

const Service = () => {
  const currentDate = new Date().toDateString();
 
  return (
    <div className="flex flex-col mt-20">
      <div className="bg-[#E6F2F7] text-center px-6 py-6 md:p-24 space-y-8">
        <h3 className="text-[#007EAF] font-semibold text-base">
          Current as of {currentDate.toLocaleString()}
        </h3>
        <h1 className=" text-2xl md:text-4xl font-semibold">Services</h1>
        <p className="text-[#475467] text-md md:text-xl text-balance">
        Wedlock is a global matchmaking platform developed to redefine the landscape of matrimony, <br /> empowering individuals to embark on their journey towards matrimony and marital bliss with confidence and ease.

        </p>
      </div>
      <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
        <div className="">
          <Nav activeSectionData={"About"} /> 
        </div>
        <div className=" flex flex-col items-start md:pr-10">
          <h2 className="font-bold text-xl pb-4 "> Wedlock Services</h2>
          <p className="pb-4">Welcome to Wedlock.au - Australia’s most trusted matrimony website and mobile app comes with the feature - Wedlock Go, that allows members to meet up to 30 minutes over video calls.</p>

          <p className="pb-4">
          Wedlock.au is becoming Australia’s fastest growing website and mobile application to provide an exceptional matchmaking experience by expanding the opportunities available to meet potential life partners from diverse communities and nationalities.
          </p>

          <p className="pb-4">
          We at Wedlock.au are committed to constantly innovating and enhancing the quality of our service to you. Based on your suggestions through the customer service desk and user research programs, we have been working on several aspects of the website, which are aimed to empower you and make your search for a life partner, fast, intuitive and easy.
          </p>

          <p className="pb-4">
          We are happy to bring to you the beginning of AI-powered e-matchmaking service - which puts you at the forefront. Using latest technologies, rich interface applications, improved algorithms, comprehensive privacy options and personal settings that can be configured to suit your preferences; we aim to put more relevance, convenience, and control into your hands.
          </p>
          <p className="pb-4" >
          <span className="font-semibold"> Download the app & take Wedlock.au </span> with you. With growing number of success stories, our matchmaking app has transformed the online matrimony category.
          </p>
          <h3 className="font-semibold text-md  pb-4">Why choose our matrimony app for your partner search?</h3>
          <ul className="list-disc pb-4 pl-4 space-y-4">
            <li>Verified & genuine profiles</li>
            <li>100% secure & trusted service</li>
            <li>One of the leading apps in the matrimony category</li>
            <li>Focused on providing detailed family information</li>
            <li>New matches daily as per your preference </li>
          </ul> 
          <p className="pb-4">We are Australia's trusted matrimony platform and our app has touched hundreds of people in Australia and in many other countries across the globe.</p>
          <p className="pb-4 font-semibold text-md">What makes us different from other matrimony and marriage apps?</p>

          <ul className="list-disc pb-4 pl-4 space-y-4">
            <li>Innovations & consumer first approach</li>
            <li>One of the most user-friendly matrimony apps</li>
            <li>Lakhs of verified bride & groom profiles</li>
            <li>Strict screening of accounts</li>
          </ul>
          <h3 className="font-bold text-lg  pb-4">Create your matrimony profile to find a better match</h3>
          <p className="pb-4">With an intuitive approach, our matchmaking app guides you smoothly through a signup process and will have you interacting with like-minded matches. By using our app, you can create a matrimony profile for yourself, your friends or family members.</p>

          <h3 className="font-bold text-lg  pb-4">Register for free & create a matrimony profile on Wedlock.au</h3>
          <ul className="list-decimal pb-4 pl-4 space-y-4">
            <li>Add additional information like hobbies/interests, family details, horoscope details, etc</li>
            <li>Search for matrimony profiles by multiple filters like religion, age, location etc</li>
            <li>Show your profile picture to only accepted members</li>
            <li>Share your contact details with preferred matrimonial profiles</li>
            <li>Connect with your matches via chat & video calls</li>
          </ul>
          <h3 className="font-bold text-lg  pb-4">Benefits of getting a premium matrimony membership</h3>
          <ul className="list-decimal pb-4 pl-4 space-y-4">
            <li>Contact your preferred matches via chat or call & get a step closer to finding your perfect partner</li>
            <li>View full matrimony profiles of matches along with their photos, phone number and email ID</li>
            <li>Get astrological details like date, time, and place of birth of connected matrimonial profiles</li>
            <li>Join daily Wedlock Go events and meet members up to 30 minutes over video call.</li>
          </ul>
          <h3 className="font-bold text-lg  pb-4">Search for matches by:</h3>
          <p className="pb-4">Location: Explore matrimony matches from your city, be it in Mumbai, Kolkata, Chennai, or Delhi. You can also connect with NRIs who are residing in the UK, USA, Canada etc.</p>
          <p className="pb-4">Religion: Find brides/grooms for marriage as per your preferred religion such as Hindu, Muslim, Christian etc.</p>
          <p className="pb-4">Communities: Search for matrimony profiles by communities like Christian, Hindu, Sikh, Reddy, Maratha and 80+ others from different religions.</p>

          <p className="pb-4">Mother Tongue: Search for your life partner as per your preferred language like Tamil, Telugu, Gujarati, Marathi etc.</p>

          <p className="pb-4">Such innovative technology has made Wedlock.au as one of the preferred matrimony apps across the world.</p>

          <p className="pb-4">Our sole objective is to provide users a exceptional matrimony search experience which leads to meeting potential life partners translating to a fulfilling & cheering relationship.</p>

          <p className="pb-4">As Australia’s trusted matrimony app which recommends right matches for you on a daily basis. Our support team also ensures that you connect with perfect profiles as per your preference.</p>

          <p className="pb-4">We are one of the trusted matrimony platforms with genuine profiles of people who are really serious about marriage.</p>

          <p>Now, it’s time for you to download our app and create your free matrimony profile.</p>
          

        </div>
      </div>
    </div>
  );
};

export default Service;
