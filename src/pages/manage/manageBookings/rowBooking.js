import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import {format} from "../../../componet/logic"

function RowBooking({ booking }) {

    const navigate = useNavigate();
    const [, dispatch] = useStore();

    const handleOpenDetail = () => {
        navigate("/manager/manageBookings/detailbooking")
        dispatch(actions.getIdEND(booking?.id))
    }
    console.log(booking)
    return (
        <tbody className="odd:bg-white text-gray-600 text-sm odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td>{booking?.customerName}</td>
            <td>{booking?.hotelName}</td>
            <td>{booking?.checkinDate}</td>
            <td>{format.FormatNumber(booking?.totalPrice)}</td>
            <td className=" text-left">
                <button onClick={handleOpenDetail} className="buttom_crud w-14 h-8 text-sky-600 text-2xl ">
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
            </td>
        </tbody>

    );
}
export default RowBooking;