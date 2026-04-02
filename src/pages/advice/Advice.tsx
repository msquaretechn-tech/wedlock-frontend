import AdviceCard from "../../components/AdviceCard/AdviceCard";

const adviceCardData = [
  {
    imageSrc: "/Advice-1.jpg",
    title: "Attraction vs. Compatibility",
    hoverContent: `Attraction can be instant and exciting, drawing two people together through physical appeal or an emotional connection. However, true compatibility goes deeper—it’s the glue that keeps a relationship thriving over time. Compatibility is about aligning on key life aspects such as values, long-term goals, lifestyles, and emotional needs.`,
  },
  {
    imageSrc: "/Advice-2.jpg",
    title: "Finding Yourself First",
    hoverContent: `Before you can form a strong relationship with someone else, you need to have a clear understanding of who you are. Self-awareness forms the foundation of a healthy partnership. It’s about recognising your values, passions, and life goals while identifying what you want and need in a partner.`,
  },
  {
    imageSrc: "/Advice-3.jpg",
    title: "Effective Communication in Relationships",
    hoverContent: `Effective communication isn’t just about talking; it’s about connecting. Communication allows couples to build trust, resolve conflicts, and understand each other’s needs and perspectives.`,
  },
  {
    imageSrc: "/Advice-4.jpg",
    title: "Setting Realistic Expectations",
    hoverContent: `It’s natural to have a vision of your ideal partner, but rigid expectations can prevent you from recognising genuine connections. A healthy relationship thrives on realistic expectations, rooted in mutual respect, shared values, and open-mindedness.`,
  },
  {
    imageSrc: "/Advice-5.jpg",
    title: "Building Emotional Intimacy",
    hoverContent: `Emotional intimacy is what transforms a relationship from superficial to profound. It’s about creating a safe space where both partners feel seen, heard, and valued.`,
  },
  {
    imageSrc: "/Advice-6.jpg",
    title: "How to Know if They're ‘The One’",
    hoverContent: `Determining if someone is “The One” isn’t about waiting for a perfect person or a magical moment; it’s about recognising a sense of alignment and ease in the relationship.`,
  },
];

const Advice = () => {
  return (
    <div className="pt-8 font-lato">
      <div className="px-4 sm:px-20 py-16">
        <div className="py-16 space-y-8 xl:px-6 2xl:px-28 text-center">
          <h1
            className="text-4xl font-bold tracking-wide"
            style={{ fontFamily: "Proxima-Nova-regular" }}
          >
            Your Guide to Finding Perfect Matrimonial Match and Building Strong
            Relationships
          </h1>
          <p
            className="text-[#42526B] max-w-3xl mx-auto leading-7 text-lg"
            style={{ fontFamily: "Proxima-Nova-Regular" }}
          >
            Building meaningful relationships starts with self-awareness, trust,
            and open communication. Wedlock Australia provides insights to help
            you navigate challenges, foster emotional intimacy, and create
            lasting connections aligned with your values.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:px-6 2xl:px-28">
          {adviceCardData.map((card, index) => (
            <AdviceCard
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              hoverContent={card.hoverContent}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advice;
