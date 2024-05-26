import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { useState, useEffect } from "react";
import * as apis from "../../../apis";

function EditHotel({ hotel }) {

    const [state, dispatch] = useStore();
    const { idEdit } = state;
    const [valueEdit, setValueEdit] = useState({
        ...hotel,
        name: '',
        managerUsername: '',
        addressDTO: {
            id: 0,
            addressLine: "",
            district: "",
            city: "",
            country: ""
        },
    })

    console.log(hotel)

    useEffect(() => {
        setValueEdit(hotel)
    }, [hotel])

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Nếu trường đang thay đổi thuộc addressDTO
        if (name.includes('addressDTO')) {
            const addressName = name.split('.')[1]; // Lấy tên trường con (ví dụ: addressLine, district, city, country)
            setValueEdit({
                ...valueEdit,
                addressDTO: {
                    ...valueEdit.addressDTO,
                    [addressName]: value
                }
            });
        } else {
            setValueEdit({
                ...valueEdit,
                [name]: value
            });
        }
    }

    function HandleCloseEdit() {
        dispatch(actions.ModalEdit(false));
    }

    function handleSubmit(e) {
        const FetchEdit = async () => {
            try {
                e.preventDefault();
                await apis.editUser("hotels", idEdit, valueEdit)
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
        <div className="auth-form">
            <div className=" px-10 my-7 flex justify-between w-full h-14 font-bold text-xl border-b border-b-slate-800 ">
                <span>Edit Hotel</span>
                <span onClick={HandleCloseEdit} className=" w-6 h-6 text-2xl text-slate-500 flex justify-center items-center text-center cursor-pointer "  >
                    &times;
                </span>
            </div>
            <div className=" px-10">
                {/* title edit */}
                <form className=" my-7 flex flex-col gap-10" onSubmit={handleSubmit}>
                    {/* form edit */}
                    <div className=" flex flex-col gap-6">
                        <div className=" border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9 ">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Name Hotel"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={valueEdit?.name}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                type="text"
                                placeholder="Address Line"
                                name="managerUsername"
                                onChange={handleChange}
                                value={valueEdit?.managerUsername}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="AddressLine"
                                type="text"
                                name="addressDTO.addressLine"
                                onChange={handleChange}
                                value={valueEdit?.addressDTO?.addressLine}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Municipality"
                                type="text"
                                name="addressDTO.district"
                                onChange={handleChange}
                                value={valueEdit?.addressDTO?.district}
                            />
                        </div>

                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Municipality"
                                type="text"
                                name="addressDTO.city"
                                onChange={handleChange}
                                value={valueEdit?.addressDTO?.city}
                            />
                        </div>
                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Municipality"
                                type="text"
                                name="addressDTO.country"
                                onChange={handleChange}
                                value={valueEdit?.addressDTO?.country}
                            />
                        </div>
                    </div>
                    <div className="border-gray-500 border text-right rounded-lg overflow-hidden h-9">
                        <button className=" bg-blue-500 h-full w-full font-bold text-white">Update</button>
                    </div>
                </form>{/* end form */}
                <div className=" h-14 flex justify-end items-center">
                    <button onClick={HandleCloseEdit} className=" rounded-md text-white bg-zinc-400  font-bold w-32 h-8 ">Cancel</button>
                </div>
            </div>
        </div>
    );
}
export default EditHotel;