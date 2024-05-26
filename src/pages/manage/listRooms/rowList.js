import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { useNavigate } from "react-router-dom";

function RowList({room}){
    const navigate  = useNavigate()
    const [,dispatch] = useStore();

    const handleOpenDetail = () =>{

    }  
   

    return(
        <tbody className=" text-gray-600 h-11">
            <td className=" text-center">{room.id}</td>
            <td>{room?.customer}</td>
            <td>{room?.nameHotel}</td>
            <td>{room?.bookingDate}</td>
            <td>{room?.checkinDate}</td>
            <td>{room?.totalPrice}</td>
            <td className=" text-center">
                <button onClick={handleOpenDetail}  className="buttom_crud w-14 h-8 bg-blue-500 ">Details</button>
            </td>
        </tbody>
    );
}
export default RowList;