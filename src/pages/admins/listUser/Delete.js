import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import * as apis from "../../../apis"

function Delete ({delet}) {

    const [,dispatch] = useStore()

    const handleDelete = () => {
        const Fetch = async() => {
            try {
                await apis.Delete(`admin/users/${delet?.id}`)
                .then((res)=>{
                    if(res.status === 204){
                        dispatch(actions.ModalSuccsessfull(true));
                        dispatch(actions.ModalDelete(false))
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
        Fetch()
    }

    const handleBack = () => {
        dispatch(actions.ModalDelete(false))
    }

    return(
        <div className="auth-form  flex">
            <div className=" m-auto px-10 flex flex-col gap-11">
                <h4 className=" font-semibold text-lg">Bạn chắc chắn muốn xóa thông tin này? </h4>
                <div className=" flex justify-end gap-6">
                    <button onClick={handleDelete}
                        className=" px-5 py-2 bg-red-500 text-white rounded-lg"
                    >
                        <FontAwesomeIcon icon="fa-solid fa-trash-can" /> Xóa
                    </button>
                    <button onClick={handleBack} 
                        className=" px-5 py-2 bg-gray-500 text-white rounded-lg"
                    >
                        Trở lại
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Delete;