import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RowHotel({hotels}){

    const [,dispatch] = useStore();

    function HandleEdit(){
        dispatch(actions.ModalEdit(true))
        dispatch(actions.getIdEND(hotels?.id))
    }   

    const handleDelete = () => {
        dispatch(actions.ModalDelete(true))
        dispatch(actions.getIdEND(hotels?.id))
    }

    return(
        <tbody className="odd:bg-white text-gray-600 text-sm odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
            <td>{hotels?.name}</td>
            <td>{hotels?.managerUsername}</td>
            <td className=" text-left">   
                <button onClick={HandleEdit} className="mr-4 text-lg text-amber-400 ">
                    <FontAwesomeIcon icon="fa-solid fa-pen" />
                </button>
                <button onClick={handleDelete} className=" ml-4 text-lg py-3 text-red-500">
                    <FontAwesomeIcon icon="fa-solid fa-trash-can" />
                </button>
            </td>
        </tbody>
    );
}
export default RowHotel;