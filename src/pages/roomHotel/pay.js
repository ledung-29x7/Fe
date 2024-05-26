import { useNavigate } from "react-router-dom";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import InputRoom from "./inputRoom";
import * as apis from "../../apis";
import { useState } from "react";

function Pay() {

    const [state, dispatch] = useStore();
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
                            console.log(res)
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
        FetchData();
    }

    return (
        <div className="flex flex-col containerr px-8 ">
            <div className=" flex py-6 border-b font-bold">
                <button className=" hover:text-cyan-600 flex-1">Lựa chọn của bạn</button>
                <button className=" hover:text-cyan-600 flex-1">Chi tiết đầy đủ</button>
            </div>

            <div className="py-5 flex">
                {/* info date booking */}
                <div className="flex flex-col gap-3 flex-1 px-3 ">
                    <div className="border p-4 rounded-lg flex flex-col gap-3 bg-gray-50">
                        <div className=" font-bold text-xl">
                            {getinfoBK?.nameHotel}
                        </div>
                        <div className=" text-sm">
                            {specificAddress}
                        </div>
                    </div>
                    <div className="border p-4 rounded-lg flex flex-col gap-10 bg-gray-50">
                        <div className=" grid grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <h4 className=" font-semibold">Đăng ký vào</h4>
                                <div className=" text-gray-600">{getinfoBK?.checkinDate}</div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h4 className="font-semibold">Thủ tục thanh toán</h4>
                                <div className="text-gray-600">{getinfoBK?.checkoutDate}</div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Thời gian cư trú</h4>
                            <div className="text-gray-600">
                                {getinfoBK?.durationDays} Đêm
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
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
                        <h3 className="font-bold text-xl">Tổng tiền: </h3>
                        <div className=" text-lg font-semibold">{getinfoBK?.amount} VND</div>
                    </div>
                    <div className="flex flex-col gap-6">
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
                        />
                        <div className="flex justify-between gap-5">
                            <div className="flex-1">
                                <InputRoom
                                    nameInput={"expirationDate"}
                                    placeholder={"Ngày hết hạn"}
                                    onChange={handleChange}
                                    value={infoPay.expirationDate}
                                />
                            </div>
                            <div className="flex-1">
                                <InputRoom
                                    nameInput={"cvc"}
                                    placeholder={"CVC"}
                                    onChange={handleChange}
                                    value={infoPay.cvc}
                                />
                            </div>

                        </div>
                    </div>
                    <div>
                        <button className="  bg-sky-600 rounded-3xl text-white px-6 py-3">
                            Hoàn tất đặt chỗ
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Pay;