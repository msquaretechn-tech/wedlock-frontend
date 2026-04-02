import React, { useState } from "react";
import '../app/font.css';


type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "Morbi fringilla metus ac lacus dapibus.",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    question: "What we like to do & what we don't like to do",
    answer:
      "Sed nec pharetra felis, in ultrices neque. Phasellus varius semper tellus, ac imperdiet erat commodo id. Aenean lobortis justo et velit ornare malesuada.",
  },
  {
    question:
      "Fusce fermentum tempus sapien a sagittis tellus mattis id. Cras et enim ex.",
    answer:
      "Praesent in eros efficitur, consectetur nulla eu, bibendum mauris.",
  },
  {
    question: "Nunc aliquam tempus iaculis. Ut eu imperdiet velit.",
    answer:
      "Donec luctus, leo vitae ultricies varius, lorem nisl lacinia odio, ac pharetra neque felis nec dui.",
  },
  {
    question:
      "Nam sit amet neque auctor, dignissim augue eu, condimentum justo.",
    answer:
      "Mauris suscipit sapien nec odio tincidunt, sit amet facilisis mi scelerisque.",
  },
];

type FAQItemProps = {
  faq: FAQ;
  isOpen: boolean;
  onClick: () => void;
};

const FAQItem: React.FC<FAQItemProps> = ({ faq, isOpen, onClick }) => (
  <div  className="border-red-600 question_faqs">
    <button
      className={`w-[70rem]  h-20 py-4  px-6 flex justify-between items-center  ${
        isOpen ? "bg-[#007EAF]   text-white rounded-t-2xl " : "bg-[#F9FAFB] rounded-2xl "
      }`}
      onClick={onClick}
    >
      <span className="">{faq.question}</span>
      <span>{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && (
      <div className={`bg-[#F0F5FF] rounded-b-2xl  text-black py-4 px-6  `}>
        {faq.answer}
      </div>
    )}
  </div>
);

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen flex  items-center justify-center w-[40%] m-auto">
      <div className="   ">
        <div className="rounded-2xl space-y-5 ">
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
