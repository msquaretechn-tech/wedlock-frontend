// import { FaArrowRightLong } from "react-icons/fa6";

interface StoryCardProps {
  title: string;
  description: string;
  imageSrc: string;
}

const StoryCard = ({ title, description, imageSrc }: StoryCardProps) => {
  return (
    <div className="relative max-w-sm overflow-hidden rounded-3xl bg-black text-white shadow-lg">
      <div className="relative h-96 w-full overflow-hidden md:h-full">
        <img
          className="h-full w-full object-cover opacity-70"
          src={imageSrc}
          alt="Story Image"
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-transparent to-transparent p-6">
        <h2 className="mb-2 text-xl font-bold">{title}</h2>
        <p className="mb-4 text-sm md:text-lg line-clamp-6 hover:line-clamp-none">
  {description}
</p>
        {/* <a
          href="#"
          className="flex items-center gap-2 font-bold text-white hover:underline"
        >
          Read More{" "}
          <span>
            <FaArrowRightLong />
          </span>
        </a> */}
      </div>
    </div>
  );
};

export default StoryCard;
