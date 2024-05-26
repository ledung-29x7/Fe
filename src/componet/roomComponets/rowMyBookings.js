import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../store/contexts";
import { actions } from "../../store/action";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
        <tbody className=" text-gray-500 bg-white h-11">
            <td>{infoBookings?.customerName}</td>
            <td>{infoBookings?.hotelName}</td>
            <td>{infoBookings?.checkinDate}</td>
            <td>{infoBookings?.checkoutDate}</td>
            <td>{infoBookings?.totalPrice}</td>
            <td className=" text-center">
                <button onClick={handleOpenDetail}  className="buttom_crud w-14 h-8 text-sky-600 text-2xl ">
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
            </td>
        </tbody>
    );
}
export default RowMyBookings;