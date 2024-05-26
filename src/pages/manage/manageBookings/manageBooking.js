import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actionsGetData } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import * as apis from "../../../apis"
import RowBooking from "./rowBooking";
import DetailsBookings from "./detailsBooking";

function ManagerBooking(){

    const [isShowDetail, setIsShowDetail] = useState(false);
    const [bookings,setBookings] = useState([]);
    const [detailBk,setDetailBk] = useState({});
    const [state, dispatch] = useStore();
    const {isEdit, idEdit,getData } = state;
    
    useEffect(() => {
        const CallData = () => {
            dispatch(actionsGetData.getDataManager("bookings")
            .then((data)=>{
                dispatch(actionsGetData.GetDataUser(data.data))
            }));
        }
        CallData()
    },[])

    // assign value to users
    useEffect(()=>{
        setBookings(getData)
    },[getData])
    console.log(bookings)

    // Open Detail
   

    return(
        <div className=" my-10 px-10">
            <div className=" containerr">
                <div className=" flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-4xl w-80">
                            Danh sách khách hàng bookings
                        </h4>
                        <img className="w-24" src="../icon/heading-border.png" alt="" />
                    </div>
                    
                </div>
                <div className=" mt-5 relative">
                    <table className=" w-full  ">
                        <tr className=" text-left bg-slate-200 h-12">
                            <th>Tên Khách Hàng</th>
                            <th>Tên khách sạn </th>
                            <th>Ngày check in</th>
                            <th>Ngày checkout</th>
                            <th>Tổng tiền</th>
                            <th>Details</th>
                        </tr>
                        {bookings?.map((dt)=>
                            <RowBooking
                                booking={dt}
                            />
                        )}
                    </table>
                </div>
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