import React from "react";
import { MdCheckCircle } from "react-icons/md";

const ExclusivePlan: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-purple-500 pl-3">Pricing</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <p className="text-sm text-purple-600 font-medium">1 Month</p>
                        <p className="text-2xl font-bold text-purple-900">AU $1</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                        <p className="text-sm text-purple-600 font-medium">12 Months</p>
                        <p className="text-2xl font-bold text-purple-900">AU $89.88</p>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Basic Access
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Create favorites lists" />
                        <FeatureItem text="Create photo profile" />
                        <FeatureItem text="Send friend requests (Unlimited)" />
                        <FeatureItem text="View profiles in full" />
                        <FeatureItem text="Access to Exclusive profiles" />
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Searching
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Appear first in searches" />
                        <FeatureItem text="Save searches" />
                        <FeatureItem text="Search/browse profiles" />
                        <FeatureItem text="Advanced searching" />
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Communication
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Send interests" />
                        <FeatureItem text="In-app chat" />
                        <FeatureItem text="Respond to chats" />
                        <FeatureItem text="Video calls" />
                        <FeatureItem text="Unlimited messages" />
                        <FeatureItem text="Video limit: 30 mins per call" />
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Profile & Matchmaking
                    </h3>
                    <ul className="space-y-3">
                        <FeatureItem text="Customize profile" />
                        <FeatureItem text="See profile views" />
                        <FeatureItem text="Stand out" />
                        <FeatureItem text="Suggested matches" />
                        <FeatureItem text="Personality test" />
                        <FeatureItem text="Matchmaking tools" />
                    </ul>
                </section>
            </div>

            <section className="bg-purple-900/5 p-6 rounded-2xl border border-purple-100">
                <h3 className="text-lg font-bold text-gray-700 mb-4">Security</h3>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-purple-100 shadow-sm">
                        <MdCheckCircle className="text-purple-500" />
                        <span className="text-sm font-medium text-gray-600">Profile verification</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-purple-100 shadow-sm">
                        <MdCheckCircle className="text-purple-500" />
                        <span className="text-sm font-medium text-gray-600">Password & OTP</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-start gap-3 group">
        <MdCheckCircle className="text-purple-500 mt-1 shrink-0 group-hover:scale-110 transition-transform" />
        <span className="text-sm text-gray-600 font-medium">
            {text}
        </span>
    </li>
);

export default ExclusivePlan;