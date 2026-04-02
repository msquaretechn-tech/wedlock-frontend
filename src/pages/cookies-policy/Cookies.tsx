
import Hero from "../../components/Legal/Hero";
import Nav from "../../components/Legal/Nav";
import { Link } from "react-router-dom";


const page = () => {
  const currentDate = new Date().toDateString();
  const HeroData = {
    updatedAt: `Current as of ${currentDate.toLocaleString()}`,
    title: "Cookies Policy",
    description:
      "Your trust, privacy and data are important to us and we are committed to being transparent about our data practices and how we use and protect your data",
  };

  return (
    <div className="flex flex-col ">
      <Hero {...HeroData} />
      <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-16">
        <div className="">
          <Nav activeSectionData={"COOKIES POLICY"} />
        </div>
        <div className="">
            <p className="pb-4">
            Cookies Policy Your trust, privacy and data are important to us and
            we are committed to being transparent about our data practices and
            how we use and protect your data. We use cookies and similar
            technologies when you use the Wedlock mobile application (including
            the desktop version) (“App”) or websites (such as Wedlock.au)
            (“Websites”). This policy provides more detail about the cookies and
            tracking technologies we use and should be read in conjunction with
            our Privacy Policy and the information available in our “Manage
            Cookies” section (linked at the bottom of our Websites) or in your
            profile settings in our App (under “Settings” {">"} “Security &
            Privacy” {">"} “Privacy Settings” on iOS and Android) where you can
            adjust your cookie settings at any time.
          </p>
          <p className="pb-4">This Cookie Policy explains what cookies are and how we use them.</p>
          <h3 className="text-md font-bold">
            {" "}
            1. What are 'cookies' and which 'cookies' does Wedlock use?
          </h3>
          <p className="pb-4">
            {" "}
            We collect information by placing cookies on your computer or mobile
            device. A cookie is a piece of text containing a unique identifier,
            which is stored on your computer by your web browser or by your
            mobile device. They are basically a tool that stores information
            about App use and Websites’ visits. Cookies also allow us to
            recognise you and your preferences each time you visit Wedlock. They
            ensure the functioning of the App and Websites which in turn allows
            us to provide the services that our members request and to improve
            your user experience.
          </p>

          <p className="pb-4">
            {" "}
            We may also use other technologies such as web beacons (also called
            pixels), tracking URLs and software development kits (SDKs) for
            similar purposes as cookies. Web beacons are files that contain a
            unique identifier that enable us to recognise when someone has
            accessed content on our Websites. Tracking URLs are unique links
            that help us understand where visitors to our Websites are coming
            from. SDKs are small pieces of code included in applications, which
            function like cookies and web beacons. For simplicity, in this
            Policy we also refer to these technologies as “Cookies”.
          </p>
          
          <h3 className="text-md font-bold">What the types of Cookies?</h3>
          <p className="pb-4">These Cookies are necessary for the App and Websites to function and cannot be switched off in our systems, or our App and Websites will not work properly. They are usually only set in response to actions made by you which amount to a request of services, such as setting your privacy preferences, logging in or filling in forms, making payments, uploading photographs, chatting or to localise your experience, such as when you’ve requested to view Wedlock’s Site in your local language or when you’ve asked Wedlock to ‘remember me’, etc. You can always control the Websites’ strictly necessary Cookies in your browser, as explained below.</p>

          <h3 className="text-md font-bold">Strictly necessary Cookies</h3>
          <p className="pb-4">We also use Cookies to help keep Wedlock and our members safe and secure. These Cookies do things like protect Wedlock users from spam and fraud by ensuring the safety of your personal data when you pay for things on Wedlock like Wedlock’s premium services.</p>
          <p>help us to prevent phishers, scammers, unauthorised login attempts to your account and accessing any hacked accounts.</p>
          <p className="pb-4">Some of these strictly necessary Cookies are third parties’, as some social media platforms can be used as an entry point to register for our services.</p>
          <p className="pb-4">These Cookies allow us to collect information about how visitors interact with our App and Websites. We use this information to compile reports and to help measure and improve the performance of the App and Websites.</p>
          <h3 className="text-md font-bold">Analytics Cookies</h3>
          <p className="pb-4">Wedlock uses Google Analytics to collect information about how visitors use the Wedlock Site. We use the information to compile reports and to help us improve the Site or App. The Cookies collect information in an aggregated form, including the number of visitors to the Site or App, where visitors have come to the Site from and the pages they visited.</p>
          <p className="pb-4">These Cookies allow us to collect information about how visitors interact with our App and Websites. We use this information to compile reports and to help measure and improve the performance of the App and Websites.</p>

          <h3 className="text-md font-bold pb-4">Social Media Cookies</h3>
          <p className="pb-4">These Cookies help provide experiences, such as links to other social media Websites and social plugins, including making it easier for you to share content between Wedlock and your other favorite social networks.</p>
          <p className="pb-4">In some cases, the Site feature you choose may allow a third party to place Cookies on your device.</p>

          <h3 className="text-md font-bold pb-4">Advertising Cookies</h3>
          <p className="pb-4">These   Cookies may be set on our Websites and App by us or our advertising partners.   They may be used to build a profile of your interests and show you relevant   adverts on our App and Websites or other Websites you visit, as well as to   improve reporting on any advertising campaign and to avoid showing you ads   that you have already seen.</p>
          
          <h3 className="text-md font-bold pb-4">
            2. Cookies lifespan and third parties placing Cookies
          </h3>
          <p>
            Cookies last for different periods of time depending on which of the
            following two categories they fall into:
          </p>

          <ul className="list-disc pl-4">
            <li>
              Session cookies – these cookies only last as long as your online
              session, and expire when you close your browser (for example
              Internet Explorer or Safari).
            </li>
            <li>
              Persistent cookies – these cookies stay on your device after your
              browser has been closed. These cookies are used when we need to
              remember you for more than one browsing session, for instance to
              remember your preferences from one visit to the next.
            </li>
          </ul>
          <p>
            If you would like to obtain more information about the third parties
            placing Cookies on our Websites and App (including a link to their
            privacy practices) and their lifespan you can access this
            information:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              in your profile settings for the Wedlock App (under “Settings”{" "}
              {`>`} “Security & Privacy” {`>`} “Privacy Settings” on iOS or
              under “Advertising Preferences” on Android); and
            </li>
            <li>
              in the “Manage Cookies” section linked at the bottom of our
              Websites.
            </li> 
          </ul>
          <h3 className="text-md font-bold pb-4">3. How can you refuse or withdraw consent to the use of Cookies?</h3>
          <p className="pb-4">When using our Websites, you are in control and may refuse to accept Cookies at any time by managing your preferences in the “Manage Cookies” section (linked at the bottom of our Websites) or by altering the settings on your internet browser (for example Internet Explorer, Chrome and Firefox).</p>
          <p className="pb-4">If you would like to know more about Cookies and how to refuse Cookies, the following websites provide useful information:</p>
          <ul className="list-disc pl-4 underline pb-4">
            <li><Link to={"https://www.allaboutcookies.org"}>https://www.allaboutcookies.org</Link></li>
            <li><Link to={"https://www.youronlinechoices.eu"}>www.youronlinechoices.eu</Link></li>
            <li><Link to={"http://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html"}>http://helpx.adobe.com/flash-player/kb/disable-local-shared-objects-flash.html</Link></li>
          </ul>
          <p className="pb-4">When using our App,When using our App,you are also in control and may refuse to accept Cookies at any time by managing your Privacy Preferences in your Profile in the App (under “Settings” {`>`} “Security & Privacy” {`>`} “Privacy Settings” on iOS and Android).</p>
          <p>Please note that if you choose not to permit Cookies some areas of our Websites or App may not function properly or be accessible.</p>
        </div>
      </div>
    </div>
  );
};

export default page;
