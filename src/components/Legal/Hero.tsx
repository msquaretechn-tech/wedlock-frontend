import React from 'react'

interface HeroProps {
    updatedAt?: string
    title: string
    description?: string
}

const Hero: React.FC<HeroProps> = ({ updatedAt, title, description }: HeroProps) => {
  return (
    <div>
      <div className="space-y-4 md:space-y-6 bg-[#E6F2F7] pt-28 pb-10 md:pt-36 md:pb-16 px-4 md:px-24 text-center">
        {updatedAt ? (
          <h3 className="text-base font-semibold text-[#007EAF]">
            {updatedAt}
          </h3>
        ) : null}
        <h1 className="text-2xl md:text-4xl font-semibold">{title}</h1>
        {description ? (
          <p className="text-md md:text-xl text-[#475467] text-balance">
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default Hero
