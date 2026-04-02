import '../../font.css';

const YouTube = () => {
  return (


    <div className='w-100 h-auto bg-[#E6F2F7] '>
      <div className='relative overflow-hidden px-5 sm:px-20  container m-auto space-y-6  py-5 md:py-12' >
        <img
          src="/curvesm.svg"
          alt="arw"
          className="absolute  w-[52rem] -right-56 top-2 z-10"
        />
        <div className='   youtube'>

          <h1 className='font-Proxima-Nova-Bold text-h2-mobile md:text-h2-desktop text-[#007EAF] '>Introducing: A new wedlock experience
          </h1>
          <p className=' text-[#475467] text-[20px]  font-Proxima-Nova-Light sm:text-[16px] md:text-[20px] lg:text-[24px]  xl:text-[28px] pt-[21px] leading-[30px] sm:leading-[10px] md:leading-[24px] lg:leading-[28px] xl:leading-[42px] md:text-start mr-1 '>Your search for a great matrimonial profile has never been easier with groundbreaking overhaul of the Wedlock you know and trust.
          </p>
          <h4 className=' text-[#007EAF] pt-10 font-[Proxima-Nova-SemiBold] text-p-mobile md:text-p-desktop  '>Get a sneek peek:</h4>


          <div className="mt-10 aspect-video">
            <iframe width="100%" height="630" src="https://www.youtube.com/embed/Oo5KLeuczgw?si=PO7xh8if6hAGUqK-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </div>





        </div>


      </div>

    </div>

  )
}

export default YouTube