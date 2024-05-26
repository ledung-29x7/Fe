import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actionsGetData } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import * as apis from "../../../apis"
import RowList from "./rowList";

function ListUser() {
    const [isSucc,setIsSucc] = useState(false);
    const [bookings,setBookings] = useState([]);
    const [detailBk,setDetailBk] = useState({});
    const [state, dispatch] = useStore();
    const { idEdit,getData } = state;

    
    useEffect(() => {
        const CallData = () => {
            dispatch(actionsGetData.getData("bookings")
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
        <div className=" my-10 px-10">
            <div className=" containerr">
                <div className=" flex justify-between items-center">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-4xl w-80">
                            User List
                        </h4>
                        <img className="w-24" src="../icon/heading-border.png" alt="" />
                    </div>
                    <div className="mx-10 ">
                        <button className="buttom_crud w-20 h-8 bg-lime-600">Add</button>
                    </div>
                </div>
                <div className="frame mt-5 shadow_uslist relative">
                    <table className=" w-full shadow ">
                        <tr className="sticky top-0 bg-slate-200 h-12">
                            <th>ID</th>
                            <th>Email khách hàng</th>
                            <th>Tên khách sạn </th>
                            <th>Ngày check in</th>
                            <th>Ngày checkout</th>
                            <th>Tổng tiền</th>
                            <th>Details</th>
                        </tr>
                        {bookings?.map((dt)=>
                            <RowList
                                room={dt}
                            />
                        )}
                    </table>
                </div>
                
            </div>
        </div>
    );
}
export default ListUser;