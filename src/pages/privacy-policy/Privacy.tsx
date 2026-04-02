import Nav from '../../components/Legal/Nav';

const Privacy = () => {
   const currentDate = new Date().toDateString();
    return (
        <div className="flex flex-col mt-20">
          <div className="bg-[#E6F2F7] text-center px-6 py-6 md:p-24 space-y-8">
            <h3 className="text-[#007EAF] font-semibold text-base">
              Current as of {currentDate.toLocaleString()}
            </h3>
            <h1 className=" text-2xl md:text-4xl font-semibold">Privacy Policy</h1>
            <p className="text-[#475467] text-md md:text-xl text-balance">
              Your privacy is important to us at Wedlock. We respect your privacy
              regarding any <br /> information we may collect from you across our
              website.
            </p>
          </div>
          <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
            <div className="">
              <Nav activeSectionData={"PRIVACY"} /> 
            </div>
            <div className=" flex flex-col items-start md:pr-10">
              <h2 className="font-bold text-md pb-4 ">Privacy Policy</h2>
              <p className="pb-4">Welcome to the Wedlock Privacy Policy (“Policy”)! This explains how we collect, store, protect, and share your information, and with whom we share it. We suggest you read this in conjunction with our Terms and Conditions of Use.</p>
    
              <p className="pb-4">Whilst you’re enjoying the Wedlock mobile application (including the desktop version) (“App”), our websites and microsites (such as Wedlock.au) or using our digital products and services (such as our competitions or surveys) (together, referred to in this Privacy Policy as our “Sites”), we collect some information about you. In addition, you may choose to use the App or Sites to share information with other users, including your friends and contacts (“Users”). We may also need to share your information sometimes.
              </p>
    
              <p className="pb-4">The App and Sites are global, and your information will be sent to and used in the Australia regardless of the country you reside in. This Policy explains how we protect your personal data when we transfer it overseas, so please read very carefully!
              </p>
              <p>Who we are
              </p>
              <p className="pb-4">The App and Sites are operated by the “Wedlock Global Services” (also referred to in this policy as “we” or “us”) which includes all of which are controllers of personal information collected and processed through the Wedlock App and Sites.
              </p>
    
              <h3 className="pb-4 font-semibold text-md">1. COLLECTION OF INFORMATION.
              </h3>
              <p>Registration Information
              </p>
              <p>When you download the App and create an account (“Account”), we may collect certain information (“Registration Information”) about you, such as:
              </p>
              
              <ul className="list-decimal pb-4 pl-4">
                <li>Name;</li>
                <li>Username;</li>
                <li>Email address
                </li>
                <li>Mobile number;
                </li>
                <li>Gender identity;
                </li>
                <li>Date, time, and location of birth;
                </li>
                <li>Sexual preference;
                </li>
                <li>Photographs;
                </li>
                <li>Location; and
                </li>
                <li >
                Login information for social media accounts that you connect to your Wedlock Account 
                </li>
              </ul>
    
              <p className="pb-4">
              (this could include, for example, your Facebook accounts). For more information about this, see “Linking other Accounts to Wedlock” in section 7 below.
              Once you register, you will be able to review and change this information at any time just by logging in to Wedlock (other than your date of birth and location (which, if you have given Wedlock access to your location in your device settings, is automatically updated based on the location of your device)). It is your responsibility to ensure that your account details are kept up to date. If your phone number changes, please ensure that you update this in your account.
              </p>
    
              <p className="pb-4">
              The information we collect helps to enhance the App and verify our Users (robots are not welcome!). Registration Information such as your sexual preference, name and username may be visible to other Users who view your profile page.
              </p>
              <p className="pb-4">
              For Users in Australia, the data we may collect falls within the following categories of 
              “personal information”, as defined by the Australian Privacy Principles (APP):
              </p>
    
              <ul className="list-disc pb-4 pl-4">
                <li>A. Identifiers, such as name and location;
                </li>
                <li>B. Personal information, such as contact (including email and telephone number) and financial information;
                </li>
                <li>C. Characteristics of protected classifications (if you choose to provide them), such as age, gender identity, marital status, sexual orientation, race, ancestry, national origin, religion, and medical conditions;
                </li>
                <li>D. Commercial information, such as transaction information and purchase history;
                </li>
                <li>E. Biometric information;
                </li>
                <li>
                F. Internet or network activity information, such as browsing history and interactions with our Sites and App;
    
                </li>
                <li>
                G. Geolocation data, such as mobile device location;
    
                </li>
                <li>
                H. Audio, electronic, visual and similar information, such as photos and videos;
    
                </li>
                <li>
                I. Professional or employment-related information, such as work history and prior employer;
    
                </li>
                <li>
                J. Non-public education information; and
    
                </li>
                <li>
                K. Inferences drawn from any of the personal information listed above to create a profile or summary about, for example, an individual’s preferences and characteristics.
    
                </li>
              </ul>
              <h3 className="text-md font-semibold">Profile Information
              </h3>
              <p className="pb-4">We recommend and encourage you (and all our members) to think carefully about the information you disclose about yourself. We also do not recommend that you put email addresses, URLs, instant messaging details, phone numbers, full names or addresses, credit card details, national identity numbers, drivers’ licence details and other sensitive information which is open to abuse and misuse on your profile.
              </p>
    
              <p className="pb-4">When you post information about yourself or use the messaging function to communicate with other Users, the amount of personal information you share is at your own risk. Please see Section 4 below for more information on who can access what you post on Wedlock.
    Profile Verification Information (Including Biometric Information)
    </p> 
             <p className="pb-4">
             For safety and security and to ensure you have the best possible user experience, we require Users to verify their accounts vis 2-factor authentication and might ask for your email address and/or phone number and, in some instances, we might also ask that you carry out photo verification. We want to make sure you are not a robot! And we also want to avoid fake Wedlock accounts being created which can be used for malicious activities and cybercrime – they threaten the Wedlock network and spoil things for everyone. This verification might be required by us for the prevention of fraud. You can also verify your photo on a voluntary basis (to add the blue ‘verified’ badge to your profile).
    
             </p>
             <p className="pb-4">
             If you choose to verify your profile photo, we will scan each photo that you submit. The scan may include the use of facial recognition technology so that we can compare the photo you submit to your profile photo, to help ensure that you are who you say you are. We do not add the verification photos to your profile. We retain the scans so that we can verify you in the future and for our record-keeping purposes until we no longer need them for such purposes or for three years after your last interaction with us, whichever occurs first. After the applicable retention period expires, we take commercially reasonable steps to permanently and securely delete the scans from our systems.
    
             </p>
             <h3 className="text-md font-semibold">Purchases Information
             </h3>
             <p className="pb-4">If you decide to purchase any of our subscription services, we will process your payment information and retain this securely for the prevention of fraud and for audit/tax purposes.
    Wedlock uses automated decisions to prevent fraudulent payment transactions being processed as part of its anti-fraud procedures. In order to do this, our systems check payment transactions for behaviour that indicates breaches of our Terms and Conditions of Use. If a transaction meets certain criteria that demonstrate that the Terms and Conditions of Use are likely to have been breached and the transaction is likely to be fraudulent, the relevant transaction may automatically be blocked. Where a transaction is blocked, the user will be notified that their transaction cannot be processed and affected Users can contact Wedlock to contest the decision.
    </p>
        
        <h3 className="text-md font-semibold">Geolocation Information
        </h3>
        <p className="pb-4">If you have given Wedlock access to your location in your device settings, when you use your mobile, we may in future collect information about WiFi access points as well as other location information about your longitude and latitude and may save your device’s coordinates to offer certain features to you. This information helps us identify your physical location and we use it to personalise the App and make it easier for you to interact with other Users, by enabling the general locality information to be displayed to Users seeing your profile and showing you the profiles of other Users who are near you.</p>
    
        <p className="pb-4">If you have given Wedlock access to your location, but wish to turn this off, you can do so by the following methods:
        </p>
    
        <ul className="list-decimal pl-4">
          <li>iPhone app — settings, privacy, location services, Wedlock
          </li>
           <li>2.	Android — settings, location, Wedlock, permissions, location
           </li>
        </ul>
        <h3 className="text-md font-semibold">Device and Photos Information
        </h3>
        <p className="pb-4">We may collect information about your device when you use the App including the unique device identifier, device model, and operating system, for a number of purposes, as set out in this policy. In addition, if you permit us to do so, the App may access your device’s address book solely in order to add someone to your contacts.
        We also collect data about your photos, such as which are the photos that users spend time on or which are the photos that have the best lighting, etc. We may use that data to rearrange your profile photos aiming to position them in a way that is favourable to you. You may opt-out of this feature through our app settings.
    
        </p>
        <h3 className="text-md font-semibold">Links</h3>
        <p className="pb-4">We may keep track of how you interact with links available on Wedlock including third party services by redirecting clicks or through other means. We may share aggregate click statistics such as how many times a particular link was clicked on.
        </p>
    
        <h3 className="text-md font-semibold">Wedlock Success Stories, Surveys and other Contributions
        </h3>
        <p className="pb-4">From time to time, we run surveys for research purposes and we may contact you to find out if you would like to take part. We may also contact you to find out if you would like to provide feedback, a testimonial or take part in marketing campaigns (for example, if you let us know that you have found a match on the App, we may contact you to ask if you would be happy to feature in advertising for Wedlock). Such surveys and marketing campaigns are optional and more information will be provided at the point of contact.
        </p>
        <h3 className="text-md font-semibold">When you Contact Customer Support
        </h3>
        <p className="pb-4">If you contact our Customer Support team, we will receive your email address, and may track your IP address, as well as the information you send to us to help resolve your query. We will keep records of our communications with you, including any complaints that we receive from you about other Users (and from other Users about you) for 6 years after deletion of your account.
        </p>
    
        <h3 className="text-md font-semibold">Cookies and similar technologies
        </h3>
        
        <p className="pb-4">When you visit our Sites or when you use our App, we may collect personal data from you automatically by using cookies or similar technologies. A cookie is a small file that can be placed on your device or browser that allows us to recognise and remember you.
    If you would like to find out more about cookies, including how we use them and what choices are available to you, please refer to our Cookie Policy.
    </p>
    
    <h3 className="text-md font-semibold">2. USE OF YOUR INFORMATION.
    </h3>
    <p className="pb-4">Our main goal is to ensure your experience on Wedlock is an enjoyable one and you don’t end up getting stung! In order to deliver an enjoyable experience to you, we may use your Registration and other information to:
    </p>
    
    <ul className="list-decimal pl-4 pb-4">
      <li>offer you our services and features;
      </li>
      <li>
      contact you with information about the App (e.g., updates and new features);
    
      </li>
      <li>
      personalise the App/Sites and the content we deliver to you;
    
      </li>
      <li>
      conduct research and analytics about how you use and interact with the App/Sites;
    
      </li>
      <li>
      to test new technologies and processes designed to enhance and improve the App/Sites;
    
      </li>
      <li>
          resolve disputes, troubleshoot problems and to enforce our Terms & Conditions;
    
      </li>
      <li>
      investigate fraud, protect our legal rights, and to enforce our Terms & Conditions.
    
      </li>
      <li>
      to send you information about the promotions and offers we have available 
      </li>
      <p className="pb-4">
      (e.g., specify the types of goods/services/offers to be provided via direct marketing) by direct marketing or other modes of communication - if you’ve signed up for our communications or otherwise told us it’s OK. We will not use your information in email direct marketing unless you give us your consent during the Account creating process or via Settings in the App (you can withdraw from marketing at any time via Settings in the App or by using the opt-out mechanisms and links provided in each message); and
    
      </p>
      <li>
          protect our Users and third parties from harm.
    
      </li>
    </ul>
    
    <h3 className="text-md font-semibold pb-4">Our Matching Algorithms
    </h3>
    <p className="pb-4">Wedlock’s mission is to create kind and equitable relationships. We have developed matching algorithms to predict your compatibility with other users so we can show you people we think are a good match for you. We use different indications based on users’ profiles on our app (for example, how you swipe or whether you match with someone). We use these indications to recommend the most relevant profiles to everyone to maximise everyone’s chances of finding meaningful connections on our apps. Our matching algorithms are based on a range of factors and use machine learning to rank profiles for you to maximise your chance of finding compatible matches.</p>
    <p className="pb-4">We use the following data about you and other users to predict your compatibility with others and generate profile recommendations: the information you provide us about yourself in your profile such as age, distance or gender so we can show you people who are appropriate and are more likely to like you back; information about how you interact with our app to suggest to you people who are active and available to meet new people; and your device coordinates, which are necessary to understand your proximity to other members. </p>
    
    <p className="pb-4">The legal basis for processing profile and proximity information is that this is necessary for the provision of our contractual services. Where we process information about your app activity, and specifically our legitimate interest in generating more personalised and relevant recommendations for who you can match with in our App. </p>
    
    <p className="pb-4">Where you have included sensitive information in your profile, such as information about your beliefs, the processing of this information is based on your voluntary and explicit consent.
    </p>
    <h3 className="text-md font-semibold">Moderation Practices
    </h3>
    <p className="pb-4">We use a combination of automated systems and a team of moderators to monitor and review accounts (including photos and any other information uploaded onto user profiles) and messages for content that indicates breaches of our Terms and Conditions of Use. If an account or message meets certain criteria that demonstrate that the Terms and Conditions of Use are likely to have been breached, the relevant account will be subject to a warning and the user’s access restricted and/or blocked. Affected Users can contact Wedlock to contest the decision.
    </p>
    <p className="pb-4">
    If you post anything that is inconsistent with our Terms and Conditions of Use, we reserve the right to terminate or restrict access to your Account.
    
    </p>
    <h3 className="text-md font-semibold pb-4">3. DISCLOSURE OF INFORMATION.</h3>
    <p className="pb-4">Our policy is to not disclose your Registration Information or personal data, except in the limited circumstances described here:</p>
    <p>Circumstances where data may be disclosed</p>
    <p>Disclosed data</p>
    <p>Service Providers – We engage certain   trusted third parties to perform functions and provide services to us. We may   share your Registration Information or personal data with these third   parties, but only for the purposes of performing these functions and   providing such services. More information about this is available directly   below.
    This could include all   data, including all categories listed above
    Moderators – To monitor   activity on the App or Site and approve content.
    Name and user   registration details, profile information, content of messages and   photographs (Categories A, B, C, and H)
    Payment Processing and   Telecommunications Companies – To facilitate payments for our subscription   services.
    Cardholder name,   cardholder address, card number, payment amount, transaction date/time   (Categories A, B, and D)
    Law and Harm – As we mentioned   in the Terms & Conditions, we think it is very   important that all Users behave whilst using the App. We will cooperate with   all third parties to enforce their intellectual property or other rights. We   will cooperate with lawfully made law enforcement requests for information   from within or outside your country of residence where we are required to by   law. This may include where there is an investigation into alleged criminal   behaviour or to protect the vital interests of a person. We may preserve or   disclose any of your information, including your Registration Information, if   we believe in good faith that it is necessary to comply with a law or   regulation, or when we believe in good faith that disclosure is necessary:</p>
    
    <ul className="list-disc pl-4">
      <li>to  comply with a binding direction court order, or lawful request;</li>
      <li>to protect the safety of any person;</li>
      <li>to address fraud, security or technical issues        e.g. through anti-spam providers to protect the service from criminal  activity; or</li>
      <li>to protect our rights or property or those of        third parties.</li>
    </ul>
    <p>In such cases we may   raise or waive any legal objection or right available to us.
    This could include any   personal data that Wedlock holds about you, depending on the nature of the   request or the issue that we are dealing with, including all categories   listed above</p>
    <p>
    Business Transfers – In the event that   a Wedlock Global Services undergoes a business transition or change of   ownership, such as a merger, acquisition by another company, re-organisation,   or sale of all or a portion of its assets, or in the event of insolvency or   administration, we may be required to disclose your personal data.
    This could include all   personal data that Wedlock holds about you, including all categories listed   above
    </p>
    <p>
    Marketing Services   Providers – To help us serve marketing and advertising   on third party websites and applications and measure the effectiveness of our   advertising campaigns. More information on this is available below
    </p>
    <p className="pb-4">More information on this is available below
    Advertising identifier   associated with your device (Device ID), estimated location (based on your IP   address), age, gender and data about your visit to our Sites or App and   action taken on those (for example if you downloaded our App or created an   account with our App), hashed email address (for ‘custom audiences’ only)   (Categories B, C, G, F and K)
    Anti-Spam and Anti-Fraud – Your data may be   shared within Wedlock Global Services App or Site for different products, for   example, to block accounts and suspected fraudulent payment transactions as   part of our anti-spam and anti-fraud procedures.
    Email address, phone   number, IP address and IP session information, social network ID, username,   user agent string, and transaction and payment data (Categories B, F and D).
    Aggregated Information – We may share aggregated information with third parties that includes your personal data (but which doesn’t identify you directly) together with other information including log data for industry analysis and demographic profiling.</p>
    
    <h3 className="text-md font-bold pb-4">MORE INFORMATION ABOUT DISCLOSURES</h3>
    <h4 className="text-md font-semibold ">Service Providers</h4>
    <p>We engage certain trusted third parties to perform functions and provide services to us (“Service Providers”). The suppliers with which Wedlock shares User personal data vary depending on a variety of factors, such as which of our App, Sites and services a User engages with. For example, to provide our services to Users, we typically use the following suppliers:</p>
    
    <ul className="list-disc pl-4">
      <li>Billing services      – to allow customers to purchase paid features of our App (for example,      Google Play)</li>
      <li>Authentication services – to allow customers to      authenticate their account (for example, Twilio)</li>
      <li>Social media providers – to allow customers to      create/connect their Wedlock account with their account(s) on such      platforms (for example Facebook, Instagram or Spotify)</li>
      <li>Product improvement and market research – we use      third party platforms (such as Typeform) and agencies (such as Kantar) to      carry out customer surveys and market research to improve our products and      services</li>
      <li>IT services – some of the third-party software      providers used in the operation of our business may process Users’      personal data (for example, if a User contacts us via social media with a      support inquiry.</li>
    </ul>
    <p className="pb-4">We carry out due diligence on all Service Providers we engage to ensure they have adequate data protection and information security measures in place and only provide them with the personal data necessary to the service they are providing. Measures are taken to ensure that the data shared is non-attributable to the greatest extent possible and our suppliers are also subject to extensive obligations under our contractual arrangements, including strict data retention limits.</p>
     <h3 className="text-md font-semibold pb-4">Marketing Services Providers</h3>
     <p>We partner with providers of marketing services (such as Facebook for example) (‘Marketing Services Providers’) to help us market and advertise our App and services on third party websites and applications and measure the effectiveness of our advertising campaigns. For example:</p>
     <ul className="list-disc pl-4">
      <li>to exclude you      from advertising campaigns aimed at finding new users, if you already have      a Wedlock account;</li>
      <li>to show Wedlock adverts to users who have visited      the Wedlock App/Sites but haven’t yet created a Wedlock account;</li>
      <li>to create an audience for our advertisements of      other potential users who have similar characteristics to you based on the      information the Marketing Service Providers holds about you (also known as      a Lookalike Audience); or</li>
      <li>to include you in a ‘custom audience’ that will      receive Wedlock advertising content (a custom audience is essentially a      list of people who we think are most likely to be interested in a      particular advertisement).</li>
     </ul>
     <p>We share a limited amount of your personal data with these Marketing Services Providers, such as:</p>
    
     <ul className="list-disc pl-4 pb-4">
      <li>the advertising      identifier associated with your device (this is a random number assigned      by your mobile device manufacturer (for example Apple or Google) to your      device to help advertisers (including the manufacturer) know when an ad      has been viewed or clicked in an app, and when an ad causes a ‘conversion’      (for example, downloading the app advertised to you))</li>
      <li>your estimated location (based on your IP      address)</li>
      <li>age and gender</li>
      <li>data about your visit to our Sites or App and      action taken on those (for example if you downloaded our App, created an      account with our App, or details of any purchases made on Site or in App)</li>
      <li>a hashed* version of your email address (to      create ‘custom audiences’).</li>
     </ul>
    
     <p>
     Hashing is a way of encrypting information by turning it into a combination of random numbers and letters - this code cannot be traced back to the email address. When hashed email addresses are sent to a Marketing Service Provider, they’re then matched against the Provider’s own existing list of their own users’ hashed information and our ads are served to those of our users who have successfully been matched with the Provider’s. Matched and unmatched hashes are then deleted by the Provider.
    For more information about how we use cookies and other tracking technologies, including how you can set and manage your preferences with regards to such technologies, please see our Cookie Policy.
    In some cases, these third parties will also use the data that they collect for their own purposes, for example they may aggregate your data with other data they hold and use this to inform advertising related services provided to other clients.
     </p>
    
     <h3 className="text-md font-semibold pb-4">4. WHAT OTHERS MAY SEE ABOUT YOU.</h3>
     <p className="pb-4">Our App or Site is designed to make it easier for you to connect with other Users and to interact with them.</p>
     <p className="pb-4">When using the Wedlock App or Site, you should assume that anything you post or submit on the App may be publicly-viewable and accessible, both by Users and non-users of the App or Site. We want our Users to be careful about posting information that may eventually be made public.</p>
     <p className="pb-4">
     Please be careful about posting sensitive details about yourself on your profile such as your religious denomination and health details. You may also choose to add sensitive information about yourself when you add certain Wedlock badges to your profile, such as your religion and political leanings. While you may voluntarily provide this information to us when you create your profile, including your sexual preferences, there is no requirement to do so. Please remember that photographs that you post on Wedlock may reveal information about yourself as well. Where you do upload and choose to tell us sensitive information about yourself, including through the addition of badges to your profile, you are explicitly consenting to our processing of this information and making it public to other Users.
    Your Wedlock profile and other information you make available via the App or Site, including certain information added to your profile through third party accounts (such as Facebook, Instagram or Spotify – see section 7 of this Privacy Policy for more information about this) may be viewed and shared by Users with individuals who may or may not be users of the App or Site. For example, a User may recommend you as a match to his or her Facebook friend(s) by taking a screenshot of your profile picture and sharing it, regardless of whether such friend(s) is also a User of the App.
    If you log in to or access the App or Site through your Facebook account or another third-party account on a device which you share with others, remember to log out of the App or Site and the relevant third-party account when you leave the device in order to prevent other users from accessing your Wedlock account.
     </p>
    
     <h3 className="text-md font-semibold pb-4">5. OUR POLICY TOWARDS AGE.</h3>
     <p className="pb-4">
     Although we want as many people as possible to enjoy our creation, you have to be at least 18 years old to use Wedlock.
     Wedlock does not knowingly collect any information about or market to children, minors or anyone under the age of 18. If we become aware that a child, minor or anyone under the age of 18 has registered with us and provided us with personal information, we will take steps to terminate that person’s registration.
     </p>
     <h3 className="text-md font-semibold pb-4">
     6. SECURITY. 
     </h3>
     <p>
     Here at Wedlock, we pride ourselves on taking all appropriate security measures to help protect your information against loss, misuse and unauthorised access, or disclosure. We use reasonable security measures to safeguard the confidentiality of your personal information such as secured servers using firewalls.
     </p>
     <p>
     Unfortunately, no website or Internet transmission is ever completely 100% secure and even we cannot guarantee that unauthorised access, hacking, data loss or other breaches will never occur, but here are some handy tips to help keep your data secure:
     </p>
     <ul className="list-decimal pl-4">
      <li>Please make sure      you log out of your Account after use as you never know who may stumble      onto your Account!</li>
      <li>Please don’t share the password you use to access      your Wedlock Account with anyone else!</li>
      <li>Change your password periodically.</li>
     </ul>
     <p>We cannot guarantee the security of your personal data while it is being transmitted to our site and any transmission is at your own risk.</p>
     <h3>
     7. LINKING OTHER ACCOUNTS TO WEDLOCK.
     </h3>
     <p className="pb-4">
     Using your social media details to sign in to Wedlock
    When you sign in to our App or Site using your Facebook account, you give permission to Facebook to share with us your name and profile picture. Unless you opt-out, you also give permission to Facebook to share with us your email address (if there is one associated with your Facebook account), date of birth, profile photos, gender, Page likes and current town/city.
     </p>
    
     <p className="pb-4">
     If you register or sign in with your Apple ID, you give Apple permission to share your Apple login, a name (that can be edited by you) and an email (you can choose to hide your email and Apple will create a random email address so your personal email can stay private). This email address will be linked to your Wedlock account and will be used to retrieve your Wedlock account.
     </p>
     <p className="pb-4">
     We will then use this personal data to form your Wedlock account. If you remove the Wedlock app from your Facebook settings, or from your Apple ID, we will no longer have access to this data. However, we will still have the personal data that we received when you first set up your Wedlock account using your Facebook or Apple ID (you must delete your Wedlock account entirely for us to no longer have access to this data).
     </p>
     <h3 className="text-md font-semibold pb-4">Linking social media accounts to your Wedlock account</h3>
     <p className="pb-4">You may link your Wedlock account with your Instagram, Facebook or Spotify accounts. This allows you to share some information from those accounts directly to your Wedlock account (for example, Instagram photos, or your top Spotify artists).</p>
    
     <p className="pb-4">We only receive the limited information that Instagram or Spotify permits to be transferred (as detailed by Instagram/Facebook/Spotify and agreed by you when you first connect your account from such platforms with your Wedlock account).</p>
    
     <p className="pb-4">If you no longer want to link your Wedlock account to your Instagram, Facebook or Spotify account, please visit the settings in your Instagram, Facebook or Spotify account and follow the instructions to remove the Wedlock app access permissions. Please note that any information already added to your Wedlock account from those platforms will not be deleted unless you delete it within your Wedlock account as well.</p>
     
     <h3 className="text-md font-semibold pb-4">8. YOUR RIGHTS.</h3>
     <p className="pb-4">Privacy laws applicable may give you the following rights:</p>
     <ul className="list-decimal pl-4 pb-4">
      <li>Right to be informed:      what personal data an organisation is processing and why (we provide this      information to you in this Privacy Policy).</li>
      <li>Right of access: you can request a copy of your      data.</li>
      <li>Right of rectification: if the data held is      inaccurate, you have the right to have it corrected.</li>
      <li>Right to erasure: you have the right to have your      data deleted in certain circumstances.</li>
      <li> Right to restrict processing: in limited      circumstances, you have the right to request that processing is stopped      but the data retained.</li>
      <li>Right to data portability: you can request a copy      of certain data in a machine-readable form that can be transferred to      another provider.</li>
      <li>Right to object: in certain circumstances      (including where data is processed on the basis of legitimate interests or      for the purposes of marketing) you may object to that processing.</li>
      <li>Rights related to automated decision-making      including profiling: there are several rights in this area where      processing carried out on a solely automated basis results in a decision      which has legal or significant effects for the individual. In these circumstances      your rights include the right to ensure that there is human intervention      in the decision-making process.</li>
     </ul>
     <p className="pb-4">
     The particular rights which are applicable to you (which might include other rights not listed above) may vary depending on your country. You should make yourself aware of the rights you have under applicable privacy laws in your country.
     If you have a concern about how we have processed your request or your personal data, you should contact us in the first instance.
     </p>
    
     <h3 className="text-md font-semibold pb-4">9. DATA LOCATIONS.</h3>
     <p className="pb-4">We want you to be able to access Wedlock wherever you happen to be in the world. To enable us to provide that service, we use cloud based hosting services, ensuring that the data is adequately protected by ensuring that valid, legal mechanisms are in place.</p>
    
    <h3>10. DATA RETENTION AND DELETION.</h3>
    <p className="pb-4">We keep your personal information only as long as we need it for the legal basis relied upon (as set out in Section 2 above) and as permitted by applicable law. Please see “Profile Verification Information (Including Biometric Information)” in Section 1, above, to learn about our retention policy with respect to biometric information.</p>
    <ul className="list-decimal pl-4 pb-4">
      <li>we must keep it      to comply with applicable law (for instance, if you make purchases within      the App, some personal data may be kept for tax and accounting purposes);</li>
      <li>we must keep it to evidence our compliance with      applicable law (for example, if an account is blocked, we keep some      account information and a record of the behaviour that led to the block -      this information is retained for evidential purposes in case of queries or      legal claims concerning the block);</li>
      <li>there is an outstanding issue, claim or dispute      requiring us to keep the relevant information until it is resolved; or</li>
      <li>the information must be kept for our legitimate      business interests, such as fraud prevention and enhancing Users’ safety      and security (for example, information may need to be kept to prevent a      user who was banned for unsafe behaviour or security incidents from      opening a new account).</li>
    </ul>
    
    <p className="pb-4">Warning: Even after you remove information from your profile or delete your Account, copies of that information may still be viewable and/or accessed to the extent such information has been previously shared with others, or copied or stored by others. We cannot control this, nor do we accept any liability for this. If you have given third party applications or websites access to your personal information, they may retain such information to the extent permitted under their terms of service or privacy policies.</p>
    
    <h3 className="text-md font-semibold pb-4">11. CHANGES TO THIS POLICY.</h3>
    <p className="pb-4">As Wedlock evolves, we may revise this Privacy Policy from time to time. If we make a change to this policy that, in our sole discretion, is material, we will notify you, for example, via an email to the email associated with your Account or by posting a notice within Wedlock.</p>
    <p>
    Effective date
    </p>
    <p>This Privacy Policy was last updated on: 7th August 2024</p>
    
    
    
            </div>
          </div>
        </div>
      );
}

export default Privacy
