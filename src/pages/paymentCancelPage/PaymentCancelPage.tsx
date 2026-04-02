import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect,useState } from 'react';

const PaymentCancelPage = () => {
  const [isExclusive, setExclusive] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    const isExclusive = localStorage.getItem("isExclusive");
    if(isExclusive){
      setExclusive(true)
    }
  },[])

  const handleGoHome = () => {
    navigate('/user-dashboard');
  };

  return (
    <div className={`flex min-h-screen flex-col items-center ${isExclusive? 'bg-[#8E69B4]': 'bg-[#007EAF]'} px-5 md:px-20 lg:px-40 3xl:px-60 py-4`}>
      <img
        src="/logowhite.png"
        alt="logo"
        className="mb-10 mt-10 h-auto w-40 md:w-36 lg:w-60"
      />
      
      <FontAwesomeIcon 
        icon={faTimesCircle} 
        size="4x" 
        className="text-red-500 mb-4" 
      />

      <div className='flex flex-col items-center '>

      <h1 className="text-3xl text-white font-Proxima-Nova-Bold mb-2">
        Oops! Payment Canceled
      </h1>
      <p className="text-xl text-white mb-2 text-center my-10">
        Your payment has been successfully canceled. If you have any questions,  please contact support.
      </p>
      <p className="text-lg text-white mb-6">
        You can retry your payment or explore other options.
      </p>
      <div className="mb-5 mt-auto flex w-full justify-end py-8 pb-4 md:mt-0 xl:px-80 2xl:mb-4 2xl:px-0 3xl:mb-20 3xl:px-0">
        <button 
          onClick={handleGoHome} 
          className={`mt-10 w-full rounded-[0.5rem] bg-[#F9F5FFE5] px-4 py-2 ${isExclusive? 'text-[#60457E]': 'text-[#007EAF]'} transition duration-300 hover:bg-[#F1F1F1]`}
        >
          Go to Dashboard
        </button>
      </div>  
      </div> 
    </div>
  );
};

export default PaymentCancelPage;
