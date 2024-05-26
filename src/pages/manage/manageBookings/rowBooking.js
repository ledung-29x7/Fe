import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";

function RowBooking({booking}){

    const [,dispatch] = useStore();

    const handleOpenDetail = () =>{
        dispatch(actions.ModalEdit(true))
    }
    console.log(booking)
    return(
        <tbody className=" text-gray-600 bg-white h-11">
            <td>{booking?.customerName}</td>
            <td>{booking?.hotelName}</td>
            <td>{booking?.checkinDate}</td>
            <td>{booking?.checkoutDate}</td>
            <td>{booking?.totalPrice}</td>
            <td className=" text-left">
                <button onClick={handleOpenDetail}   className="buttom_crud w-14 h-8 text-sky-600 text-2xl ">
                    <FontAwesomeIcon icon="fa-solid fa-circle-info" />
                </button>
            </td>
        </tbody>
    );
}
export default RowBooking;