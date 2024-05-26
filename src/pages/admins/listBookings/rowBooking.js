import { useNavigate } from "react-router-dom";

function RowBooking({booking}){
    const handleOpenDetail = () =>{

    }

    return(
        <tbody className=" text-gray-600 h-11">
            <td className=" text-center">{booking.id}</td>
            <td>{booking.customer}</td>
            <td>{booking.nameHotel}</td>
            <td>{booking.bookingDate}</td>
            <td>{booking.price}</td>
            <td className=" text-center">
                <button onClick={handleOpenDetail}  className="buttom_crud w-14 h-8 bg-blue-500 ">Details</button>
            </td>
        </tbody>
    );
}
export default RowBooking;