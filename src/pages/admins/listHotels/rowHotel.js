import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";

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
        <tbody className=" text-gray-600 h-11">
            <td className=" text-center">{hotels?.id}</td>
            <td>{hotels?.name}</td>
            <td>{hotels?.managerUsername}</td>
            <td className=" text-center">
                <button onClick={HandleEdit} className="buttom_crud w-14 h-8 bg-amber-400 ">Edit</button>
            </td>
            <td className=" text-center">
                <button onClick={handleDelete} className=" buttom_crud w-14 h-8 bg-red-500">Delete</button>
            </td>
        </tbody>
    );
}
export default RowHotel;