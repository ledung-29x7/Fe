import Utilities from "../hotelComponets/utilities";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/contexts";
import { actions, actionsGetData } from "../../store/action";
import { useEffect, useState } from "react";
import Room from "../../pages/roomHotel/room";

function InfoRoom({ dataInfoRoom, max }) {
  const [, dispath] = useStore();
  const [count, setCount] = useState(0);
  const [singleRoomCount, setSingleRoomCount] = useState(0);
  const [doubleRoomCount, setDoubleRoomCount] = useState(0);
  const [familyRoomCount, setFamilyRoomCount] = useState(0);

  const handleDetailRoom = () => {
    dispath(actions.ModalInforRoom(true));
    dispath(actions.GetIdRoom(dataInfoRoom.id));
  };

  const handleFormBooking = () => {
    dispath(actions.ModalFormBooking(true));
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
    dispath(
      actionsGetData.CountNType({
        roomType: "SINGLE",
        count: singleRoomCount,
      })
    );
  }, [singleRoomCount]);

  useEffect(() => {
    var doublePrice = dataInfoRoom?.pricePerNight * doubleRoomCount;
    dispath(actionsGetData.TotalPriceD(doublePrice));
    dispath(
      actionsGetData.CountNType({
        roomType: "DOUBLE",
        count: doubleRoomCount,
      })
    );
  }, [doubleRoomCount]);

  useEffect(() => {
    var familyPrice = dataInfoRoom?.pricePerNight * familyRoomCount;
    dispath(actionsGetData.TotalPriceF(familyPrice));
    dispath(
      actionsGetData.CountNType({
        roomType: "FAMILY",
        count: familyRoomCount,
      })
    );
  }, [familyRoomCount]);

  const [imageRoom, setImageRoom] = useState("");

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
  console.log(dataInfoRoom);

  return (
    <div className="box px-5 py-6">
      {/* title */}
      <div className=" py-3">
        <span className=" text-xl font-semibold">{dataInfoRoom?.roomType}</span>
      </div>
      {/* info  */}
      <div className=" flex">
        {/* image and size Room */}
        <div className=" flex flex-col gap-5 flex-1 pr-4">
          <div className=" w-72 rounded-2xl overflow-hidden">
            <img src={imageRoom} alt="" />
          </div>
          <div className="flex flex-col gap-6">
            <span className=" text-gray-600">{30} m2</span>
            <div className="flex flex-col gap-3">
              <Utilities utilitie={"vòi tắm đứng"} />
              <Utilities utilitie={"tủ lạnh khu vực chờ"} />
              <Utilities utilitie={"máy lạnh"} />
            </div>
            <div className="flex justify-center">
              <button
                className=" rounded-2xl px-6 py-1 bg-cyan-400 text-white active:bg-cyan-600 hover:bg-cyan-500 "
                type="buttom"
                onClick={handleDetailRoom}
              >
                xem chi tiết phòng
              </button>
            </div>
          </div>
        </div>
        {/* Utilitis Room */}
        <div className=" flex flex-col justify-between gap-6 flex-1 border-2 rounded-xl px-4 py-6">
          <div className=" flex flex-col gap-4 pb-3 border-b ">
            <span className=" text-lg font-semibold">
              {dataInfoRoom.roomType}
            </span>
            <div className=" flex justify-between px-4 text-gray-600">
              <span className="">{1} người</span>
              <span className="">{2} người</span>
            </div>
          </div>
          {/*  */}
          <div className="flex-1 border-b pb-4">
            <div className=" grid grid-cols-2  gap-y-4">
              <Utilities utilitie={"không gồm bữa sáng "} />
              <Utilities utilitie={"Không đổi lịch "} />
              <Utilities utilitie={"Wifi miễn phí "} />
              <Utilities utilitie={"hủy phòng có thu phí"} />
              <Utilities utilitie={"Không hút thuốc "} />
              <Utilities utilitie={"Không hoàn tiền "} />
            </div>
          </div>
          <div className=" flex justify-between items-center">
            <div className=" px-5 py-3 box flex gap-5 ">
              <button
                className="text-green-400 active:text-green-600"
                onClick={handleMinusCount}
              >
                <FontAwesomeIcon icon="fa-solid fa-minus" />
              </button>
              <span>{count}</span>
              <button
                className=" text-green-400 gap-5 active:text-green-600"
                onClick={handlePlusCount}
              >
                <FontAwesomeIcon icon="fa-solid fa-plus" />
              </button>
            </div>
            <span className=" text-xl font-semibold">
              {dataInfoRoom.pricePerNight} VND
            </span>
          </div>
        </div>
        {/* end Utilitis */}
      </div>
    </div>
  );
}
export default InfoRoom;
