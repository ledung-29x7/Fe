import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actionsGetData } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import * as apis from "../../../apis"
import RowBooking from "./rowBooking";
import DetailsBookings from "./detailsBooking";

function ManagerBooking() {

    const [isShowDetail, setIsShowDetail] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [detailBk, setDetailBk] = useState({});
    const [state, dispatch] = useStore();
    const { isEdit, idEdit, getData } = state;

    useEffect(() => {
        const CallData = () => {
            dispatch(actionsGetData.getDataManager("bookings")
                .then((data) => {
                    dispatch(actionsGetData.GetDataUser(data.data))
                }));
        }
        CallData()
    }, [])

    // assign value to users
    useEffect(() => {
        setBookings(getData)
    }, [getData])
    console.log(bookings)

    // Open Detail


    return (
        <div className=" px-10 bg-gray-50 py-10 rounded-md">
            <div className=" containerr bg-gray-50">
                <div className="flex justify-between pb-6">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-lg text-gray-600">
                            Danh sách khách hàng booking
                        </h4>
                    </div>

                </div>

                {bookings?.length === 0 ?

                    <div className="mt-4 flex items-center justify-center rounded-md bg-white py-16">
                        <span className=" text-xl text-gray-400 mr-3">
                            <FontAwesomeIcon icon="fa-solid fa-list" />
                        </span>
                        <h4 className=" text-lg font-semibold text-gray-300">Danh sách trống </h4>
                    </div>

                    :

                    <div className="mt-4 rounded-md bg-white">
                        <table className=" w-full  ">
                            <tr className="text-left text-sm text-gray-700  h-12">
                                <th>Tên Khách Hàng</th>
                                <th>Tên khách sạn </th>
                                <th>Ngày booking</th>
                                <th>Tổng tiền</th>
                                <th>Thao tác</th>
                            </tr>
                            {bookings?.map((dt) =>
                                <RowBooking
                                    booking={dt}
                                />
                            )}
                        </table>
                    </div>
                }

                {isShowDetail ?
                    <div className="modal z-50">
                        <div className="flex w-full h-full">
                            <div id="overlay" className="modal_overlay"></div>
                            <div className="modal_body">
                                <DetailsBookings detail={detailBk} />
                            </div>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>
    );
}
export default ManagerBooking;