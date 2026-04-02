import { LoadingOutlined } from "@ant-design/icons";
import { useEffect,useState } from "react";
import { RootState } from "./../Redux/store";
import { useSelector } from "react-redux";



const Loading = () => {
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
    <div
      className=" h-[80vh] flex items-center justify-center w-full"
      role="status"
    >
      <LoadingOutlined style={{ color: `${isExclusive? '#60457E': '#007EAF'}`, fontSize: "42px", fontWeight: "bold", transition: "none" }} />
    </div>
  );
};

export default Loading;
