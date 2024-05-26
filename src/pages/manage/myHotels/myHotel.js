import { useEffect, useState } from "react";
import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import * as apis from "../../../apis"
import RowList from "./rowRoom";
import Delete from "../../admins/listUser/Delete";


function ListUser() {
    const navigate = useNavigate();
    const [isShowDelete, setIsShowDelete] = useState(false);
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
                console.log(error)
            }
        }
        FetchData()
    }, [])


    return (
        <div className=" my-14 px-10">
            <div className=" containerr">
                <div className=" flex justify-between items-center pb-6">
                    <div className="flex flex-col gap-5">
                        <h4 className="font-bold text-4xl">
                            Danh sách khách sạn
                        </h4>
                    </div>
                    <button className="mx-10 px-4 py-3 bg-lime-600 flex justify-center items-center gap-3 rounded-md"
                        onClick={() => navigate('/manager/myHotel/add')}
                    >
                        <span className=" w-6 h-6 border-2 border-white rounded-full flex justify-center items-center">

                            <FontAwesomeIcon style={{ color: "white" }} icon="fa-solid fa-plus" />
                        </span>
                        <span className=" text-white ">Thêm khách sạn</span>
                    </button>
                </div>
                <div>

                </div>
                <div className=" mt-4">
                    <table className="  w-full shadow ">
                        <tr className="bg-slate-200 h-12">
                            <th>ID</th>
                            <th>Tên Khách Sạn</th>
                            <th>Địa Chỉ</th>
                            <th>Sô Lượng Phòng</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
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
                            <Delete delet={isEdit} />
                        </div>
                    </div>
                </div>
                : null
            }
        </div>
    );
}
export default ListUser;