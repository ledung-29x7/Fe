import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "../../../componet/logic";

function RowBooking({booking}){

    const navigate = useNavigate();
    const [,dispatch] = useStore();

    const handleOpenDetail = () =>{
        navigate("/admin/listBooking/detail")
        dispatch(actions.getIdEND(booking.id))
    }

    return(
        <tbody className=" odd:bg-white text-gray-600 text-sm odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td>{booking?.customerName}</td>
            <td>{booking?.hotelName}</td>
            <td>{booking?.bookingDate}</td>
            <td>{format.FormatNumber(booking?.totalPrice)}</td>
            <td className="">
            <button onClick={handleOpenDetail} className=" pl-3 text-sky-600 text-2xl ">
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
            </td>
        </tbody>
    );
}
export default RowBooking;