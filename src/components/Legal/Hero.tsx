import React from 'react'

interface HeroProps {
    updatedAt: string
    title: string
    description: string
}

const Hero: React.FC<HeroProps>=({updatedAt, title, description}: HeroProps) => {
  return (
    <div>
    <div className=" space-y-5 md:space-y-10 mt-14 md:mt-0 bg-[#E6F2F7] p-4 md:p-24 text-center">
        <h3 className="text-base mt-10  font-semibold text-[#007EAF]">
          {updatedAt}
        </h3>
        <h1 className=" text-3xl md:text-5xl font-semibold">{title}</h1>
        <p className=" text-md md:text-xl text-[#475467] text-balance">
          {description}
        </p>
      </div>
    </div>
  )
}

export default Hero
