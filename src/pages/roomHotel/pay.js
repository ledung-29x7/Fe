import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import InputRoom from "./inputRoom";
import * as apis from "../../apis";
import { useState } from "react";
import { format } from "../../componet/logic";

function Pay() {

    const [state, dispatch] = useStore();
    const [showError, setShowError] = useState(false);
    const [errors, setErrors] = useState("");
    const {getinfoBK} = state;
    const specificAddress = getinfoBK?.address?.addressLine + ", " + getinfoBK?.address?.district + ", " + getinfoBK?.address?.city + ", " + getinfoBK?.address?.country;
    const navigate = useNavigate();
    const [infoPay, setInfoPay] = useState({

        cardholderName: "",
        cardNumber: "",
        expirationDate: "",
        cvc: ""

    });

    const handleChange = (e) => {
        setInfoPay({ ...infoPay, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        const FetchData = async () => {
            e.preventDefault();
            try {
                await apis.Payment(infoPay)
                    .then(res => {
                        if (res.status === 200) {
                            dispatch(actions.GetIdBooking(res.data.id))
                            navigate("/bookingConfirmation")
                            dispatch(actions.ModalSuccsessfull(true))
                        }
                    })
            } catch (error) {
                setErrors("Không lấy được thông tin")
                setShowError(true)
            }
        }
        FetchData();
    }

    return (
        <div className="flex flex-col containerr px-8">

            <div className="py-5 flex sm:my-12 pb-64">
                {/* info date booking */}
                <div className="flex flex-col shadow rounded-md border gap-3 flex-1 p-4 ">
                    <div className="border p-4 rounded-lg flex flex-col gap-3 bg-gray-50">
                        <div className=" font-bold text-xl">
                            {getinfoBK?.nameHotel}
                        </div>
                        <div className=" text-sm">
                            {specificAddress}
                        </div>
                    </div>
                    <div className=" border p-4 rounded-lg flex flex-col gap-10 bg-neutral-50">
                        <div className=" grid grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <h4 className=" font-semibold text-sm">Check in</h4>
                                <div className=" text-gray-600 text-sm">{getinfoBK?.checkinDate}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold text-sm">Check out</h4>
                                <div className="text-gray-600 text-sm">{getinfoBK?.checkoutDate}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 text-sm">
                            <h4 className="font-semibold ">Thời gian cư trú</h4>
                            <div className="text-gray-600">
                                {getinfoBK?.durationDays} Đêm
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 text-sm">
                            <h4 className="font-semibold">Phòng đã chọn</h4>
                            <div className="flex flex-col gap-2">
                                {getinfoBK?.roomSelections?.map((typeR)=>
                                    <div className=" text-gray-600 flex gap-2">
                                        <span>{typeR?.count} phòng</span>
                                        <span> loại</span>
                                        <span className=" font-semibold">{typeR?.roomType}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* enter info Pay */}
                <form action="/pay" className="flex flex-col justify-between flex-[2_1_0%] px-5 gap-10" onSubmit={handleSubmit}>
                    <div className=" flex gap-5 items-center">
                        <h3 className="font-bold text-lg">Tổng tiền: </h3>
                        <div className=" text-gray-800 font-semibold">{format.FormatNumber(getinfoBK?.amount)} VNđ</div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <InputRoom
                            nameInput={"cardholderName"}
                            placeholder={"Tên khách hàng"}
                            onChange={handleChange}
                            value={infoPay.cardholderName}
                        />
                        <InputRoom
                            nameInput={"cardNumber"}
                            placeholder={"Số thẻ"}
                            onChange={handleChange}
                            value={infoPay.cardNumber}
                            max={16}
                        />
                        <div className="flex justify-between gap-5">
                            <div className="flex-1">
                                <InputRoom
                                    nameInput={"expirationDate"}
                                    placeholder={"Ngày hết hạn"}
                                    onChange={handleChange}
                                    value={infoPay.expirationDate}
                                    max={5}
                                />
                            </div>
                            <div className="flex-1">
                                <InputRoom
                                    nameInput={"cvc"}
                                    placeholder={"CVC"}
                                    onChange={handleChange}
                                    value={infoPay.cvc}
                                    max={3}
                                />
                            </div>

                        </div>
                    </div>
                    <div className=" block text-end">
                        <button className=" text-sm font-semibold bg-blue-600 rounded-md hover:bg-blue-700 active:bg-blue-500 active:scale-95 ease-in-out duration-200 text-white px-6 py-3">
                            Hoàn tất đặt chỗ
                        </button>
                    </div>
                </form>

                {showError ?
                <div className=" fixed top-24 right-6 w-80 text-center bg-neutral-50 shadow">
                    <div className="w-full h-1 bg-red-600"></div>
                    <div className=" py-4 text-sm px-4 font-semibold text-red-400 ">{errors}</div>
                </div>
                :
                null}

            </div>
        </div>
    );
}
export default Pay;