import { useNavigate } from "react-router-dom";
import Utilities from "./utilities";
import * as apis from "../../apis";
import { useEffect, useState } from "react";
import { format } from "../logic";

const scrooltotop = () => {
  return window.scrollTo({
    top: 0,
    behavior: `smooth`,
  });
};

function ResultSearch({ resul }) {
  const navigate = useNavigate();
  // const [idImage,setIdImage] = useState();
  const [imageHotel, setImageHotel] = useState("");

  useEffect(() => {
    // Hàm để hiển thị ảnh từ JSON
    function displayImages(imageDTOs) {
      setImageHotel(`data:${imageDTOs[0]?.type};base64,${imageDTOs[0]?.image}`);
    }
    // Gọi hàm hiển thị ảnh
    displayImages(resul?.imageDTOs);
  }, [resul]);

  console.log(resul);
  const price = resul.roomDTOs?.find(
    (ob) => ob.roomType === "SINGLE"
  )?.pricePerNight;


  return (
    <div
      className=" h-72 flex gap-5 shadow border bg-neutral-50 rounded-md cursor-pointer items-center"
      onClick={() => (navigate(`/hotel/room/${resul.id}`), scrooltotop())}
    >
      {/* image Hotel */}
      <div className=" p-4 static">
        <img
          loading="lazy"
          className=" w-80 h-64 rounded-3xl"
          src={imageHotel}
          alt={""}
        />
      </div>

      {/* info */}
      <div className="flex flex-col flex-grow pr-5 ">
        {/* info Hotel */}
        <div className=" flex flex-col gap-4">
          <div className=" flex items-center flex-row gap-1 pl-2 w-24 opacity-75 rounded-md bg-neutral-200">
            <img className=" w-4 h-4 " src="./icon/local-80.png" alt="" />
            <p className="text-sm text-orange-600">{resul.addressDTO.city}</p>
          </div>
          <p className=" font-bold text-xl opacity-70">{resul.name}</p>
          <div className="flex items-center item gap-1 opacity-75 rounded-xl">
            <img className="w-5 h-5" src="./icon/icons8-hotel-50.png" alt="" />
            <p className=" text-base">{price}</p>
          </div>
        </div>

        {/* utilities */}
        <div className=" my-6 flex flex-wrap gap-2  ">
          <Utilities utilitie="Có điều hoà" />
          <Utilities utilitie="Có nóng lạnh" />
        </div>

        {/* price */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-300">
          <div className="flex gap-2 items-center">
            <p className=" text-lg font-semibold">{format.FormatNumber(resul.roomDTOs?.find((ob) => ob?.roomType === "SINGLE")?.pricePerNight)}</p>
            <span className="font-semibold text-xs">VNđ/ Phòng</span>
          </div>
          <button
            onClick={scrooltotop}
            className=" bg-cyan-500 text-white px-5 py-4 rounded-2xl
                     hover:bg-cyan-700
                     active:bg-cyan-800
                    flex 
                    items-center 
                    justify-center 
                    h-fit 
                    font-bold
                    "
          >
            Đặt ngay
          </button>
        </div>
      </div>
    </div>
  );
}
export default ResultSearch;
