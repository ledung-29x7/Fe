import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import * as apis from "../../../apis"
import RowList from "./rowRoom";
import DeleteManager from "./DeleteManager";


function ListUser() {
    const navigate = useNavigate();
    const [isShowDelete, setIsShowDelete] = useState(false);
    const [errors, setErrors] = useState("");
    const [showError, setShowError] = useState(false);
    const [rooms, setRooms] = useState([]);
    const [state, dispatch] = useStore();
    const { isDelete, isEdit } = state;


    useEffect(() => {
        setIsShowDelete(isDelete)
    }, [isDelete])

    // Read apis
    useEffect(() => {
        const FetchData = async () => {
            try {
                const response = await apis.getManager("hotels")
                setRooms(response.data)
            } catch (error) {
                if (error.response.status === 403) {
                    setErrors("Vui lòng đăng nhập tài khoản manager để xem danh sách")
                }
                setShowError(true)
            }
        }
        FetchData()
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setShowError(false)
        }, 8000);

    }, [showError])


    return (
        <div className=" px-10 bg-gray-50 py-10 rounded-md">
            <div className=" containerr">
                <div className=" flex justify-between items-end pb-6">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-lg text-gray-600">
                            Danh sách khách sạn
                        </h4>
                    </div>
                    <button className=" px-4 py-2 bg-lime-600 flex items-center gap-3 rounded-md"
                        onClick={() => navigate('/manager/myHotel/add')}
                    >
                        <span className=" w-6 h-6 border-2 border-white rounded-full text-white flex justify-center items-center">
                            <FontAwesomeIcon icon="fa-solid fa-circle-plus" />
                        </span>
                        <span className=" text-white text-sm font-semibold ">Thêm khách sạn</span>
                    </button>
                </div>
                <div>

                </div>
                <div className=" mt-4 rounded-md bg-white">
                    <table className=" w-full ">
                        <thead className=" text-left text-sm text-gray-700  h-12">
                            <th>Tên Khách Sạn</th>
                            <th>Địa Chỉ</th>
                            <th>Thao tác</th>
                        </thead>
                        {rooms.map((us) => (
                            <RowList
                                key={us.id}
                                room={us}
                            />
                        ))}
                    </table>
                </div>
            </div>
            {/* modal delete */}
            {isShowDelete ?
                <div className="modal z-50">
                    <div className="flex w-full h-full">
                        <div id="overlay" className="modal_overlay"></div>
                        <div className="modal_body">
                            <DeleteManager delet={isEdit} />
                        </div>
                    </div>
                </div>
                : null
            }

            {showError ?
                <div className=" fixed top-24 right-6 w-80 text-center bg-neutral-50 shadow">
                    <div className="w-full h-1 bg-red-500"></div>
                    <div className=" py-4 text-xs px-4 font-semibold text-red-400 ">{errors}</div>
                </div>
                :
                null}
        </div>
    );
}
export default ListUser;