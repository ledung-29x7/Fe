import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actionsGetData } from "../../../store/action";
import RowBooking from "./rowBooking";


function ListBooking(){
    
    const [isSucc,setIsSucc] = useState(false);
    const [bookings,setBookings] = useState([]);
    const [detailBk,setDetailBk] = useState({});
    const [state, dispatch] = useStore();
    const { idEdit,getData } = state;

    // Call apis
    const CallData = () => {
        dispatch(actionsGetData.getData("bookings")
        .then((data)=>{
            dispatch(actionsGetData.GetDataUser(data.data))
        }));
    }

    // callBack apis 5s
    useEffect(() => {
        CallData();
        const callApi = setInterval(CallData, 10000)
        return() => callApi && clearInterval(callApi)
    },[])

    // assign value to users
    useEffect(()=>{
        setBookings(getData)
    },[getData])
    console.log(bookings)

    // get id Edit
    useEffect(() => {
        const GetEdit = (idEdit) => {
            if(idEdit !== null){
                var getIdEND = bookings?.find(ob => ob.id === idEdit) 
                setDetailBk(getIdEND)
            }
        }
        GetEdit(idEdit)
    },[idEdit])
    return(
        <div className="  px-10 bg-gray-50 py-10 rounded-md">
            <div className=" containerr">
                <div className="  flex justify-between items-end pb-6">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-lg text-gray-600">
                            Danh sách booking
                        </h4>
                    </div>
                </div>
                <div className=" mt-4 rounded-md bg-white">
                    <table className=" w-full ">
                        <thead className=" text-left text-sm text-gray-700 h-12">
                            <th>Tên người dùng</th>
                            <th>Tên khách sạn</th>
                            <th>Ngày booking</th>
                            <th>Tổng tiền</th>
                            <th>Chi tiết</th>
                        </thead>
                        {bookings?.map((dt)=>
                            <RowBooking
                                booking={dt}
                            />
                        )}
                    </table>
                </div>
                
            </div>
        </div>
    );
}
export default ListBooking;