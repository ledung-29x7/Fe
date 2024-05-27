import { useStore } from "../../../store/contexts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { actions } from "../../../store/action";
import { useNavigate } from "react-router-dom";

function RowRoom({ room }) {
  const [, dispatch] = useStore();
  const navigate = useNavigate();

  function HandleEdit() {
    navigate(`/manager/myHotels/edit/${room.id}`);
    dispatch(actions.getIdEND(room.id));
  }

  const handleDelete = () => {
    dispatch(actions.ModalDelete(true));
    dispatch(actions.getIdEND(room?.id));
  };

  const handelDetail = () => {
    navigate("/manager/myHotels/detail");
    sessionStorage.setItem("idDetail", room?.id);
  };

  return (
    <tbody className=" odd:bg-white text-gray-600 text-sm odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td>{room?.name}</td>
      <td>{room?.addressDTO?.addressLine}</td>

      <td className=" text-left ">
      <button className=" mr-4 text-lg" onClick={handleDelete}>
          <FontAwesomeIcon
            style={{ color: "#F44F44" }}
            icon="fa-solid fa-trash-can"
          />
        </button>

        <button className=" ml-4 text-blue-600  text-xl py-4" onClick={handelDetail}>
          <FontAwesomeIcon icon="fa-solid fa-circle-info" />
        </button>
      </td>
    </tbody>
  );
}
export default RowRoom;
