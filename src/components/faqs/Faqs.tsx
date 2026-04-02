import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";

import React, { useState ,useEffect} from 'react';

type FAQ = {
  question: string;
  answer: string;
};


const faqs: FAQ[] = [
  {
    question: 'What is Wedlock Australia?',
    answer: 'Wedlock Australia is an innovative, subscription-based matrimonial and matchmaking service powered by artificial intelligence. We connect individuals from diverse nationalities, communities, and religious backgrounds, making it easier for people to find meaningful relationships in Australia and around the globe.'
  },
  {
    question: 'How does the matchmaking process work?',
    answer: 'Our AI-driven algorithm analyzes user profiles, preferences, and behaviors to provide personalized matches. Once you create your profile, our system will suggest potential partners based on compatibility factors, helping you connect with individuals who share similar interests and values.'
  },
  {
    question: 'What are the different subscription plans available?',
    answer: `We offer three subscription plans:
      Standard Membership: Free access with limited features.
      Premium Membership: Affordable access to enhanced features for a more comprehensive experience.
      Exclusive Membership: Tailored service for elite members seeking personalized matchmaking support.`
  },
  {
    question: 'Can I use Wedlock Australia for free?',
    answer: 'Yes! The Standard Membership plan allows you to create a profile and access limited matches at no cost. This is a great way to explore our platform before deciding to upgrade to a paid subscription.'
  },
  {
    question: 'What features are included in the Premium Membership Plan?',
    answer: 'The Premium Plan includes all Standard Membership features plus unlimited matches, advanced search filters, profile visibility enhancements, priority customer support, and access to monthly webinars on relationship advice.'
  },
  {
    question: 'What makes Wedlock different from other matchmaking and matrimonial platforms?',
    answer: 'Wedlock is unique because it focuses on providing a comprehensive matrimonial service that caters to individuals from all backgrounds. Our AI-powered matchmaking system is designed specifically for meaningful connections rather than casual dating, ensuring a more serious approach to finding perfect match.'
  },
  {
    question: 'How do I create a profile on Wedlock?',
    answer: 'Creating a profile is simple! Visit our website, click on the "Start free today" button, and follow the prompts to fill out your details. You’ll be asked to provide information about yourself, your interests, and what you’re looking for in a partner. You can also download our App on Playstore or Appstore.'
  },
  {
    question: 'Is my personal information safe with Wedlock?',
    answer: 'Absolutely! We prioritize your privacy and employ advanced security measures to protect your personal information. Your data will only be used for matchmaking purposes and will not be shared with third parties without your consent.'
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time through your account settings. If you cancel before the end of your billing cycle, you will still have access to your plan until that period ends.'
  },
  {
    question: 'What if I don’t find a match?',
    answer: 'While we strive to provide quality matches based on your preferences, finding the right partner can take time. We encourage you to stay active on the platform by updating your profile and engaging with other members to increase your chances of finding a match.'
  },
  {
    question: 'Are there any age restrictions for using Wedlock?',
    answer: 'Yes, users must be at least 18 years old to create an account on Wedlock Australia. This ensures that all members are legally able to enter into relationships.'
  },
  {
    question: 'How can I contact customer support if I have questions?',
    answer: 'You can reach our customer support team via email at info@wedlock.au or by calling our dedicated support line listed on our website. We’re here to assist you with any inquiries or issues you may encounter.'
  },
  {
    question: 'Does Wedlock offer any events or workshops?',
    answer: 'Yes! As part of our Premium and Exclusive Membership Plans, we occasionally host exclusive events and workshops designed for networking and relationship-building among our members. These events provide valuable opportunities to meet like-minded individuals in a relaxed setting.'
  },
  {
    question: 'Can I change my subscription plan later?',
    answer: 'Absolutely! You can upgrade your subscription plan at any time through your account settings. If you decide to upgrade, the new features will be available immediately upon payment confirmation.'
  },
  {
    question: 'What should I do if I encounter issues while using the platform?',
    answer: 'If you experience any technical difficulties or have concerns about your account, please contact our customer support team immediately. We are committed to resolving any issues promptly so that you can enjoy a seamless experience on our platform.'
  },
];
type FAQItemProps = {
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
};



const FAQ: React.FC = () => {
  const {user } = useSelector((state: RootState) => state.userReducer) ;

  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });


  const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => (
    <div className="space-y-5">
      <button
        className={`w-full text-left py-4 px-6 flex justify-between items-center border mb-10 ${isExclusive ? 'bg-[#60457E]' : 'bg-[#007EAF]'} border-white rounded-2xl`}
        onClick={onClick}
      >
        <span className="text-white">{faq.question}</span>
        <span className="text-white">{isOpen ? '-' : '+'}</span>
      </button>
      {isOpen && (
        <div className="bg-[#FFD27A] rounded-2xl text-black py-4 px-6">
          {faq.answer.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
  
 
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen flex  flex-col items-center justify-center px-[16px]  11xl-[100%]">
      <div className="w-full max-w-2xl mt-2 mb-2 space-y-12">
        <h2 className="text-5xl text-center text-black mb-4 mt-10">Frequently asked questions</h2>
        <p className="text-gray-400 mb-8">
        We understand that finding compatibility for matrimony is a significant step, and you may have questions about how our platform works. Here, we’ve compiled answers to some of the most common queries to help you navigate your journey with ease. Whether it’s about our process, features, or security measures, you’ll find all the information you need right here.
        </p>
        <div className="rounded-2xl space-y-5  ">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default FAQ;
