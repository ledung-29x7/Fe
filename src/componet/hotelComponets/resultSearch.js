import { useNavigate } from "react-router-dom";
import Utilities from "./utilities";
import * as apis from "../../apis";
import { useEffect, useState } from "react";

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

  // useEffect(()=> {
  //     const FetchData = async() => {
  //         try {
  //             const response = await apis.GetImage(idImage)
  //             console.log(response)
  //         } catch (error) {
  //             console.log(error)
  //         }
  //     }
  //     FetchData();
  // },[idImage])
  return (
    <div
      className=" h-72 flex gap-5 box cursor-pointer items-center"
      onClick={() => navigate(`/hotel/room/${resul.id}`)}
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
          <div className=" flex items-center flex-row gap-1 w-24 opacity-75 rounded-xl bg-slate-200">
            <img className=" w-3 h-3 " src="./icon/local-80.png" alt="" />
            <p className="text-sm">{resul.addressDTO.city}</p>
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
          <p className=" text-lg font-semibold">{price}$/ Khách</p>
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
