import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import * as apis from "../../../apis";
import { format } from "../../../componet/logic";

function DetailsBookings() {

    const navigate = useNavigate()
    const [infoBooked, setInfoBooked] = useState();
    const [errors, setErrors] = useState("");
    const [showError, setShowError] = useState(false);
    const [state,] = useStore();
    const { idEdit } = state;

    useEffect(() => {
        const FetchData = async () => {
            try {
                if (idEdit !== null) {
                    const response = await apis.getManager(`booking/${idEdit}`)
                    setInfoBooked(response.data)
                }
            } catch (error) {
                if (error?.response?.status === 403) {
                    setErrors("Vui lòng đăng nhập tài khoản Manager để xem danh sách")
                }
                setShowError(true)
            }

        }
        FetchData();
    }, [idEdit])

    useEffect(() => {
        setTimeout(() => {
            setShowError(false)
        }, 8000);

    }, [showError])

    return (
        <div className="">
            <div className="flex flex-col gap-8 containerr px-8 py-8 ">
                <div className="flex flex-col gap-8">
                    <div className=" bg-blue-400 py-6 px-5 rounded-t-2xl">
                        <h3 className="font-bold text-xl">Xác nhận đặt phòng</h3>
                    </div>
                    {/*  */}
                    <div className=" flex-col flex gap-7 border-2 rounded-md bg-neutral-50 shadow-sm px-5">
                        {/*  number*/}
                        <div className=" border-b-2 py-4">
                            <h4 className="font-semibold text-sm text-slate-800">Số xác nhận: </h4>
                            <div className="">{infoBooked?.confirmationNumber}</div>
                        </div>
                        {/* info Booking */}
                        <div className="flex flex-col gap-6 border-b-2">
                            {/* name Hotel */}
                            <div className="">
                                <h4 className=" text-lg font-bold">{infoBooked?.hotelName}</h4>
                                <div className="flex gap-2">
                                    <span className=" text-sm text-gray-600">{infoBooked?.hotelAddress?.addressLine}</span>
                                    <span className=" text-sm text-gray-600">{infoBooked?.hotelAddress?.district}</span>
                                    <span className=" text-sm text-gray-600">{infoBooked?.hotelAddress?.city}</span>
                                    <span className=" text-sm text-gray-600">{infoBooked?.hotelAddress?.country}</span>
                                </div>
                            </div>

                            {/* Date Booking */}
                            <div className="flex justify-around">
                                <div className="block text-center">
                                    <h4 className="font-semibold text-sm text-slate-800">Check in</h4>
                                    <p className=" text-gray-600 text-sm">{infoBooked?.checkinDate}</p>
                                </div>
                                <div className="block text-center">
                                    <h4 className="font-semibold text-sm text-slate-800">Check out</h4>
                                    <p className="text-gray-600 text-sm">{infoBooked?.checkoutDate}</p>
                                </div>
                                <div className="block text-center">
                                    <h4 className="font-semibold text-sm text-slate-800">Khoảng thời gian</h4>
                                    <p className="text-sm text-gray-600">{infoBooked?.durationDays} đêm</p>
                                </div>
                            </div>

                            {/*  */}
                            <div className="flex flex-col gap-2 pb-3">
                                <h4 className="font-semibold text-sm text-slate-800">Phòng:</h4>
                                {infoBooked?.roomSelections?.map((room) =>
                                    <div className="px-5">{room?.count} loại {room?.roomType}</div>
                                )}
                            </div>
                        </div>
                        {/* phuong thuc lien lac  */}
                        <div className="flex flex-col gap-6 pb-5">
                            <div className="flex gap-5 items-center">
                                <h4 className=" text-lg font-bold">Tổng tiền:</h4>
                                <div>
                                    <p className=" font-semibold">{format.FormatNumber(infoBooked?.totalPrice)}</p>
                                    <p className=" font-semibold text-sm">VNđ</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5">
                                <h4 className="font-semibold text-sm">Phương thức thanh toán:</h4>
                                <p className="text-sm">{infoBooked?.paymentMethod}</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                <h4 className="font-semibold text-sm">Chi tiết khách hàng:</h4>
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-3">
                                        <span className="text-gray-700 text-sm">Tên khách hàng:</span>
                                        <span className=" text-gray-600 text-sm"> {infoBooked?.customerName}</span>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="text-gray-700 text-sm">Email:</span>
                                        <span className="text-gray-700 text-sm">
                                            {infoBooked?.customerEmail}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5 justify-end">
                    <button onClick={() => navigate("/manager/manageBookings")} className=" rounded-md border font-bold px-10 py-3 text-sm text-white  bg-indigo-600">Thoát</button>

                </div>
            </div>

            {showError ?
                <div className=" fixed top-24 right-6 w-80 text-center bg-white shadow-md">
                    <div className="w-full h-1 bg-red-500"></div>
                    <div className=" py-4 text-xs px-4 font-semibold text-red-400 ">{errors}</div>
                </div>
                :
                null}

        </div>
    );
}
export default DetailsBookings;