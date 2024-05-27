import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { useNavigate } from "react-router-dom";
import InputRoom from "../../roomHotel/inputRoom";

function EditManagerHotel({rooms}) {

    
    const [, dispatch] = useStore();
    const [editRoom, setEditRoom] = useState({});
    const [valueEdit, setValueEdit] = useState({
        ...rooms,
        pricePerNight: 0,
    })
    
    useEffect(()=> {
        setEditRoom(rooms)
    },[rooms])


    // gán cho valueedit
    useEffect(() => {
        setValueEdit(editRoom)
    }, [editRoom])

    function HandleCloseEdit() {
        dispatch(actions.ModalEdit(false))
    }


    // hand Change
    function handleChange(e) {
        const { name, value } = e.target;
        // Nếu trường đang thay đổi thuộc addressDTO

        setValueEdit({
            ...valueEdit,
            [name]: value
        });

    }

    // Submit
    function handleSubmit(e) {
        const FetchEdit = async () => {
            try {
                e.preventDefault();
                await apis.editRoom("hotels", rooms?.id, valueEdit)
                    .then(res => {
                        if (res.status === 200) {
                            return (
                                setValueEdit(res.data),
                                dispatch(actions.ModalEdit(false)),
                                dispatch(actions.ModalSuccsessfull(true))
                            )
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
        FetchEdit()
    }

    return (
        <div className=" w-[]">
            <div className="px-10 my-7 flex justify-between w-full h-14 font-bold text-xl border-b border-b-slate-400 ">
                <span>Sửa thông tin phòng</span>
                <span onClick={HandleCloseEdit} className=" w-6 h-6 text-2xl text-slate-500 flex justify-center items-center text-center cursor-pointer "  >
                    &times;
                </span>
            </div>
            <div className=" px-10">
                {/* title edit */}
                <form  onSubmit={handleSubmit} className=" my-10 flex flex-col gap-10">
                    {/* form edit */}
                    <InputRoom
                        nameInput={"pricePerNight"}
                        type={"text"}
                        value={valueEdit.pricePerNight}
                        onChange={handleChange}
                        titleInput={"Giá phòng"}
                    />
                    <div className="flex justify-end">
                        <button  className=" rounded-md  bg-blue-500 px-5 py-1 text-sm  font-bold text-white">Cập nhật</button>
                        <div onClick={HandleCloseEdit} className=" cursor-pointer rounded-md text-white bg-zinc-400 text-sm ml-3 font-bold px-5 py-1 ">Hủy bỏ</div>
                    </div>
                </form>{/* end form */}
                
            </div>
        </div>
    );
}
export default EditManagerHotel;