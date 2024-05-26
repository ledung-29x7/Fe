import { useStore } from "../../../store/contexts";
import { actions } from "../../../store/action";
import { useEffect, useState } from "react";
import * as apis from "../../../apis";
import { useNavigate } from "react-router-dom";

function EditRoom({ room }) {

    const [valueEdit,setValueEdit] = useState({
        ...room,
        roomType: "",
        roomCount: 0,
        pricePerNight: 0
    })

    const navigate = useNavigate();
    const [state, dispatch] = useStore();
    const {idEdit} = state;

    // as
    useEffect(()=> {
        setValueEdit(room)
    },[room])

    function HandleCloseEdit() {
        dispatch(actions.ModalEdit(false));
    }

    function handleChange (e){
        
            setValueEdit({...valueEdit,[e.target.name]: e.target.value})
        
    }

    function handleSubmit(e) {
        const FetchEdit = async() => {
            try {
                e.preventDefault();
                await apis.editUser("users",idEdit,valueEdit)
                .then(res=>{
                    if(res.status === 200){
                        return(
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
            <div className="px-10 my-7 flex justify-between w-full h-14 font-bold text-xl border-b border-b-slate-400 ">
                <span>Edit User</span>
                <span onClick={HandleCloseEdit} className=" w-6 h-6 text-2xl text-slate-500 flex justify-center items-center text-center cursor-pointer "  >
                    &times;
                </span>
            </div>
            <div className=" px-10">
                {/* title edit */}
                <form onSubmit={handleSubmit} className=" my-10 flex flex-col gap-10">
                    {/* form edit */}
                    <div className=" flex flex-col gap-6">
                        <div className=" border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9 ">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Username"
                                value={valueEdit.username}
                                type="text"
                                name="username"
                                onChange={handleChange}  
                            />
                        </div>

                        <div className=" border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9 ">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Phone"
                                value={valueEdit.phone}
                                type="text"
                                name="phone"
                                onChange={handleChange}  
                            />
                        </div>

                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                type="text"
                                placeholder="Firt Name"
                                name="firstName"
                                value={valueEdit.firstName}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="border-gray-500 border text-right rounded-lg overflow-hidden text-sm h-9">
                            <input
                                className="outline-none w-11/12 h-full"
                                placeholder="Last Name"
                                type="text"
                                name="lastName"
                                value={valueEdit.lastName}
                                onChange={handleChange}
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
export default EditRoom;