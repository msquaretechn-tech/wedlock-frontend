import Hero from "../../components/Legal/Hero";
import Nav from "../../components/Legal/Nav";


const page = () => {

  const HeroData = {
    updatedAt: `Last Updated On: 29 September 2026`,
    title: "Cookies Policy",
    description:
      "Your trust, your privacy and your data matter to us, and we want to be clear about how we use them.",
  };

  return (
    <div className="flex flex-col ">
      <Hero {...HeroData} />
      <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-4">
        <div className="">
          <Nav activeSectionData={"COOKIES POLICY"} />
        </div>
        <div className="">
          <h1 className=" font-bold text-md pb-4 text-xl ">Cookies Policy</h1>
          <p className="pb-4">
            Your trust, your privacy and your data matter to us, and we want to
            be clear about how we use them. This policy explains the cookies and
            similar technologies we use on the Wedlock website and in the
            Wedlock app, and how you can control them. Please read it together
            with our Privacy Policy.
          </p>

          <h3 className="text-md font-bold pb-4">1. What cookies are</h3>
          <p className="pb-4">
            A cookie is a small piece of text stored on your computer or mobile
            device by your browser. Cookies let a website recognise your device
            and remember things between pages and visits — for example, that you
            are signed in.
          </p>
          <p className="pb-4">
            Similar technologies include web beacons (small files that record
            that content has been opened), tracking URLs, and software
            development kits, which work like cookies inside an app. In this
            policy we call all of these “cookies”.
          </p>

          <h3 className="text-md font-bold pb-4">2. The cookies we use</h3>
          <p className="pb-4">
            We currently use strictly necessary cookies only. These are the
            cookies the website and app cannot work without. They are set
            because of something you have asked for — signing in, filling in a
            form, making a payment, or setting a preference — and they cannot be
            switched off in our systems without the service breaking.
          </p>
          <p className="pb-4">
            We do not currently use analytics cookies, advertising cookies,
            social media cookies or any third-party tracking. If that changes,
            we will update this policy and ask for your consent before setting
            anything that is not strictly necessary.
          </p>

          <h3 className="text-md font-bold pb-4">3. How long cookies last</h3>
          <p className="pb-4">
            <span className="font-semibold">Session cookies</span> last only as
            long as your visit and are deleted when you close your browser.
          </p>
          <p className="pb-4">
            <span className="font-semibold">Persistent cookies</span> stay on
            your device after you close your browser, so we can remember a
            setting from one visit to the next. The table above shows how long
            each one lasts.
          </p>

          <h3 className="text-md font-bold pb-4">4. How to control cookies</h3>
          <p className="pb-4">
            You can control or delete cookies through your browser settings. The
            help pages for Chrome, Safari, Firefox and Edge all explain how.
          </p>
          <p className="pb-4">
            In the Wedlock app you can manage your preferences under Settings{" "}
            {`>`} Privacy.
          </p>
          <p className="pb-4">
            Because we only use strictly necessary cookies, blocking them will
            stop parts of the website or app from working — you may not be able
            to stay signed in, for example.
          </p>
          <p className="pb-4">
            If you would like to know more about cookies generally,{" "}
            <a
              className="underline"
              href="https://www.allaboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              allaboutcookies.org
            </a>{" "}
            is a useful independent guide.
          </p>

          <h3 className="text-md font-bold pb-4">5. Changes to this policy</h3>
          <p className="pb-4">
            We may update this Cookies Policy. When we do, we will publish the
            new version here with a version number, an effective date and a
            short note on what changed.
          </p>

          <p className='text-md font-bold'>Effective date</p>
          <p className="pb-4">Version 2.0 · Effective 11th October 2026</p>
        </div>
      </div>
    </div>
  );
};

export default page;
