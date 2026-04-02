import React, { useState } from "react";

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
  <div className="space-y-5">
    <button
      className="flex w-full items-center justify-between rounded-2xl border border-white bg-[#007EAF] px-6 py-4 text-left text-white"
      onClick={onClick}
    >
      <span className="">{faq.question}</span>
      <span className="">{isOpen ? "-" : "+"}</span>
    </button>
    {isOpen && (
      <div className="rounded-2xl bg-[#FFD27AB2] px-6 py-4 text-black">
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
    <div className="flex  flex-col items-center justify-center bg-white p-8">
      <div className="w-full max-w-2xl space-y-12">
        <h2 className="mb-4 text-center text-5xl font-bold">
          Frequently asked questions
        </h2>
        <p className="mb-8 text-[#101828E5]">
          Aenean quis est erat. Pellentesque pretium convallis ligula, vitae
          euismod nisl vehicula non. In felis leo, faucibus vel sagittis
          pharetra, varius ullamcorper quam. Suspendisse potenti.
        </p>
        <div className="space-y-5 rounded-2xl">
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
