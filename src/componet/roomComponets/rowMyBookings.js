import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "../logic";

function RowMyBookings({booking}) {
    
    const [,dispatch] = useStore()
    const navigate = useNavigate();
    const [infoBookings,setInfoBookings] = useState()

    useEffect(()=>{
        setInfoBookings(booking)
    },[booking])

    const handleOpenDetail = () =>{
        dispatch(actions.GetIdBooking(infoBookings?.id))
        navigate("/bookingConfirmation")
    }

    return(
        <tbody className=" odd:bg-white text-gray-600 text-sm odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td>{infoBookings?.customerName}</td>
            <td>{infoBookings?.hotelName}</td>
            <td>{infoBookings?.checkinDate}</td>
            <td>{infoBookings?.checkoutDate}</td>
            <td>{format.FormatNumber(infoBookings?.totalPrice)}</td>
            <td className=" text-center">
                <button onClick={handleOpenDetail}  className="buttom_crud w-14 h-8 text-sky-600 text-xl ">
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
            </td>
        </tbody>
    );
}
export default RowMyBookings;