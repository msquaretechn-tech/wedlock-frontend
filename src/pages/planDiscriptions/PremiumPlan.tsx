import React from "react";
import { MdCheckCircle, MdCancel } from "react-icons/md";

const PremiumPlan: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-[#FFC759] pl-3">Pricing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-[#FFF9EE] p-4 rounded-xl border border-[#FFC759]/30">
                        <p className="text-sm text-gray-500 font-medium">1 Month</p>
                        <p className="text-2xl font-bold text-[#007EAF]">AU $1</p>
                    </div>
                    <div className="bg-[#FFF9EE] p-4 rounded-xl border border-[#FFC759]/30">
                        <p className="text-sm text-gray-500 font-medium">12 Months</p>
                        <p className="text-2xl font-bold text-[#007EAF]">AU $19.99</p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#007EAF] rounded-full"></span>
                        Basic Access
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Create favorites lists" active />
                        <FeatureItem text="Create photo profile" active />
                        <FeatureItem text="Send friend requests (Premium & Standard only)" active />
                        <FeatureItem text="View profiles in full (Premium & Standard only)" active />
                        <FeatureItem text="Access to Exclusive profiles" active={false} />
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#007EAF] rounded-full"></span>
                        Searching
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Appear first in searches (Limited)" active />
                        <FeatureItem text="Save searches" active />
                        <FeatureItem text="Search/browse profiles" active />
                        <FeatureItem text="Advanced searching" active />
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#007EAF] rounded-full"></span>
                        Communication
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Send interests" active />
                        <FeatureItem text="In-app chat" active />
                        <FeatureItem text="Respond to chats" active />
                        <FeatureItem text="Video calls" active />
                        <FeatureItem text="Unlimited messages" active />
                        <FeatureItem text="Video limit: 15 mins per call" active />
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-[#007EAF] rounded-full"></span>
                        Profile & Matchmaking
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Customize profile" active />
                        <FeatureItem text="See profile views" active />
                        <FeatureItem text="Stand out" active={false} />
                        <FeatureItem text="Suggested matches" active />
                        <FeatureItem text="Personality test" active />
                        <FeatureItem text="Matchmaking tools" active />
                    </ul>
                </section>
            </div>

            <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Security</h3>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                        <MdCheckCircle className="text-green-500" />
                        <span className="text-sm font-medium text-gray-600">Profile verification</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
                        <MdCheckCircle className="text-green-500" />
                        <span className="text-sm font-medium text-gray-600">Password & OTP</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureItem = ({ text, active }: { text: string; active: boolean }) => (
    <li className="flex items-start gap-3 group">
        {active ? (
            <MdCheckCircle className="text-[#007EAF] mt-1 shrink-0 group-hover:scale-110 transition-transform" />
        ) : (
            <MdCancel className="text-gray-300 mt-1 shrink-0" />
        )}
        <span className={`text-sm ${active ? "text-gray-600" : "text-gray-400 line-through"}`}>
            {text}
        </span>
    </li>
);

export default PremiumPlan;