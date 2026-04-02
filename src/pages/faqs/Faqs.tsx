import { Link } from 'react-router-dom';
import FAQ from '../../components/faqs/Faqs';
import { CiSearch, CiHeart } from "react-icons/ci";



const Faqs = () => {
  return (
    <div className=" font-Proxima-Nova-Regular z-10">
      <div className="flex flex-col items-center justify-center py-16 gap-9 bg-[#E6F2F7] px-[16px]">
        <span className="text-blue-600 ">FAQs</span>
        <h1 className="text-5xl font-semibold ">Frequently asked questions</h1>
        <h4 className="text-[#475467]">Have questions? We’re here to help.</h4>
        <div className="flex items-center border-2 border-[#D0D5DD] rounded h-10 w-60 bg-white">
          <CiSearch className="text-3xl" />
          <input
            type="text"
            className="w-full h-full rounded-[8px] border-none"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-8 bg-[#F5F4F4] px-4  md:px-20 py-10 card_container">
        <div className="flex flex-col items-center justify-center gap-8 faqs_card">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#007EAF] text-2xl"/>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 w-full">
          <h1 className="text-xl font-semibold">What is Wedlock Australia?
          </h1>
          <p className="text-[#475467] text-center">
          Wedlock Australia is an AI-powered matrimonial platform designed for individuals seeking meaningful, long-term relationships.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 faqs_card">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#007EAF] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-xl font-semibold">How does your matchmaking process work?
          </h1>
          <p className="text-[#475467] text-center">
          Our AI algorithm considers your preferences, values, and goals to suggest compatible matches.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 faqs_card">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#007EAF] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Is Wedlock Australia free to use?</h1>
          <p className="text-[#475467] text-center">
          We offer a free Explorer plan with limited features and paid plans for enhanced matchmaking options.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 faqs_card">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#007EAF] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">How do you ensure privacy and security?</h1>
          <p className="text-[#475467] text-center">
          We use advanced encryption and rigorous profile verification to protect your personal information.
          </p>
          </div>
        </div>
         <div className="flex flex-col items-center justify-center gap-8 faqs_card">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#007EAF] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-xl font-semibold">Can I update my profile preferences?</h1>
          <p className="text-[#475467] text-center">
          Yes, you can modify your profile details and preferences anytime through your account settings.
          </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 faqs_card">
          <div className="rounded-full bg-[#F4EBFF] w-10 h-10 flex items-center justify-center">
            <CiHeart className="text-[#007EAF] text-2xl"/>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 text-center">
          <h1 className="text-xl font-semibold">How does Wedlock Australia handle cultural or religious preferences?</h1>
          <p className="text-[#475467] text-center">
          Our platform allows you to specify cultural or religious preferences in your profile. This ensures matches are tailored to align with your personal values and traditions.
          </p>
          </div>
        </div>
        
      </div>
      <FAQ /> 
      <div className="py-20 text-center bg-[#F5F4F4] space-y-8">
        <p className="font-bold">Still have questions?</p>
        <p className='text-[#475467] pb-5 '>Can’t find the answer you’re looking for? Please chat to our friendly team.</p>
        <Link to={'/contact-us'} className="bg-[#007EAF] text-white py-2 px-4 rounded 2">Get in touch</Link>
      </div>
    </div>
  );
}

export default Faqs
