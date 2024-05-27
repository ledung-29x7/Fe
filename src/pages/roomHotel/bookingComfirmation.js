import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import * as apis from "../../apis"

function BookingComfirmation() {

    const navigate = useNavigate()
    const [state,] = useStore();
    const [infoBooked, setInfoBooked] = useState();
    const [isSucc, setIsSucc] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState("");
    const { getIdBooking } = state;

    console.log(getIdBooking)

    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await apis.Confirmation(getIdBooking)
                setInfoBooked(response)
            } catch (error) {
                if (error.response.status === 403) {
                    setErrors("Vui lòng đăng nhập để xem thông tin")
                }
                setErrors(true)
            }
        }
        FetchData();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowError(false)
        }, 8000);

    }, [showError])

    useEffect(()=> {
        setTimeout(() => {
            setIsSucc(false)
        }, 8000);
    },[isSucc])


    return (
        <div className="">
            <div className="flex flex-col gap-8 containerr px-8 py-8 ">

                <div className="flex flex-col gap-5">
                    <div className=" bg-blue-400 py-6 px-5 rounded-t-2xl">
                        <h3 className="font-bold text-xl">Xác nhận đặt phòng</h3>
                    </div>

                    {/*  */}
                    <div className=" flex-col flex gap-7 border-2 rounded-lg px-5">
                        {
                            isSucc ?
                                <div className=" py-3 block mt-3 bg-green-600 rounded-md text-center">
                                    <span className=" text-white text-sm font-bold">
                                        Đã đặt thành công
                                    </span>
                                </div>
                            : null
                        }

                        {/*  number*/}
                        <div className=" border-b-2 py-4">
                            <h4 className="font-semibold">Mã xác nhận:  </h4>
                            <div className="">{infoBooked?.confirmationNumber}</div>
                        </div>
                        {/* info Booking */}
                        <div className="flex flex-col gap-6 border-b-2">
                            {/* name Hotel */}
                            <div className="">
                                <h4 className=" text-xl font-bold">{infoBooked?.hotelName}</h4>
                                <div className="flex gap-1 py-2">
                                    <span className=" text-sm text-gray-600">
                                        {infoBooked?.hotelAddress?.addressLine},
                                    </span>

                                    <span className="text-sm text-gray-600">
                                        {infoBooked?.hotelAddress?.district},

                                    </span>

                                    <span className="text-sm text-gray-600">
                                        {infoBooked?.hotelAddress?.city},

                                    </span>

                                    <span className="text-sm text-gray-600">
                                        {infoBooked?.hotelAddress?.country}
                                    </span>
                                </div>
                            </div>

                            {/* Date Booking */}
                            <div className="flex justify-around">
                                <div className=" text-center">
                                    <h4 className="font-semibold">Check In</h4>
                                    <p className=" text-gray-600">{infoBooked?.checkinDate}</p>
                                </div>
                                <div className=" text-center">
                                    <h4 className="font-semibold">Check Out</h4>
                                    <p className="text-gray-600">{infoBooked?.checkoutDate}</p>
                                </div>
                                <div className=" text-center">
                                    <h4 className="font-semibold">Số ngày lưu trú</h4>
                                    <p className="">{infoBooked?.durationDays} Đêm</p>
                                </div>
                            </div>

                            {/*  */}
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold">Loại phòng: </h4>
                                {infoBooked?.roomSelections?.map((room) =>
                                    <div className="px-5">{room?.count} loại {room?.roomType}</div>
                                )}
                            </div>
                        </div>
                        {/* phuong thuc lien lac  */}
                        <div className="flex flex-col gap-6 pb-5">
                            <div className="flex gap-5 items-center">
                                <h4 className=" text-xl font-bold">Tổng tiền:</h4>
                                <p className=" font-semibold text-xl">{infoBooked?.totalPrice} VND</p>
                            </div>
                            <div className="flex items-center gap-5">
                                <h4 className="font-semibold">Phương thức thanh toán:</h4>
                                <p className="text-sm">{infoBooked?.paymentMethod}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-semibold">Thông tin khách hàng:</h4>
                                <div className="flex flex-col gap-2">
                                    <p className="text-gray-600">Tên: {infoBooked?.customerName}</p>
                                    <p className="text-gray-600">Email: {infoBooked?.customerEmail}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <button onClick={() => navigate("/")} className=" text-cyan-600 rounded-md text-sm px-5 py-2 border font-bold border-cyan-500">Trang chủ</button>
                    <a href="/bookings"
                        className=" text-white rounded-md text-sm px-5 py-2 font-bold bg-cyan-600">Chỗ đã đặt</a>
                </div>
            </div>
            {showError ?
                <div className=" fixed top-24 right-6 w-80 text-center bg-neutral-50 shadow">
                    <div className="w-full h-1 bg-red-600"></div>
                    <div className=" py-4 text-sm px-4 font-semibold text-red-400 ">{errors}</div>
                </div>
                :
                null}
        </div>
    );
}
export default BookingComfirmation;