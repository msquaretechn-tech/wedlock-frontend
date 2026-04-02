import Nav from "../../components/Legal/Nav";


const ChildSafety = () => {

    const currentDate = new Date().toDateString();
    return (
        <div className="flex flex-col mt-20">
            <div className="bg-[#E6F2F7] text-center px-6 py-6 md:p-24 space-y-8">
                <h3 className="text-[#007EAF] font-semibold text-base">
                    Current as of {currentDate.toLocaleString()}
                </h3>
                <h1 className=" text-2xl md:text-4xl font-semibold">Wedlock Child Safety Policy
                </h1>
                <p className="text-[#475467] text-md md:text-xl text-balance">
                We are committed to creating a safe and supportive environment for all users, especially minors. To ensure child safety on our platform
                </p>
            </div>
            <div className="px-4 py-4 flex md:flex-row flex-col gap-7">
                <div className="">
                    <Nav activeSectionData={"Child Safety"} />
                </div>
                <div className=" flex flex-col items-start md:pr-10">
                    <h2 className="font-bold text-xl pb-4 "> Child Safety Policy</h2>
                    <h3 className="font-bold text-md">Wedlock Child Safety Policy</h3>

                    <p className="#475467 pb-4">
                        At  Wedlock, we prioritize the safety and well-being of children. Our platform is designed strictly for users 18 years and older and is not intended for children. We comply with Google Play’s Developer Policies and applicable child protection laws, including the Children’s Online Privacy Protection Act (COPPA) and the General Data Protection Regulation (GDPR-K).
                    </p>


                    <h3 className="font-bold text-md">1. Prohibition of Child Exploitation and Abuse</h3>
                    <ul className="list-disc pl-4 py-4">
                        <li >
                            Our platform strictly prohibits Child Sexual Abuse and Exploitation (CSAE), including any content, communication, or activity that may endanger minors.
                        </li>
                        <li>
                            These prohibitions are clearly outlined in our Terms of Service, Community Guidelines, and Privacy Policy, ensuring public awareness of our safety standards.
                        </li>
                        <li>
                            Any violations will lead to immediate content removal, account suspension, and potential legal action.
                        </li>

                    </ul>

                    <h3 className="font-bold text-md">2. User Reporting and Feedback System</h3>
                    <ul className="list-disc pl-4">
                        <li className="pb-4">
                            We provide a built-in reporting system that allows users to report any inappropriate behavior, suspected CSAE content, or violations of our policies.
                            Users can also submit feedback or concerns through our in-app support system or by contacting our dedicated safety team.
                            Reports are reviewed promptly, and appropriate actions are taken, including content removal and user bans when necessary.
                        </li>
                    </ul>

                    <h3 className="font-bold text-md">3. Handling of Child Sexual Abuse Material (CSAM)</h3>
                    <ul className="list-disc pl-4">
                        <li className="pb-4">
                            If we become aware of Child Sexual Abuse Material (CSAM) on our platform, we take immediate action to remove it.
                            We cooperate with law enforcement agencies and report all confirmed CSAM cases to the National Center for Missing and Exploited Children (NCMEC) or relevant regional authorities.
                            Any user found engaging in CSAM-related activities will face permanent suspension and legal consequences.
                        </li>
                    </ul>

                    <h3 className="font-bold text-md">4. Compliance with Child Safety Laws </h3>
                    <ul className="list-disc pl-4">
                        <li className="pb-4">
                            Our app follows all relevant child protection laws and regulations, including:
                            COPPA (Children’s Online Privacy Protection Act)
                            GDPR-K (General Data Protection Regulation – Kids Section)
                            Other applicable regional child safety laws
                            We ensure that no data is collected from children, and we have measures in place to promptly remove any underage accounts if identified.

                        </li>
                    </ul>
                    <h3 className="font-bold text-md">5. Child Safety Contact for Google Play Notifications </h3>
                    <ul className="list-disc pl-4">
                        <li className="pb-4">
                            We have designated a Child Safety Representative who is responsible for addressing child safety concerns and taking necessary actions on reported content.
                            This representative serves as the point of contact for Google Play notifications regarding CSAE content on our platform.
                            Contact details for child safety concerns: (info@wedlock.au)
                        </li>
                    </ul>

                    <h3 className="font-bold text-md">6. Content Moderation and Preventative Measures</h3>
                    <ul className="list-disc pl-4">
                        <li className="pb-4">
                            We utilize a combination of automated content monitoring systems and human moderation to detect and remove inappropriate content.
                            Any content that includes minors in a questionable or exploitative manner is immediately flagged and reviewed.
                            We actively encourage safe online interactions and discourage users from sharing personal or sensitive information publicly.
                        </li>
                    </ul>

                    <h3 className="font-bold text-md">7. Regular Policy Updates and Compliance Review </h3>
                    <ul className="list-disc pl-4">
                        <li className="pb-4">
                            Our Child Safety Policy is regularly reviewed and updated to remain in compliance with Google Play’s guidelines and evolving child protection laws.
                            Any major updates to our policy will be communicated to users, and continued use of the app signifies acceptance of these updates.
                            By using Wedlock, users agree to comply with our Child Safety Policy. Any violations may result in account termination, legal action, or reporting to authorities.
                        </li>
                    </ul>
                    <h4>For any concerns related to child safety, please reach out to our Child Safety Team at <span className="font-semibold underline">info@wedlock.au.</span> </h4>

                </div>
            </div>
        </div>
    );
};

export default ChildSafety;
