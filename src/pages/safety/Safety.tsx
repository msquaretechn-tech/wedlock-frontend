import Hero from "../../components/Legal/Hero";
import Nav from "../../components/Legal/Nav";


const Safety = () => {

  const HeroData = {
    updatedAt: `Last Updated On: 29 September 2026`,
    title: "Safety",
    description:
      "Most people on Wedlock are exactly who they say they are. This page is for the times when something does not feel right — what to do, what we do, and where to get help.",
  };

  return (
    <div className="flex flex-col ">
      <Hero {...HeroData} />
      <div className="flex flex-col md:flex-row flex-grow gap-5 p-4 md:p-4">
        <div className="">
          <Nav activeSectionData={"SAFETY"} />
        </div>
        <div className="">
          <h1 className=" font-bold text-md pb-4 text-xl ">Staying safe on Wedlock</h1>
          <p className="pb-4">
            Most people on Wedlock are exactly who they say they are and are
            here for the same reason you are. This page is for the times when
            something does not feel right — what to do, what we do, and where to
            get help.
          </p>

          <h3 className="text-md font-bold pb-4">In an emergency</h3>
          <p className="pb-4 font-semibold">
            If you are in immediate danger, call 000.
          </p>
          <p className="pb-4">
            If you are not in immediate danger but need to talk to someone:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              <span className="font-semibold">1800RESPECT</span> — family
              violence and sexual assault — 1800 737 732, open 24 hours
            </li>
            <li>
              <span className="font-semibold">Lifeline</span> — crisis support —
              13 11 14, open 24 hours
            </li>
            <li>
              <span className="font-semibold">Scamwatch</span> — report a scam —{" "}
              <a
                className="underline"
                href="https://www.scamwatch.gov.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                scamwatch.gov.au
              </a>
            </li>
            <li>
              <span className="font-semibold">eSafety Commissioner</span> —
              image-based abuse and online harm —{" "}
              <a
                className="underline"
                href="https://www.esafety.gov.au"
                target="_blank"
                rel="noopener noreferrer"
              >
                esafety.gov.au
              </a>
            </li>
          </ul>

          <h3 className="text-md font-bold pb-4">Reporting someone</h3>
          <p className="pb-4">
            You can report any member from their profile or from your
            conversation with them. Tap the menu in the top corner and choose
            Report. Tell us what happened in your own words — you do not need to
            have screenshots, though they help.
          </p>
          <p className="pb-4">What happens next:</p>
          <ul className="list-decimal pl-4 pb-4">
            <li>We acknowledge your report within 1 business day.</li>
            <li>
              A moderator reviews it. Reports involving safety are prioritised.
            </li>
            <li>
              We decide what action to take — that may be removing content,
              warning the member, restricting their account, or removing them
              from Wedlock.
            </li>
            <li>We tell you the outcome.</li>
          </ul>
          <p className="pb-4">
            You can report someone whether or not you have matched with them,
            and whether or not you have spoken. Reporting is confidential — the
            person you report is not told who reported them.
          </p>

          <h3 className="text-md font-bold pb-4">Blocking someone</h3>
          <p className="pb-4">
            Blocking is immediate and does not wait for us. A blocked member
            cannot see your profile, message you or appear in your matches, and
            you will not see theirs. You can block from a profile or from a
            conversation, and you do not have to report someone in order to
            block them.
          </p>

          <h3 className="text-md font-bold pb-4">Signs of a romance scam</h3>
          <p className="pb-4">
            Romance scams are the single most common harm on matrimonial and
            dating platforms, and they follow a pattern. Be careful if someone:
          </p>
          <ul className="list-disc pl-4 pb-4">
            <li>
              moves the conversation off Wedlock very quickly — to WhatsApp,
              Telegram or email;
            </li>
            <li>
              professes strong feelings unusually early, often within days;
            </li>
            <li>
              always has a reason not to video call, or the call is very short
              and poor quality;
            </li>
            <li>
              says they are working overseas, on a rig, on deployment, or
              otherwise unreachable in person;
            </li>
            <li>
              asks for money — for a flight, a medical bill, a customs charge, a
              business emergency;
            </li>
            <li>
              asks you to receive or forward money, parcels or cryptocurrency
              for them; or
            </li>
            <li>asks for photographs you would not want anyone else to see.</li>
          </ul>
          <p className="pb-4">
            No genuine member of Wedlock will ever ask you for money. If someone
            does, stop replying, block them, and report them to us. If you have
            already sent money, contact your bank immediately and report it to
            Scamwatch — acting in the first few hours makes a real difference.
          </p>

          <h3 className="text-md font-bold pb-4">Before you meet in person</h3>
          <ul className="list-disc pl-4 pb-4">
            <li>
              Video call first. It is the single most effective check that
              someone is who they say they are.
            </li>
            <li>
              Meet somewhere public, in daylight, for the first few times.
            </li>
            <li>
              Tell a family member or a friend where you are going, who you are
              meeting, and when you expect to be back.
            </li>
            <li>Arrange your own transport there and back.</li>
            <li>Keep your phone charged.</li>
            <li>
              If a family member is involved in your search, as many of our
              members’ families are, include them — that is a strength, not a
              loss of privacy.
            </li>
            <li>
              If anything feels wrong, leave. You do not owe anyone an
              explanation.
            </li>
          </ul>

          <h3 className="text-md font-bold pb-4">Protecting your information</h3>
          <ul className="list-disc pl-4 pb-4">
            <li>
              Do not put your phone number, email address, home address or
              workplace on your profile.
            </li>
            <li>
              Be careful with photographs that show your street, your car
              registration or your children’s school.
            </li>
            <li>
              Never share bank details, card numbers or copies of identity
              documents with another member. Wedlock will never ask you for these
              either.
            </li>
            <li>
              Use a strong, unique password. Turn on the one-time passcode when
              we offer it.
            </li>
          </ul>

          <h3 className="text-md font-bold pb-4">What we do</h3>
          <p className="pb-4">
            We use automated systems and human moderators to review accounts and
            messages for content that breaches our Community Guidelines. Every
            account confirms an email address and a mobile number before it can
            be published. Accounts that break the Guidelines are removed, and we
            cooperate with law enforcement where a criminal investigation
            requires it.
          </p>
          <p className="pb-4">
            We keep a record of every report we receive, who reviewed it, what
            was decided and when.
          </p>
          <p className="pb-4">
            We do not conduct criminal background checks on members. No platform
            can, reliably — and we would rather tell you that than let you rely
            on a check that does not exist.
          </p>

          <h3 className="text-md font-bold pb-4">If you think we got it wrong</h3>
          <p className="pb-4">
            If we have taken action on your account or your content and you
            believe it was a mistake, email info@wedlock.com.au. We will
            acknowledge within 1 business day and give you a decision within 10
            business days.
          </p>

          <h3 className="text-md font-bold pb-4">Anyone under 18</h3>
          <p className="pb-4">
            Wedlock is for people aged 18 and over. If you believe a member is
            under 18, report them and tell us why. We suspend the account while
            we check.
          </p>

          <p className='text-md font-bold'>Effective date</p>
          <p className="pb-4">Version 1.0 · Effective 11th October 2026</p>
        </div>
      </div>
    </div>
  );
};

export default Safety;
