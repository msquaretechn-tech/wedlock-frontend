import { useState, useEffect } from "react";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import StoryCard from "./StoryCard";
import "../../font.css";

const Stories = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cardsPerSlide, setCardsPerSlide] = useState(1);

  const stories = [
    {
      src: "/photo-1.jpg",
      title: "Sophia & Arjun",
      description:
        "We met on Wedlock, and despite being from two different countries, we found common ground through our shared values and goals. The platform’s AI technology truly understood what we were looking for in a partner. After months of late-night calls and video chats, we finally met in person, and it was everything we had hoped for. Today, we’re married, and Wedlock helped make it happen.",
      index: 0,
    },
    {
      src: "/photo-6.jpg",
      title: "Emily & John",
      description:
        "Both of us had been through previous relationships that didn’t work out, but Wedlock gave us hope again. We were both looking for something deeper—someone who understood our past and was willing to build a future together. The AI matched us based on our shared experiences and values, and from the first conversation, we felt a connection. Now, we’re planning our wedding and couldn’t be happier.",
      index: 1,
    },
    {
      src: "/photo-3.jpg",
      title: "Isabella & Liam",
      description:
        "When we first matched, we weren’t even sure we were ready for a serious relationship, but something clicked. We started with casual conversations, but as we got to know each other, we realized we had so much in common. Wedlock’s AI did a fantastic job of finding someone who matched both our personalities and our long-term goals. We’re now happily engaged!",
      index: 2,
    },
    {
      src: "/photo-4.jpg",
      title: "Olivia & Ethan",
      description:
        "We started out as friends on Wedlock, sharing common interests and getting to know each other without any pressure. Over time, those conversations turned into something more. The platform gave us the chance to build a relationship slowly and meaningfully. We’re now not only in love but also best friends, and we owe it all to Wedlock’s thoughtful matchmaking process.",
      index: 3,
    },
    {
      src: "/photo-5.jpg",
      title: "Priya & Aaron",
      description:
        "I was initially hesitant to try an AI-powered matchmaking service, but Wedlock’s personalised suggestions really surprised me. It wasn’t about superficial interests; it was about deep compatibility. After a few weeks, I matched with my now-husband, and it felt like the perfect fit right from the start. We bonded over shared values and life goals, and today, we’re happily married.",
      index: 4,
    },
    {
      src: "/photo-8.jpg",
      title: "Dua & Alex",
      description: "I had premium membership on Wedlock, which helped me find her profile really soon and also get her contact details. I was blown away with her beauty when I saw her pictures for the first time. Also, she matched my expectations like being from the hometown and a working professional, being my most important criteria. I found her profile quite interesting and so sent her a request. Once she accepted it, we had few chat conversations, then phone calls and finally decided to meet up. During our first meet itself we felt very comfortable and I liked her so much. But we still met a few times to understand each other well and better our compatibility. Then, we told our parents about it and took it further.",
      index: 5,
    }
  ];

  useEffect(() => {
    const updateCardsPerSlide = () => {
      const width = window.innerWidth;
      if (width >= 1024) setCardsPerSlide(3); // Large screens: show 3 cards
      else if (width >= 768)
        setCardsPerSlide(2); // Medium screens: show 2 cards
      else setCardsPerSlide(1); // Small screens: show 1 card
    };

    updateCardsPerSlide();
    window.addEventListener("resize", updateCardsPerSlide);
    return () => window.removeEventListener("resize", updateCardsPerSlide);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === Math.ceil(stories.length / cardsPerSlide) - 1
        ? 0
        : prevSlide + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0
        ? Math.ceil(stories.length / cardsPerSlide) - 1
        : prevSlide - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="w-full h-auto  bg-[#007EAF] ">
      <div className="overflow-hidden px-5 sm:px-20  container m-auto space-y-6  py-5 md:py-12 bg-[#007EAF] text-white relative">
        <img
          src="/curvewhite.svg"
          alt="arw"
          className="absolute w-[42rem] rotate-12 -right-10 -top-40 z-10"
        />
        <div className="  happy_story">
          <div className="flex items-center justify-between gap-5">
            <h1 className="font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop">
              Inspiring Wedlock stories
            </h1>
            <div className="flex items-center gap-4 z-10">
              <IoArrowBack
                className="md:w-10 md:h-10 hover:bg-[#009BDA] rounded-full cursor-pointer"
                onClick={prevSlide}
              />
              <IoArrowForward
                className="md:w-10 md:h-10 hover:bg-[#009BDA] rounded-full cursor-pointer"
                onClick={nextSlide}
              />
            </div>
          </div>
          <p className="text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]     xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1 mb-9">
            Witness real-life success stories from members who found love with
            Wedlock. Our platform fosters meaningful relationships, bringing
            together people from all walks of life. Hear from couples who found
            their perfect match on Wedlock Australia.
          </p>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story, index) => {
            // Calculate the range of visible cards
            const startIndex = currentSlide * cardsPerSlide;
            // const endIndex = startIndex + cardsPerSlide;

            // Adjust to show the second card on the third slide
            const adjustedStartIndex =
              cardsPerSlide === 3 && currentSlide === 2 ? 1 : startIndex;

            return (
              <div
                key={index}
                className={`relative ${index >= adjustedStartIndex &&
                    index < adjustedStartIndex + cardsPerSlide
                    ? "block"
                    : "hidden"
                  }`}
              >
                <StoryCard
                  title={story.title}
                  description={story.description}
                  imageSrc={story.src}
                />
              </div>
            );
          })}
        </div>

        {/* Indicator Dots */}
        <div className="mt-5 flex justify-center gap-1">
          {Array.from({
            length: Math.ceil(stories.length / cardsPerSlide),
          }).map((_, index) => (
            <div
              key={index}
              className={`h-2 w-4 cursor-pointer rounded-xl ${index === currentSlide ? "w-8 bg-white" : "bg-[#00587b]"
                }`}
              onClick={() => goToSlide(index)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stories;
