import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useEffect,useState } from "react";
import { RootState } from "./../../Redux/store";
import { useSelector } from "react-redux";


interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}


const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const {user } = useSelector((state: RootState) => state.userReducer) ;

  
  const [isExclusive, setIsExclusive] = useState(false);

  useEffect(() => {
    const isExclusive = localStorage.getItem("isExclusive");
    if (isExclusive === "true" || user?.usertype === "Exclusive") {
      setIsExclusive(true);
    }
    [];
  });

  

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        className={`flex items-center gap-2 rounded bg-gray-200 px-3 py-1 ${isExclusive? 'text-[#8E69B4]': 'text-[#007EAF]'} disabled:opacity-50`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <span>
          <IoIosArrowRoundBack />
        </span>
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`rounded px-3 py-1 ${
            currentPage === page ? `${isExclusive? 'bg-[#8E69B4]': 'bg-[#007EAF]'} text-white` : `${isExclusive? 'text-[#8E69B4]': 'text-[#007EAF]'}`
          }`}
          onClick={() => onPageChange(page)}
        >
          {page < 10 ? `0${page}` : page}
        </button>
      ))}
      <button
        className={`flex items-center gap-2 rounded bg-gray-200 px-3 py-1 ${isExclusive? 'text-[#8E69B4]': 'text-[#007EAF]'} disabled:opacity-50`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <span>
          <IoIosArrowRoundForward />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
