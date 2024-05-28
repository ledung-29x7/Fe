import Utilities from "../hotelComponets/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/contexts";
import { actions, actionsGetData } from "../../store/action";
import { useEffect, useState } from "react";
import { format } from "../logic";

function InfoRoom({ dataInfoRoom, max }) {
  const [, dispath] = useStore();
  const [count, setCount] = useState(0);
  const [singleRoomCount, setSingleRoomCount] = useState(0);
  const [doubleRoomCount, setDoubleRoomCount] = useState(0);
  const [familyRoomCount, setFamilyRoomCount] = useState(0);
  const [imageRoom, setImageRoom] = useState("");


  const handleDetailRoom = () => {
    dispath(actions.ModalInforRoom(true));
    dispath(actions.GetIdRoom(dataInfoRoom.id));
  };


  const handlePlusCount = () => {
    switch (dataInfoRoom?.roomType) {
      case "SINGLE":
        if (count < max?.maxAvailableSingleRooms) {
          return (
            setCount((cont) => (cont += 1)),
            setSingleRoomCount((pre) => (pre += 1))
          );
        }
        break;
      case "DOUBLE":
        if (count < max?.maxAvailableDoubleRooms) {
          return (
            setCount((cont) => (cont += 1)),
            setDoubleRoomCount((pre) => (pre += 1))
          );
        }
        break;

      case "FAMILY":
        if (count < max?.maxAvailableFamilyRooms) {
          return (
            setCount((cont) => (cont += 1)),
            setFamilyRoomCount((pre) => (pre += 1))
          );
        }
        break;
      default:
        break;
    }
  };

  const handleMinusCount = () => {
    if (count > 0) {
      setCount((cont) => (cont -= 1));
      if (dataInfoRoom?.roomType === "SINGLE") {
        setSingleRoomCount((prev) => (prev -= 1));
      } else if (dataInfoRoom?.roomType === "DOUBLE") {
        setDoubleRoomCount((prev) => (prev -= 1));
      } else if (dataInfoRoom?.roomType === "FAMILY") {
        setFamilyRoomCount((prev) => (prev -= 1));
      }
    }
  };

  useEffect(() => {
    var singlePrice = dataInfoRoom?.pricePerNight * singleRoomCount;

      dispath(actionsGetData.TotalPriceS(singlePrice));
      dispath(actionsGetData.CountNType({
        roomType: "SINGLE",
        count: singleRoomCount,
      }))
    

  }, [singleRoomCount]);

  useEffect(()=> {
    var doublePrice = dataInfoRoom?.pricePerNight * doubleRoomCount;
    dispath(actionsGetData.TotalPriceD(doublePrice));
      dispath(actionsGetData.CountNTypeDou({
        roomType: "DOUBLE",
        count: doubleRoomCount,
      }))
  },[doubleRoomCount])

  useEffect(()=> {
    let familyPrice = dataInfoRoom?.pricePerNight * familyRoomCount;

    dispath(actionsGetData.TotalPriceF(familyPrice));
      dispath(actionsGetData.CountNTypeFami({
        roomType: "FAMILY",
        count: familyRoomCount,
      }))
  },[familyRoomCount])


  useEffect(() => {
    function displayImages(imageDTOs) {
      if (imageDTOs?.length > 0) {
        setImageRoom(
          `data:${imageDTOs[0]?.type};base64,${imageDTOs[0]?.image}`
        );
      }
    }
    displayImages(dataInfoRoom?.imageDTOs);
  }, [dataInfoRoom]);

  return (
    <div className=" bg-white rounded-md shadow px-7 pt-6 pb-16">
      {/* title */}
      <div className=" pb-3 text-neutral-600">
        <span className=" text-xl font-semibold">{dataInfoRoom?.roomType}</span>
      </div>
      {/* info  */}
      <div className=" flex">
        {/* image and size Room */}
        <div className=" flex flex-col gap-5 flex-1 pr-4">
          <div className=" block h-60 w-full rounded-md overflow-hidden">
            <img loading="lazy" className="h-full w-full" src={imageRoom} alt="" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-center">
              <button
                className=" ease-in-out duration-200 rounded-md px-6 py-2 font-semibold text-sm bg-cyan-400 text-white active:bg-cyan-600 hover:bg-cyan-500 "
                type="buttom"
                onClick={handleDetailRoom}
              >
                xem chi tiết phòng
              </button>
            </div>
          </div>
        </div>
        {/* Utilitis Room */}
        <div className=" flex flex-col justify-between gap-6 flex-1 rounded-md bg-neutral-50 shadow-sm px-4 py-6">
          

          {/* dich vu */}
          <div className="flex-1 border-b pb-4">
            <h3 className=" text-gray-600 font-semibold text-sm mb-4">Dịch vụ phòng: </h3>
            {dataInfoRoom?.serviceDTOs?.length > 0 ?
              <div className=" grid grid-cols-2  gap-y-4">
              {dataInfoRoom?.serviceDTOs?.map((servic,index) => 
                <Utilities key={index} utilitie={servic?.name} />
              )}
            </div>
            :
              <div className=" block py-3 text-center bg-white">
                <span className="text-sm font-semibold text-gray-500">Hiện khách sạn chưa có dịch vụ</span>
              </div>
            }
          </div>

          <div className=" flex justify-between items-center">
            <div className=" px-5 py-3 rounded-lg bg-white shadow-md border flex gap-5 ">
              <button
                className="text-green-400 hover:scale-125 ease-in-out duration-200 active:text-green-600"
                onClick={handleMinusCount}
              >
                <FontAwesomeIcon icon="fa-solid fa-minus" />
              </button>
              <span>{count}</span>
              <button
                className=" text-green-400 hover:scale-125 ease-in-out duration-200 gap-5 active:text-green-600"
                onClick={handlePlusCount}
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </button>
            </div>
            <span className=" text-lg text-gray-600 font-semibold">
              {format.FormatNumber(dataInfoRoom?.pricePerNight)} VNđ
            </span>
          </div>
        </div>
        {/* end Utilitis */}
      </div>
    </div>
  );
}
export default InfoRoom;
